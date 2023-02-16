<template>
 <div class="w-full mb-8">
   <div class="flex justify-end p-4">
     <button class="h-10 w-150px focus:outline-none rounded-md bg-primary text-white" @click="showAddMember = true">+ Add member</button>
   </div>
   <div class="w-full" >
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

   <div class="h-screen-h w-full bg-gray-500/75 fixed top-0 left-0 z-10 flex justify-center items-center"
        v-if="showAddMember" @click="(event)=>{ClickOutside(event)}">
     <div class="bg-white w-90% h-300px lg:w-500px" ref="formRef">
       <h2 class="mb-2 py-2 px-2" v-show="editing==''">
         {{editing==''? 'Add new member':'Edit member'}}
       </h2>
       <form action="" class="w-full" id="member-form">
         <div class="flex flex-col lg:flex-row gap-3 mb-3">
           <fieldset class="h-10 w-full relative">
             <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                    id="firstName" @blur="Validate($event.target.id)" v-model="newMember.firstName">
             <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
               <label class="bg-white cursor-text px-1">First Name*</label>
             </div>
             <div class="validity-checker h-0 w-fit absolute mr-4 top-1/2 btm-1/2 right-0 flex items-center justify-end">
               <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
               <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
             </div>
           </fieldset>
           <fieldset class="h-10 w-full relative">
             <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                    id="lastName" @blur="Validate($event.target.id)" v-model="newMember.lastName">
             <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
               <label class="bg-white cursor-text px-1">Last Name*</label>
             </div>
             <div class="validity-checker h-0 w-fit absolute mr-4 right-0 top-1/2 btm-1/2 flex items-center justify-end">
               <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
               <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
             </div>
           </fieldset>
         </div>
         <div class="flex flex-col lg:flex-row gap-3 mb-3">
           <fieldset class="h-10 w-full relative">
             <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                    id="email" @blur="Validate($event.target.id)" v-model="newMember.email">
             <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
               <label class="bg-white cursor-text px-1">Email*</label>
             </div>
             <div class="validity-checker h-0 w-fit absolute mr-4 right-0 top-1/2 btm-1/2 flex items-center justify-end">
               <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
               <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
             </div>
             <div class="text-red-500 text-12px hidden" id="duplicate-email-error">a user with the email already exists</div>
           </fieldset>
         </div>
         <div class="flex flex-col lg:flex-row gap-3 mb-3 items-center">
          <fieldset class="h-10 w-full relative mb-3">
             <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                    id="position" @blur="Validate($event.target.id)" v-model="newMember.position">
             <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
               <label class="bg-white cursor-text px-1">Position*</label>
             </div>
             <div class="validity-checker h-0 w-fit absolute mr-4 right-0 top-1/2 btm-1/2 flex items-center justify-end">
               <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
               <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
             </div>
           </fieldset>
           <fieldset class="h-10 w-full relative mb-3 flex items-center mr-3 items-center">
             <input type="checkbox" v-model="newMember.isAdmin" id="isAdmin" class="mr-2 h-5 w-5">
             <label for="isAdmin">Give admin privileges</label>
           </fieldset>

         </div>
         <div class=" text-red-500 text-12px hidden" id="error-alert">Please correct the mistake(s) before proceeding</div>
         <div class="flex justify-end px-2">
           <button class="h-10 w-150px focus:outline-none bg-grey-light rounded-md mr-2"
                   type="button" @click="ClearForm()">Cancel</button>
           <button class="h-10 w-150px focus:outline-none bg-primary text-white rounded-md"
                   type="button" @click="AddMember()">Add</button>
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
import {
  getAuth,
  createUserWithEmailAndPassword,
  deleteUser,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword
} from 'firebase/auth'
import {formIsValid, validateInp} from "@/commons";
import {confirmAction,Report} from "@/commons/swal";

export default {

  name: "Team",
  data(){
    return{
      viewTeam:true,
      showAddMember:false,
      team:'',
      editing:false,
      newMember:{

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
      validateInp(id)
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
      let member = {...this.newMember}
      const actionCodeSettings = {
        // url: 'https://wincos.co.ke/',
        // url: 'https://admin-finetek.netlify.app/?email='+user.email,
        url: 'https://admin-finetek.netlify.app/#user?email='+member.email,
        // This must be true.
        handleCodeInApp: true,

      }
      document.getElementById('duplicate-email-error').classList.add('hidden')
      if(!formIsValid('member-form'))return
      console.log(this.newMember)
      const data = (await getDoc(doc(db, 'team', member.email))).data()
      if(data){
        document.getElementById('duplicate-email-error').classList.remove('hidden')
        return
      }
      try{
        await sendSignInLinkToEmail(getAuth(), this.newMember.email,actionCodeSettings)
        await setDoc(doc(db, 'team', this.newMember.email), {
          ...this.newMember,
          dateJoined: new Date()
        })
      }catch (e) {
        console.log(e)

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
      this.newMember = {}
      this.showAddMember = false
    },
    EditMember(id){
      this.newMember = JSON.parse(JSON.stringify(this.team[id]))
      document.getElementById('member-form').classList.add("prefilled-form")
      document.getElementById('password-fields-cont').classList.replace('flex','hidden')
      this.editing = id
      document.getElementById('email').disabled=true
      document.getElementById('username').disabled=true
    },
    async DeleteMember(email){
      if(await confirmAction({
        title:'Delete member?',
        btnText:'Delete',
        text:''
      })){
        try{
          await deleteDoc(doc(db, 'team', email))
          Report({title:'Member deleted',icon:'success'})
        }catch{
          Report({title:'Error occurred',icon:'error'})
        }
      }

    },
    ClickOutside(event){
      try {
        if(!this.$refs.formRef.contains(event.target)){
          this.showAddMember = false
        }
      }catch {}

    }
  },
  watch:{

  } ,
  mounted() {
    // this.ClickOutside

  }
}
</script>

<style scoped>
.team-header{background: linear-gradient(to right, #1f1d1da9,#1f1d1da9), url(~@/assets/images/team/team-header.jpg) no-repeat center/cover;}
.user-modify-cont:hover .user-modify{display: initial}

</style>

,
