import {RemoveFromArray} from "@/commons";
import {doc, getDoc, onSnapshot, query, where, orderBy, updateDoc} from "firebase/firestore";
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
            state.chats = chats
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
            let q = query(
                dbChats,
                where('participants','array-contains',username),
                where('isDeleted' ,'==', false)
            )
            let tmpChats = {}
            onSnapshot(q,snaps=>{
                for (let i = 0; i < snaps.docs.length; i++) {
                    let d = snaps.docs[i]
                    let data = d.data()
                    tmpChats[d.id] = {...data,id:d.id,time:data.time.seconds*1000}
                }
                let c = {...sortData(tmpChats,'time','id')}
                context.commit('WriteChats',{...c})
                context.dispatch('WriteIsDelivered',{...c})
            //    set is delivered
            //    notifications
            })

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
