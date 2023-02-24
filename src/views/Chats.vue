<template>
  <div class="flex h-full w-full relative">
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
    chats:state => state.chats.chats
  }),
  methods:{
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

  }



}
</script>

<style scoped>
</style>
