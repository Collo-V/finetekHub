import {RemoveFromArray} from "@/commons";
import {doc, getDoc, onSnapshot, query, where,orderBy} from "firebase/firestore";
import {dbChats, db, realDb} from "@/firebase";
import {onValue, ref} from "firebase/database";
import {createCommentVNode} from "vue";
import {changeKey, insertKey, sortData} from "@/commons/objects";

export default {
    state:{
        chats:{},
        status:{}

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

    },
    actions:{
        async GetChats(context){
            let username = context.rootState.user.username
                // || (await getDoc(doc(db, 'team', email))).data().username
            if(!username)return
            let q = query(
                dbChats,
                where('participants','array-contains',username),
            )
            let tmpChats = {}
            onSnapshot(q,snaps=>{
                for (let i = 0; i < snaps.docs.length; i++) {
                    let d = snaps.docs[i]
                    tmpChats[d.id] = {...d.data(),id:d.id}
                }
                let c = {...sortData(tmpChats,'time','id')}
                context.commit('WriteChats',{...c})
            //    set is delivered
            //    notifications
            })

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

    }
}
