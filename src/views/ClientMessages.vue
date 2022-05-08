<template>
  <div class="w-full" v-if="selectedMsg==''">
    <div v-for="msg in messages"
         :class="`flex h-10 border-b-1px items-center px-3 w-full
         overflow-hidden hover:shadow-md hover:m-1px hover:z-2 cursor-pointer justify-between`+ isRead(msg.isRead)"
         @click="[selectedMsg=msg,ReadMsg(msg.id)]">
      <div class="w-300px">
        {{msg.fName}} {{msg.lName}}
      </div>
      <div class="flex w-full justify-betweem">
        <div class="flex min-w-0 w-500px">
        <span class="text-ellipsis">
          {{msg.message}}
        </span>
        </div>
        <div class="w-100px">
          {{DateFormat(msg.date)}}
        </div>
      </div>
      </div>
  </div>
  <div v-else class="lg:w-1/2 mx-auto text-16px p-2">
    <div>
      <button class="h-10 w-100px focus:outline-none border-1px border-grey-light rounded-md" @click="selectedMsg=''">
        <span class="mr-2"><i class="fa-solid fa-arrow-left"></i></span> back
      </button>
    </div>
    <div class="flex justify-between h-16 items-center mb-3">
      <div class="font-bold ">{{selectedMsg.fName}} {{selectedMsg.lName}}</div>
      <div>{{DateFormat(selectedMsg.date,true)}}</div>
    </div>
    <div class="mb-3 ">
      <div class="mb-2">
        Email: <a :href="'mailto:'+selectedMsg.email" class="text-primary underline">{{selectedMsg.email}}</a>
      </div>
      <div class="mb-2">
        Phone: <a :href="'tel:'+selectedMsg.phone" class="text-primary underline">{{selectedMsg.phone}}</a>
      </div>
    </div>
    <div class="pl-3 mb-3 border-b-1px border-t-1px py-3">
      {{selectedMsg.message}}
    </div>
    <div>
      <button class="h-10 w-100px focus:outline-none border-1px border-grey-light rounded-md">
        <span class="mr-2"><i class="fa-solid fa-reply"></i></span> reply
      </button>
    </div>

  </div>
{{GetMessages()}}
</template>

<script>
import {team,db} from "@/firebase";
import {getDoc,onSnapshot,setDoc,doc,query,where,getDocs,deleteDoc,updateDoc} from 'firebase/firestore'

export default {
  name: "ClientMessages",
  data(){
    return {
      selectedMsg:'',
      messages:''
    }
  },
  methods:{
    GetMessages(){
      this.messages = this.$store.getters.getClientMessages
    },
    DateFormat(date,selected){
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      date = parseInt(date)
      let today = new Date()
      let d = new Date(date)
      let isToday = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`
          ==`${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`?true:false
      let time = d.getHours()>=12?'pm':'am'
      if(!selected){
        return isToday?`${d.getHours()}:${d.getMinutes()} ${time}`:`${months[d.getMonth()]} ${d.getDate()}`
      }else {
        let a = today.getTime()-d.getTime()
        let dif = (a/1000/3600/24/30)>1?`${Math.trunc(a/1000/3600/24/30)} months ago`:
            (a/1000/3600/24)>1?`${Math.trunc(a/1000/3600/24)} days ago`:
                (a/1000/3600)>1?`${Math.trunc(a/1000/3600)} hours ago`:
                    (a/1000/60)>1?`${Math.trunc(a/1000/60)} minutes ago`:`few seconds ago`
        return isToday?`${d.getHours()}:${d.getMinutes()} ${time} (${dif})`:
            `${months[d.getMonth()]} ${d.getDate()} (${dif})`
      }

    },
    isRead(isRead) {
        return !isRead?' font-bold bg-grey-lightest':''
   },
    async ReadMsg(id){
      if(this.messages[id].isRead==true){return}
      await updateDoc(doc(db,'messages',id),{isRead:true})
    },

  }
}
</script>
<style scoped>

</style>