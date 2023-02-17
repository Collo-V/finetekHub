<template>
  <div :class="GetBubbleClass()">
    <div class="triangle-right absolute left-full top-0" v-if="chat.sender === user.username"></div>
    <div class="triangle-left absolute right-full top-0" v-else></div>
    <span class="-mt-2" v-if="chat.isChannelChat">
                    {{GetName(chat.sender)}}
                  </span>
    <div v-if="chat.replyFor !== null">
      <a :href="'#chat-'+chat.replyFor" class="block w-fit min-w-full h-16 rounded-sm
                       flex overflow-hidden bg-slate-300 pr-1px justify-between">
        <div class="w-2 h-full bg-primary mr-2"></div>
        <div class="w-full h-full flex justify-center">
          <div class="mb-2 text-primary-red"
               v-if="SearchChat(chat.replyFor).sender==colleague.username">
            {{colleague.firstName}} {{colleague.lastName}}
          </div>
          <div class="mb-2 text-primary-red" v-else>You</div>
          <div class="w-full overflow-y-hidden">
            <span class="mr-2" v-if="SearchChat(chat.replyFor).image!=''"><i class="fa-solid fa-camera"></i></span>
            {{ SearchChat(chat.replyFor).message}}
          </div>
        </div>
        <div class="h-full" v-if="SearchChat(chat.replyFor).image!=''">
          <img :src="SearchChat(chat.replyFor).image.link" class="h-full w-auto">
        </div>
      </a>
    </div>
    <div v-if="chat.images.length>0" class="relative dropdown-cont mb-2">
      <div v-for="image in chat.images">
        <div class="dropdown absolute top-0 mt-3 right-0 mr-2
                      animate__animated animate__fadeOutUps animate__fadeInDown">
          <button class="px-2 py-1 w-16 focus:outline-none border-1px rounded-md text-black bg-white"
                  @click="DownloadImage(image.url)">
            <i class="fa-solid fa-cloud-arrow-down"></i>
          </button>
        </div>
        <img :src="image.url" alt="" class="max-w-300px h-auto">
      </div>
    </div>
    <div v-if="chat.files.length>0" class="relative dropdown-cont">
      <div v-for="file in chat.files">
        <div class="dropdown absolute top-0 mt-3 right-0 mr-2
                      animate__animated animate__fadeOutUps animate__fadeInDown">
          <button class="px-2 py-1 w-16 focus:outline-none border-1px rounded-md text-black bg-white"
                  @click="DownloadImage(file.url)">
            <i class="fa-solid fa-cloud-arrow-down"></i>
          </button>
        </div>
        <iframe :src="file.url" alt="" class="max-w-300px h-auto"></iframe>
        <div class="absolute w-full h-10 btm-0 left-0 flex items-center bg-slate-300">
          {{chat.file.name}}
        </div>
      </div>
    </div>
    <span v-html="CheckLink(chat.message)"></span>
    <div class="dropdown absolute right-0 top-0 mr-1 dropdown-cont">
      <button class="focus:outline-none" @mouseover="DisplayModify('modify-chat'+chat.id)">
        <i class="fa-solid fa-angle-down"></i>
      </button>
      <div :class="GetModifyClass()"
           :id="'modify-chat'+chat.id">
        <button class="w-full focus:outline-none hover:bg-slate-100 h-8"
                @click.prevent="$emit('SetReply')">
                             <span class="w-full pl-8 block text-left">
                               <i class="fa-solid fa-reply"></i> Reply
                             </span>
        </button>
        <button class="w-full focus:outline-none hover:bg-slate-100 h-8" @click='DeleteMsg(chat.id)'>
                           <span class="w-full pl-8 block text-left">
                            <i class="fa-solid fa-trash"></i> Delete
                           </span>
        </button>

      </div>
    </div>
  </div>

</template>

<script>
import {mapState} from "vuex";
import {checkLink} from "@/commons/chatting";
import {confirmAction} from "@/commons/swal";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "@/firebase";

export default {
  name: "ChatBubble",
  props:['chat'],
  data(){
    return{}
  },
  methods:{
    GetBubbleClass(){
      let bubbleClass =  "shadow min-h-10 flex justify-center w-fit p-4 flex-col "+
      "chat-bubble rounded-b-md dropdown-cont relative "
      bubbleClass += this.chat.sender !== this.user.username?
          'bg-primary text-white chat-bubble-left rounded-tr-md':
          'bg-white chat-bubble-right rounded-tl-md'
      return bubbleClass
    },
    GetModifyClass(){
      let modifyClass =  "dropdown modify-chat absolute right-0" +
          " w-150px h-18 py-1 bg-white shadow-md mt-1px top-full z-1"
      modifyClass += this.chat.sender !== this.user.username?
          ' modify-chat-left text-black':
          ''
      return modifyClass
    },
    GetName(username){
      return !this.team[username]?'':`${this.team[username].firstName} ${this.team[username].lastName}`
    },
    DownloadImage(link){
      let element = document.createElement('a');
      element.setAttribute('href',link);
      // element.setAttribute('download', 'Img_'+new Date());
      // element.download
      element.target = '_blank'
      element.click()
    },
    DisplayModify(id,hide){
      try{
        let c = document.getElementById(id)
        let offsetTop = c.getBoundingClientRect().top
        if ((c.clientHeight + 300) > (screen.height - offsetTop)) {
          c.classList.replace('top-full', 'btm-full')
        } else {
          c.classList.replace('btm-full', 'top-full')
        }
        if (c.classList.contains('modify-chat-left')) {
          c.classList.replace('right-0', 'left-full')
          c.classList.replace('top-full', 'btm-full')
          c.classList.add('-ml-3')
        } else {
          c.classList.replace('left-full', 'right-0')
          c.classList.remove('-ml-3')
        }
      }catch {}
    },
    CheckLink(message){
      return checkLink(message)
    },
    async DeleteMsg(deleteId){
      if(!await confirmAction({
        title:'Delete message?',
        btnText:'Delete',
        text:''
      })){return}
      try{
        await updateDoc((doc(db, 'chats', deleteId)), {
          isDeleted: true
        })
      }catch (e) {
        console.log(e)
      }
    },
  },
  computed:mapState({
    user:state => state.user,
    team:state => state.team,
    // chat:ca
  })
}
</script>

<style scoped>
.triangle-left {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-right: 10px solid #00afee;
  border-bottom: 5px solid transparent;
}
.triangle-right {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-left: 10px solid #fff;
  border-bottom: 5px solid transparent;
}

</style>
