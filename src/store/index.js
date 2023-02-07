import {createStore} from 'vuex'
import {team,db,chats} from "@/firebase";
import {getDoc,onSnapshot,setDoc,doc,query,where,getDocs,deleteDoc,updateDoc,collection} from 'firebase/firestore'
import {getAuth, signOut} from 'firebase/auth'
import router from "@/router";
import {GetUser} from '@/commons/data'
import {RemoveFromArray} from "@/commons";
import {onValue,ref,set} from 'firebase/database'
import {realDb} from "@/firebase";

export default createStore({
    state:{
        clientMessages:'',
        user:'',
        userExists:false,
        checkedUser:false,
        team:'',
        status:{},
        chats: {},
        chatIds:{},
        newChats:0
    },
    getters:{
        getClientMessages(state){
            return state.clientMessages
        },
        GetUser(state){
            return state.user
        },
        GetTeam(state){
            return state.team
        },
        GetChats(state){
            return state.chats
        },GetNewChats(state){
            return state.newChats
        },
        GetStatus(state){
            return state.status
        }
    },
    mutations:{
        async GetClientMessages(state){
            onSnapshot(collection(db,'messages'),(snap)=>{
                let msg = {}
                for (let i = 0; i < snap.docs.length; i++) {
                    let doc = snap.docs[i]
                    msg[doc.id] = {...doc.data(),id:doc.id,date:doc.id.slice(doc.data().fName.length)}
                }
                state.clientMessages = msg
            })
        },
        async GetUser(state,email){
           onSnapshot(doc(db, 'team', email),data=>{
               state.user = data.data()
               state.checkedUser = true

            })
        },
        GetTeam(state){
            onSnapshot(team,(snap)=>{
                let tempTeam = {}
                for (let i = 0; i < snap.docs.length; i++) {
                    let doc = snap.docs[i]
                    tempTeam[doc.data().username] = {...doc.data(),email:doc.id}
                }
                state.team = tempTeam
            })
        },

        WriteChats(state,chats){
            let newChats = 0
            let currentUser = state.user.username
            let team = state.team
            let userKeys = RemoveFromArray(Object.keys(team),currentUser)
            let chatKeys = Object.keys(chats)
            for (let i = 0; i < chatKeys.length; i++) {
                let c  = chats[chatKeys[i]]
                for (let j = 0; j < userKeys.length; j++) {
                    let user =team[userKeys[j]]
                    if (c.participants.includes(user.username)){
                        state.chatIds[user.username] = c.id
                        let z =Object.keys(c.chats).sort()
                        let chat=[]
                        for (let k = 0; k < z.length; k++){
                            let p = c.chats[z[k]]
                            if(p.isDeleted){continue}
                            chat.push({...p,id:z[k]})
                            if(!p.isRead && p.sender!=state.user.username){
                                newChats+=1
                            }
                        }
                        state.chats[user.username] = chat
                        state.newChats = newChats
                    }
                }

            }
            // console.log(this.chats)
            // this.ReadMsg()
        },
        WriteStatus(state,status){
            status.forEach(user=>{
                state.status[user.email] = user.lastSeen
            })

        }
    },
    actions:{
        CheckUser(context){
            getAuth().onAuthStateChanged(user=>{
                if(user==null){
                    context.state.checkedUser = true
                    context.state.userExists = false
                    router.push({name:'login'})
               }else {
                    context.state.userExists = true
                    context.commit("GetUser",user.email)
                    context.dispatch('GetChats',user.email).then()

                }
            })
        },
        async OnlineStatus(context){

            try{
                let statusRef = ref(realDb,'/status/')
                onValue(statusRef,snapshot => {
                    let data = snapshot.val()
                    context.commit('WriteStatus',Object.values(data))
                })
            }catch (e) {
                console.log(e)
            }

        },
        async GetChats(context,email){
            let username = (await getDoc(doc(db, 'team', email))).data().username
            let q = query(chats,where('participants','array-contains',username))
            let tmpChats = {}
            onSnapshot(q,snaps=>{
                for (let i = 0; i < snaps.docs.length; i++) {
                    let d = snaps.docs[i]
                    tmpChats[d.id] = {...d.data(),id:d.id}
                }
                context.commit('WriteChats',JSON.parse(JSON.stringify(tmpChats)))
            })

        },
        async Gets(context){
            context.commit('GetClientMessages')
            await context.dispatch('CheckUser')
            await context.commit('GetTeam')
            await context.dispatch('OnlineStatus')

        }
    }
})
