<template>
  <div class="flex h-full w-full relative">
    <TeamCont @SelectChat="(chat)=>SelectChat(chat)"/>
    <div class="h-full w-full" v-if="selectedId !== undefined">
      <div class="block h-full w-full">
        <MainChat :selected-recipient="selectedRecipient" :selected-id="selectedId" @remove-selected="RemoveSelected()"/>
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
      selectedRecipient:undefined ,
      message:'',
      files:[],
      selectedId:undefined
    }
  },
  computed: mapState({
    chats:state => state.chats.chats
  }),
  methods:{
    SelectChat(id){
      if(id){
        console.log(id)
        this.selectedId = id
        document.getElementById('team-cont').classList.add('w-0')
      }
    },
    RemoveSelected(){
      this.selectedRecipient = undefined
      document.getElementById('team-cont').classList.remove('w-0')
    }

  }



}
</script>

<style scoped>
</style>
