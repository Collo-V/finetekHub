<template>
 <div class="w-full mb-8">
   <div class="w-full" v-show="viewTeam">
     <div class="flex justify-end p-4">
       <button class="h-10 w-150px focus:outline-none rounded-md bg-primary text-white" @click="viewTeam=false">+ Add member</button>
     </div>
     <div class="flex flex-wrap p-4">
       <div class="w-250px h-48 bg- shadow-md flex items-center justify-center mb-2 mr-2 rounded-md relative"
       v-for="member in team">
         <div class="user-modify-cont absolute right-0 top-0 m-2 z-1">
           <button class="h-5 w-5 text-4 rounded-full focus:outline-none">
             <i class="fa-solid fa-ellipsis-vertical"></i>
           </button>
           <div class="user-modify hidden absolute right-0 w-150px h-18 py-1 bg-white shadow-md " style="top:20px">
             <button class="w-full focus:outline-none hover:bg-grey-light h-8" @click="[EditMember(member.email),viewTeam=false]">
               <span class="w-full pl-8 block text-left">
                 <i class="fa-solid fa-pencil"></i> Edit
               </span>
             </button>
             <button class="w-full focus:outline-none hover:bg-grey-light h-8" @click="DeleteMember(member.email)">
               <span class="w-full pl-8 block text-left">
                <i class="fa-solid fa-trash"></i> Delete
               </span>
             </button>

           </div>
         </div>
         <div class="flex flex-col justify-center items-center">
           <img :src="member.image" class="h-24 w-24 rounded-full" alt="">
           <div>
             <span class="block text-center font-bold text-4">{{ member.firstName }} {{ member.lastName }}</span>
             <span class="block text-center">{{ member.position }}</span>
           </div>
         </div>
       </div>
     </div>
   </div>
   <div class="p-4" v-show="!viewTeam">
     <div class="w-4/5 mx-auto max-w-800px">
       <h2 class="mb-2" v-show="editing==''">Add a new member</h2>
       <form action="" class="w-full" id="member-form">
         <div class="flex flex-col lg:flex-row mb-3">
           <fieldset class="h-36px w-full relative mr-3">
             <input class="form-input pl-4 w-full h-full flex items-center rounded-sm focus:outline-none border-1px"
                    id="firstName" @blur="Validate($event.target.id)" v-model="newMember.firstName">
             <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
               <label class="bg-white cursor-text px-1">First Name*</label>
             </div>
             <div class="validity-checker h-0 w-full absolute pr-2 top-1/2 btm-1/2 flex items-center justify-end">
               <span class="hidden valid text-green"><i class="fa-solid fa-check"></i></span>
               <span class="hidden invalid text-red"><i class="fa-solid fa-triangle-exclamation"></i></span>
             </div>
           </fieldset>
           <fieldset class="h-36px w-full relative mb-3">
             <input class="form-input pl-4 w-full h-full flex items-center rounded-sm focus:outline-none border-1px"
                    id="lastName" @blur="Validate($event.target.id)" v-model="newMember.lastName">
             <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
               <label class="bg-white cursor-text px-1">First Name*</label>
             </div>
             <div class="validity-checker h-0 w-full absolute pr-2 top-1/2 btm-1/2 flex items-center justify-end">
               <span class="hidden valid text-green"><i class="fa-solid fa-check"></i></span>
               <span class="hidden invalid text-red"><i class="fa-solid fa-triangle-exclamation"></i></span>
             </div>
           </fieldset>

         </div>
         <div class="flex flex-col lg:flex-row mb-3">
           <fieldset class="h-36px w-full relative mr-3">
             <input class="form-input pl-4 w-full h-full flex items-center rounded-sm focus:outline-none border-1px"
                    id="email" @blur="Validate($event.target.id)" v-model="newMember.email">
             <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
               <label class="bg-white cursor-text px-1">Email*</label>
             </div>
             <div class="validity-checker h-0 w-full absolute pr-2 top-1/2 btm-1/2 flex items-center justify-end">
               <span class="hidden valid text-green"><i class="fa-solid fa-check"></i></span>
               <span class="hidden invalid text-red"><i class="fa-solid fa-triangle-exclamation"></i></span>
             </div>
             <div class="text-red text-12px hidden" id="duplicate-email-error">a user with the email already exists</div>
           </fieldset>
           <fieldset class="h-36px w-full relative mb-3">
             <input class="form-input pl-4 w-full h-full flex items-center rounded-sm focus:outline-none border-1px"
                    id="username" @blur="Validate($event.target.id)" v-model="newMember.username">
             <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
               <label class="bg-white cursor-text px-1">Username*</label>
             </div>
             <div class="validity-checker h-0 w-full absolute pr-2 top-1/2 btm-1/2 flex items-center justify-end">
               <span class="hidden valid text-green"><i class="fa-solid fa-check"></i></span>
               <span class="hidden invalid text-red"><i class="fa-solid fa-triangle-exclamation"></i></span>
             </div>
             <div class="text-red text-12px hidden" id="duplicate-username-error">username already taken</div>
           </fieldset>

         </div>
         <div class="flex flex-col lg:flex-row mb-3">
           <fieldset class="h-36px w-full relative mr-3">
             <input class="form-input pl-4 w-full h-full flex items-center rounded-sm focus:outline-none border-1px"
                    id="phone" @blur="Validate($event.target.id)" v-model="newMember.phone">
             <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
               <label class="bg-white cursor-text px-1">Phone*</label>
             </div>
             <div class="validity-checker h-0 w-full absolute pr-2 top-1/2 btm-1/2 flex items-center justify-end">
               <span class="hidden valid text-green"><i class="fa-solid fa-check"></i></span>
               <span class="hidden invalid text-red"><i class="fa-solid fa-triangle-exclamation"></i></span>
             </div>
           </fieldset>
           <fieldset class="h-36px w-full relative mb-3">
             <input class="form-input pl-4 w-full h-full flex items-center rounded-sm focus:outline-none border-1px"
                    id="position" @blur="Validate($event.target.id)" v-model="newMember.position">
             <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
               <label class="bg-white cursor-text px-1">Position*</label>
             </div>
             <div class="validity-checker h-0 w-full absolute pr-2 top-1/2 btm-1/2 flex items-center justify-end">
               <span class="hidden valid text-green"><i class="fa-solid fa-check"></i></span>
               <span class="hidden invalid text-red"><i class="fa-solid fa-triangle-exclamation"></i></span>
             </div>
           </fieldset>

         </div>
         <div class="flex flex-col lg:flex-row mb-3" id="password-fields-cont">
           <fieldset class="h-36px w-full relative mr-3">
             <input class="form-input pl-4 w-full h-full flex items-center rounded-sm focus:outline-none border-1px"
                    id="password1" @blur="Validate($event.target.id)" v-model="newMember.password1" type="password">
             <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
               <label class="bg-white cursor-text px-1">Password*</label>
             </div>
             <div class="validity-checker h-0 w-full absolute pr-2 top-1/2 btm-1/2 flex items-center justify-end">
               <span class="hidden valid text-green"><i class="fa-solid fa-check"></i></span>
               <span class="hidden invalid text-red"><i class="fa-solid fa-triangle-exclamation"></i></span>
             </div>
             <div class="text-10px">
               at least 8 characters,a special character,
               uppercase, lowercase and number
             </div>
           </fieldset>
           <fieldset class="h-36px w-full relative mb-3">
             <input class="form-input pl-4 w-full h-full flex items-center rounded-sm focus:outline-none border-1px"
                    id="password2" @blur="Validate($event.target.id)" v-model="newMember.password2" type="password">
             <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
               <label class="bg-white cursor-text px-1">Re-enter password*</label>
             </div>
             <div class="validity-checker h-0 w-full absolute pr-2 top-1/2 btm-1/2 flex items-center justify-end">
               <span class="hidden valid text-green"><i class="fa-solid fa-check"></i></span>
               <span class="hidden invalid text-red"><i class="fa-solid fa-triangle-exclamation"></i></span>
             </div>
           </fieldset>

         </div>
         <div class="flex">
           <fieldset class="h-36px w-full relative mb-3 flex items-center mr-3">
             <input type="checkbox" v-model="newMember.isAdmin" id="isAdmin" class="mr-2 h-5 w-5">
             <label for="isAdmin">Give admin privileges</label>
           </fieldset>
           <fieldset class="w-full">
             <button class="w-100px h-10 focus:outline-none border-1px rounded-md"
             type="button"  @click="Create()">Add Photo</button>
             <span class="text-red text-12px hidden" id="no-photo-error"> Please add profile photo</span>
           </fieldset>
         </div>
         <div class=" text-red text-12px hidden" id="error-alert">Please correct the mistake(s) before proceeding</div>
         <div class="flex justify-end">
           <button class="h-10 w-150px focus:outline-none bg-grey-light rounded-md mr-2"
                   type="button" @click="ClearForm()">Cancel</button>
           <button class="h-10 w-150px focus:outline-none bg-primary text-white rounded-md"
                   type="button" @click="CheckValidity()">Add</button>
         </div>
       </form>
     </div>
   </div>
 </div>
  {{getMessages()}}
