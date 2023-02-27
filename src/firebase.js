import {initializeApp} from 'firebase/app'
import {getFirestore,collection,getDocs,addDoc,doc,setDoc,onSnapshot} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyATe6gJztZbriB0vTgwW3KHg96GFtriadE",
    authDomain: "new-finetek.firebaseapp.com",
    projectId: "new-finetek",
    storageBucket: "new-finetek.appspot.com",
    messagingSenderId: "331636695526",
    appId: "1:331636695526:web:ddbb34838cb07f1284b627",
    measurementId: "G-CWDJ0LDB7M"
}
export const firebaseApp=  initializeApp(firebaseConfig)
export const db =  getFirestore()
export const app = initializeApp(firebaseConfig);
export const messages =  collection(db,'messages')
export const team =  collection(db,'team')
export const dbChats =  collection(db,'chats')
export const blogs =  collection(db,'blogs')
export const dbChannels =  collection(db,'channels')
export const dbNotifs =  collection(db,'notifications')
export const dbProjects =  collection(db,'projects')
export const dbTasks =  collection(db,'tasks')
export const storage = getStorage(firebaseApp)
export const realDb = getDatabase()

