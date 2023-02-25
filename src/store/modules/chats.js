import {doc,onSnapshot, query, where, updateDoc} from "firebase/firestore";
import {dbChats, db, realDb, dbNotifs} from "@/firebase";
import {onValue, ref} from "firebase/database";
import {removeFromArray} from "@/commons/objects";
import {sortData} from '@/commons/objects-arrays'
export default {
    state:{
        chats:{},
        newChats:[],
        status:{},
        typingStatus:{},
        notifications:{}

    },
    getter:{
        GetChats(state){
            return state.chats
        },
        GetStatus(state){
            return state.status
        }

    },
    mutations:{
        WriteChats(state,chats){
            let allChats = {...state.chats,...chats}
            state.chats = {...sortData(allChats,'time','id')}
        },
        WriteStatus(state,status){
            state.status = status
        },
        WriteNotifications(state,notifs){
            state.notifications = notifs
        },
        WriteNewChats(state, {chatId, isNew}){
            let newChats = state.newChats
            if(isNew && !newChats.includes(chatId)){
                newChats.push(chatId)

            }
            else if(!isNew && newChats.includes(chatId)){
                newChats = removeFromArray(newChats,chatId)
            }
            state.newChats = newChats
        },
        WriteTypingStatus(state,status){
            state.typingStatus = status
        },

    },
    actions:{
        async ChatNotify(context,chat){
            if(Notification.permission === 'granted'){
                let body,name
                let sender = context.rootState.team [chat.sender]
                if(sender){
                    name = `${sender.firstName} ${sender.lastName}`
                }if(chat.isChannelChat){
                    let channel = context.rootState.channels[chat.recipient]
                    if(channel){
                        body = `This message was sent to ${channel.name} channel`

                    }
                }
                body = body??''
                if(!name){
                    let notification = new Notification('New Message',{
                        body
                    })
                }else {
                    let notification = new Notification('New Message from '+name,{
                        body
                    })
                }
            }
        },
        async GetChats(context){
            let username = context.rootState.user.username
            if(!username)return
            let senderQuery = query(
                dbChats,
                where('sender','==',username),
                where('isDeleted' ,'!=', false)
            )
            let receiverQuery = query(
                dbChats,
                where('recipient','==',username),
                where('isDeleted' ,'!=', false)
            )

            onSnapshot(senderQuery,snaps=>{
                let tmpChats = {}
                    for (let i = 0; i < snaps.docs.length; i++) {
                        let d = snaps.docs[i]
                        let data = d.data()
                        tmpChats[d.id] = {...data,id:d.id,time:data.time.seconds*1000}
                    }
                    context.commit('WriteChats',tmpChats)
                    context.dispatch('WriteIsDelivered',{...tmpChats})
                //    notifications
                })
            onSnapshot(receiverQuery,snaps=>{
                let tmpChats = {}
                for (let i = 0; i < snaps.docs.length; i++) {
                    let d = snaps.docs[i]
                    let data = d.data()
                    if(!data.isRead){
                        context.commit('WriteNewChats',{chatId:d.id,isNew:true})
                        context.dispatch('ChatNotify',data)
                    }else {
                        context.commit('WriteNewChats',{chatId:d.id})
                    }
                    tmpChats[d.id] = {...data,id:d.id,time:data.time.seconds*1000}
                }
                context.commit('WriteChats',tmpChats)
                context.dispatch('WriteIsDelivered',{...tmpChats})
            //    notifications
            })
        },
        async GetChannelChats(context,channels){
            let username = context.rootState.user.username
            let channelIds = Object.keys(channels)
            let tmpChats = {}
            for (let i = 0; i < channelIds.length; i++) {
                let channelQuery = query(
                    dbChats,
                    where('recipient','==',channelIds[i]),
                    where('isDeleted' ,'!=', true)
                )
                onSnapshot(channelQuery,snaps=>{
                    for (let i = 0; i < snaps.docs.length; i++) {
                        let d = snaps.docs[i]
                        let chat = d.data()
                        if(chat.sender !== username && !chat.isRead.includes(username)){
                            context.commit('WriteNewChats',{chatId:d.id,isNew:true})
                            context.dispatch('ChatNotify',chat)
                        }else if(chat.sender !== username && chat.isRead.includes(username)) {
                            context.commit('WriteNewChats',{chatId:d.id})
                        }
                        tmpChats[d.id] = {...chat,id:d.id,time:chat.time.seconds*1000}
                    }
                    let c = {...sortData(tmpChats,'time','id')}
                    context.commit('WriteChats',{...c})
                    context.dispatch('WriteIsDelivered',{...c})
                    //    notifications
                })


            }


        },
        WriteIsDelivered(context,chats){
            chats = Object.values(chats).filter(a=>a.sender!==context.rootState.user.username)
            for (let i = 0; i < chats.length; i++) {
                updateDoc(doc(db,'chats',chats[i].id),{
                    isDelivered:true
                })
            }
        },
        async OnlineStatus(context){

            try{
                let statusRef = ref(realDb,'/status/')
                onValue(statusRef,snapshot => {
                    let data = snapshot.val()
                    let status = {}
                    Object.keys(data).forEach(username=>{
                        status[username] = data[username].lastSeen
                    })
                    context.commit('WriteStatus',status)
                })
            }catch (e) {
                console.log(e)
            }

        },
        async GetTypingStatus(context){
            try{
                let statusRef = ref(realDb,'/typing-status/')
                onValue(statusRef,snapshot => {
                    let data = snapshot.val()
                    let status = {}
                    Object.keys(data).forEach(user=>{
                        if(data[user].typing){
                            status[user] = data[user]
                        }
                    })
                    context.commit('WriteTypingStatus',status)
                })
            }catch (e) {
                console.log(e)
            }

        },
        async GetNotifications(context){
            let q = query(dbNotifs,where('notifiers','array-contains',context.rootState.user.username))
            onSnapshot(q,snapshot => {
                let tempNotifs = {}
                let docs = snapshot.docs
                docs.forEach(notif=>{
                    tempNotifs[notif.id] = {...notif.data(),id:notif.id,isNotif:true}
                })
                context.commit('WriteNotifications',tempNotifs)
            })
        }

    }
}
