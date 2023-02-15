import {createStore} from 'vuex'
import {team,db,dbChats} from "@/firebase";
import {getDoc,onSnapshot,setDoc,doc,query,where,getDocs,deleteDoc,updateDoc,collection} from 'firebase/firestore'
import {onValue,set,getDatabase,ref} from "firebase/database";
import {RemoveFromArray} from "@/commons";
import {realDb} from "@/firebase";
import chats from './modules/chats'

export default createStore({
    modules:{
        chats
    },
    state:{
        time: (new Date()).getTime(),
        clientMessages:'',
        user:'',
        userExists:false,
        checkedUser:false,
        team:'',
        chatIds:{},
        newChats:0,
        statusInvterval:'',
        timeInterval:''
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
        },
        GetCheckedUser(state){
            return state.checkedUser
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

        WriteCheckedUser(state,checked){
            state.checkedUser = true
        }
    },
    actions:{
        async Gets(context){
            await context.dispatch('SetTime')
            context.commit('GetClientMessages')
            await context.commit('GetTeam')
            await context.dispatch('OnlineStatus')
            await context.dispatch('GetChats')
            await context.dispatch('OnlineStatus')


        },
        GetUser(context,email){
            onSnapshot(doc(db, 'team', email),data=>{
                context.state.user = data.data()
                context.state.checkedUser = true
            })
            context.dispatch('GetChats')
        },
        SetTime(context){
            console.log('here')
            context.state.timeInterval = setInterval(()=>{
                context.state.time = (new Date()).getTime()
            },1000)
        },
        ClearIntervals(context){
            clearInterval(context.state.timeInterval)
            clearInterval(context.state.statusInvterval)
        },
        async WriteOnlineStatus(context){
            clearInterval(context.state.statusInverval)
            context.state.statusInvterval = setInterval(async ()=>{
                const database = getDatabase()
                const reference = ref(database, 'status/' + context.state.user.username)
                let lastSeen = (new Date()).getTime()
                try{
                    let c = await set( reference, {
                        lastSeen,
                    })
                }catch (e){
                    console.log(e)
                }

            },3000)
        }
    }
})
