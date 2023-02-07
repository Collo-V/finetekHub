import {team,db,chats} from "@/firebase";
import {getDoc,onSnapshot,setDoc,doc,query,where,getDocs,deleteDoc,updateDoc,collection} from 'firebase/firestore'

function GetUser(email){
    onSnapshot(doc(db, 'team', email),data=>{
        console.log('data changed',data.data())
        return data.data()
    })
    console.log('beforechange')
}
function filterData(data,[field, op, value]){
    let filteredKeys=[]
    let keys = Object.keys(data)
    keys.forEach(key=>{
        if(op === '==' && data[key][field]===value){
            filteredKeys.push(key)
        }
    })
    let filteredData = {}
    filteredKeys.forEach(key=>{
        filteredData[key] = data[key]
    })
    return filteredData

}

export {
    GetUser,filterData
}
