import {team,db,chats} from "@/firebase";
import {getDoc,onSnapshot,setDoc,doc,query,where,getDocs,deleteDoc,updateDoc,collection} from 'firebase/firestore'

function GetUser(email){
    onSnapshot(doc(db, 'team', email),data=>{
        console.log('data changed',data.data())
        return data.data()
    })
    console.log('beforechange')
}

export {
    GetUser
}