</template>

<script>
import {team,db} from "@/firebase";
import {getDoc,onSnapshot,setDoc,doc,query,where,getDocs,deleteDoc,updateDoc} from 'firebase/firestore'
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import {getAuth, createUserWithEmailAndPassword,deleteUser} from 'firebase/auth'
import {Validate} from "@/commons";
import {Alert,Report} from "@/commons/swal";

export default {
  name: "Team",
  data(){
    return{
      viewTeam:true,
      team:'',
      editing:false,
      newMember:{
        firstName:'',lastName:'',email:'',phone:'',username:'',position:'',
        password1:'',password2:'',image:'',isAdmin:false,isOnline:false,lastSeen:''
      }
    }
  },
  methods:{
    getMessages(){
      onSnapshot(team,(snap)=>{
       let tempTeam = {}
        for (let i = 0; i < snap.docs.length; i++) {
          let doc = snap.docs[i]
          tempTeam[doc.id] = {...doc.data(),email:doc.id}
        }
        this.GetTeam(tempTeam)
      })
    },
    GetTeam(team){
      if(JSON.stringify(team)!=JSON.stringify(this.team)){
        this.team = JSON.parse(JSON.stringify(team))
      }
    },
    Validate(id){
      Validate(id)
    },
    async CheckValidity(){
      if(this.editing!=''){
        return this.CheckEdited(this.editing)
      }
      let valid = true
      let member  = this.newMember
      let keys = Object.keys(member)
      for (let i = 0; i < keys.length ; i++) {
        if (keys[i]!='isAdmin' && member[keys[i]]==''){
          valid = false
        }
      }
      if(document.getElementsByClassName('input-invalid').length>0){
        valid = false
      }
      if(member.image==''){
        document.getElementById('no-photo-error').classList.remove('hidden')
        valid = false
      }else{
        document.getElementById('no-photo-error').classList.add('hidden')
      }
      try{
        let email = (await getDoc(doc(db, 'team', member.email))).data()
        if (email){
          document.getElementById('duplicate-email-error').classList.remove('hidden')
          valid = false
        }else {
          document.getElementById('duplicate-email-error').classList.add('hidden')
        }
      }catch{}
      try{
        let username = (await getDocs(query(team,where('username','==',member.username)))).docs
        if (username.length>0){
          document.getElementById('duplicate-username-error').classList.remove('hidden')
          valid = false
        }else{
          document.getElementById('duplicate-username-error').classList.add('hidden')
        }
      }catch (e) {
        console.log(e)
      }
      if(!valid){
        document.getElementById('error-alert').classList.remove('hidden')
      }
      else {
        document.getElementById('error-alert').classList.add('hidden')
        await this.AddMember()
      }
    },
    async CheckEdited(id){
      let valid = true
      let m  = this.newMember
      let member = {
        firstName:m.firstName,
        lastName : m.lastName,
        isAdmin:m.isAdmin,
        position:m.position,
        phone:m.phone
      }
      if (typeof(m.image) != 'string'){
        member['image'] = m.image
      }
      let keys = Object.keys(member)
      for (let i = 0; i < keys.length ; i++) {
        if (keys[i]!='isAdmin' && member[keys[i]]==''){
          valid = false
        }
      }
      if(document.getElementsByClassName('input-invalid').length>0){
        valid = false
      }
      if(!valid){
        document.getElementById('error-alert').classList.remove('hidden')
      }
      else {
        document.getElementById('error-alert').classList.add('hidden')
        await this.UpdateMember(member,id)
      }
    },
    Create:function (){
      console.log('start')
      let input=document.createElement("input");
      input.type="file";
      input.accept=".png,.jpg"
      let files=[]
      input.onchange = e=>{
        files=e.target.files;
        let reader=new FileReader();
        reader.onload=function(){
        }
        reader.readAsDataURL(files[0]);
          this.newMember.image=files[0]
     }
      input.click()
    },
    async AddMember(){
      try{
        await createUserWithEmailAndPassword(getAuth(), this.newMember.email, this.newMember.password1)
        try{
          let imgRef = ref(getStorage(), 'team/' + this.newMember.email)
          await uploadBytes(imgRef, this.newMember.image)
          let imgPath = await getDownloadURL(imgRef)
          this.newMember.image = imgPath
          delete this.newMember.password2
          delete this.newMember.password1
          await setDoc(doc(db, 'team', this.newMember.email), this.newMember)
        }catch (e) {
        }
      }catch (e) {
        
      }
      this.ClearForm()
    },
    async UpdateMember(member,id){
      try{
        if (member.image){
          let imgRef = ref(getStorage(), 'team/' + this.newMember.email)
          await uploadBytes(imgRef, this.newMember.image)
          let imgPath = await getDownloadURL(imgRef)
          member.image = imgPath
        }
        await updateDoc(doc(db,'team',id),member)
      }catch (e) {
      }
    },
    ClearForm(){
      this.newMember = {
        firstName:'',lastName:'',email:'',phone:'',username:'',position:'',
        password1:'',password2:'',image:'',isAdmin:false
      }
      document.getElementById('member-form').classList.remove('prefilled-form')
      document.getElementById('password-fields-cont').classList.replace('hidden','flex')
      let a = document.getElementsByClassName('input-invalid')
      let b = document.getElementsByClassName('input-valid')
      for (let i = 0; i < a.length; i++) {
        a[i].classList.remove('input-invalid')
      }
      for (let i = 0; i < b.length; i++) {
        b[i].classList.remove('input-valid')
      }
      this.viewTeam = true
    },
    EditMember(id){
      this.newMember = JSON.parse(JSON.stringify(this.team[id]))
      document.getElementById('member-form').classList.add("prefilled-form")
      document.getElementById('password-fields-cont').classList.replace('flex','hidden')
      this.editing = id
      document.getElementById('email').disabled=true
      document.getElementById('username').disabled=true
    },
    DeleteMember(id){
      if(Alert()===true){
        deleteDoc(doc(db,'team',id))
      }

    }
  }
}
</script>

<style scoped>
.team-header{background: linear-gradient(to right, #1f1d1da9,#1f1d1da9), url(~@/assets/images/team/team-header.jpg) no-repeat center/cover;}
.user-modify-cont:hover .user-modify{display: initial}

</style>

,