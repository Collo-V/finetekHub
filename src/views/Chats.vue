<template>
  <div class="flex h-full w-full relative">
    <div class="flex flex-col justify-between p-4 absolute bottom-10
     right-10 bg-primary-purple text-white z-5 w-300px hidden
     h-100px rounded-md vue-shadow animate__animated animate__fadeInUp"
         ref="notifCont"
    >
      <div>
        Enable desktop notifications
      </div>
      <div class="flex justify-end gap-4">
        <button class="w-fit h-8 px-4 rounded-sm" @click="DenyNotif">Not now</button>
        <button class="w-fit rounded-sm h-8 px-4 bg-white text-black" @click="RequestNotif">Yes</button>
      </div>
    </div>
    <TeamCont @SelectChat="(chat)=>SelectChat(chat)"/>
    <div class="h-full w-full" v-if="selectedId !== undefined">
      <div class="block h-full w-full">
        <MainChat
            :selected-id="selectedId"
            :private-reply="privateReply"
            @set-selected="(selected)=>SetSelected(selected)"
            @reply-privately="(chat)=>ReplyPrivately(chat)"
            @remove-private-reply="privateReply = undefined"
        />
      </div>
<!--      <div class="lg:hidden w-full h-full">-->
<!--        <MobChat/>-->
<!--      </div>-->
    </div>
    <div v-else class="h-full w-full flex items-center justify-center">
      CLick on an account and start chatting
    </div>
  </div>

</template>

<script>
import MainChat from "@/components/MainChat";
import MobChat from "@/components/MobChat";
import TeamCont from "@/components/chats/TeamCont";
import {mapState} from "vuex";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {Report} from "@/commons/swal";
import {doc, setDoc, updateDoc} from "firebase/firestore";
import {CodeGenerator} from "@/commons";
export default {
  name: "Chats",
  components:{
    MainChat,MobChat,TeamCont
    // Test
  },
  data(){
    return{
      message:'',
      files:[],
      selectedId:undefined,
      privateReply:undefined
    }
  },
  computed: mapState({
    chats:state => state.chats.chats,
  }),
  methods:{
    async RequestNotif(){
      let cont = this.$refs.notifCont
      cont.classList.replace('animate__fadeInUp','animate__fadeInDown')
      setTimeout(()=>{
        cont.classList.add('hidden')
      },1000)
      let permission = await Notification.requestPermission()
      this.$store.commit('WriteNotifPermission',permission)

    },
    DenyNotif(){
      let cont = this.$refs.notifCont
      cont.classList.replace('animate__fadeInUp','animate__fadeInDown')
      setTimeout(()=>{
        cont.classList.add('hidden')
      },1000)
      this.$store.commit('WriteNotifPermission','denied')
    },
    SelectChat(id){
      if(id){
        this.selectedId = id
        document.getElementById('team-cont').classList.add('w-0')
      }
    },
    SetSelected(selected){
      console.log(selected)
      this.selectedId = selected
      if(selected === undefined){
        document.getElementById('team-cont').classList.remove('w-0')
      }
    },
    ReplyPrivately(chat){
      this.SelectChat(chat.sender)
      this.privateReply = chat.id
    }

  },
  mounted(){
    if(Notification.permission !== "granted" && this.$store.state.settings.notifPermission === 'default'){
      setTimeout(()=>{
        this.$refs.notifCont.classList.remove('hidden')
      },3000)
    }
  }

}
</script>

<style scoped>
</style>
