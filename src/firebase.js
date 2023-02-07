import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'
import {getFirestore,collection,getDocs,addDoc,doc,setDoc,onSnapshot} from 'firebase/firestore'
import {getStorage,ref} from 'firebase/storage'
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
const firebaseApp=  initializeApp(firebaseConfig)
const db =  getFirestore()
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messages =  collection(db,'messages')
const team =  collection(db,'team')
const chats =  collection(db,'chats')
const blogs =  collection(db,'blogs')
const storage = getStorage(firebaseApp)
const realDb = getDatabase()
export {
    messages,getDocs,addDoc,doc,setDoc,onSnapshot,team,db,storage,chats,blogs,realDb
}
