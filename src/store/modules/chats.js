import {RemoveFromArray} from "@/commons";
import {doc, getDoc, onSnapshot, query, where, orderBy, updateDoc, getDocs} from "firebase/firestore";
import {dbChats, db, realDb} from "@/firebase";
import {onValue, ref} from "firebase/database";
import {createCommentVNode} from "vue";
import {changeKey, insertKey, sortData} from "@/commons/objects";

export default {
    state:{
        chats:{},
        status:{},
        typingStatus:{}

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
            state.chats = {...sortData({...state.chats,...chats},'time','id')}
        },
        WriteStatus(state,status){
            state.status = status
        },
        WriteTypingStatus(state,status){
            state.typingStatus = status
        },

    },
    actions:{
        async GetChats(context){
            let username = context.rootState.user.username
                // || (await getDoc(doc(db, 'team', email))).data().username
            if(!username)return
            let senderQuery = query(
                dbChats,
                where('sender','==',username),
                where('isDeleted' ,'==', false)
            )
            let receiverQuery = query(
                dbChats,
                where('recipient','==',username),
                where('isDeleted' ,'==', false)
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
                    tmpChats[d.id] = {...data,id:d.id,time:data.time.seconds*1000}
                }
                context.commit('WriteChats',tmpChats)
                context.dispatch('WriteIsDelivered',{...tmpChats})
            //    notifications
            })
        },
        async GetChannelChats(context,channels){
            let channelIds = Object.keys(channels)
            let tmpChats = {}
            for (let i = 0; i < channelIds.length; i++) {
                let channelQuery = query(
                    dbChats,
                    where('recipient','==',channelIds[i]),
                    where('isDeleted' ,'==', false)
                )
                onSnapshot(channelQuery,snaps=>{
                    for (let i = 0; i < snaps.docs.length; i++) {
                        let d = snaps.docs[i]
                        let data = d.data()
                        tmpChats[d.id] = {...data,id:d.id,time:data.time.seconds*1000}
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
                        if(data[user].typing && data[user].recipient === context.rootState.user.username){
                            status[user] = data
                        }
                    })
                    context.commit('WriteTypingStatus',status)
                })
            }catch (e) {
                console.log(e)
            }

        },

    }
}
