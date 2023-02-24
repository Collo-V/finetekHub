<template>
  <div :class="GetBubbleClass()">
    <div class="triangle-right absolute left-full top-0" v-if="chat.sender === user.username"></div>
    <div class="triangle-left absolute right-full top-0" v-else></div>
    <span class="-mt-2 font-bold text-primary-purple-light/75" v-if="chat.isChannelChat && chat.sender !== user.username">
                    {{GetName(chat.sender)}}
                  </span>
    <div v-if="replyFor">
      <div class="w-full min-h-16 bg-inherit bottom-full flex items-center cursor-pointer"
           @click="$emit('GoToChat',replyFor.id)"
      >
        <div class="reply-for-cont w-full h-16 rounded-sm flex bg-slate-300 overflow-hidden justify-between pr-2">
          <div class="w-2 h-full bg-primary mr-2" v-if="chat.sender === user.username"></div>
          <div class="w-2 h-full bg-primary-purple mr-2" v-else></div>
          <div class="w-full h-full flex justify-center flex-col">
            <div class="flex text-primary-red gap-2">
            <span class="" v-if="replyFor.sender!==user.username">
              {{GetName(replyFor.sender)}}
            </span>
              <span class="mb-2 text-primary-red" v-else>You</span>
              <span v-if="replyFor.isChannelChat && team[chat.recipient]"> At {{channels[replyFor.recipient].name}}</span>
            </div>
            <div class="flex items-center gap-2 max-h-50px overflow-hidden text-black">
              <i class="fa-solid fa-camera" v-if="replyFor.images.length>0"/>
              message<!--{{replyFor.message}}-->
            </div>
          </div>
          <div class="h-full flex" v-if="replyFor.images.length>0">
            <div class="h-full flex">
              <div class="h-full" v-for="image in replyFor.images.slice(0,2)">
                <img :src="image.url" class="h-full w-auto">
              </div>
            </div>
            <span v-if="replyFor.images.length>2">
            +{{replyFor.images.length-2}}
          </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="chat.images.length>0" class="relative dropdown-cont mb-2"
         @click="[selectedFiles = chat.images,selectedIsImage = true]"
    >
        <div class="absolute top-0 left-0 right-0 bottom-0 bg-slate-500/50 z-2 dropdown"></div>
      <div v-for="image in chat.images"      class="relative"

      >
        <div class="dropdown absolute top-0 mt-3 right-0 mr-2
                      animate__animated animate__fadeOutUps animate__fadeInDown">
          <button class="px-2 py-1 w-16 focus:outline-none border-1px rounded-md text-black bg-white"
                  @click="DownloadFile(image)">
            <i class="fa-solid fa-cloud-arrow-down"></i>
          </button>
        </div>
        <img :src="image.url" alt="" class="max-w-300px h-auto max-h-250px" >
      </div>
    </div>
    <div v-if="chat.files.length>0" class="relative dropdown-cont cursor-zoom-in "
         @click="[selectedFiles = chat.files,selectedIsImage = false]"
    >
      <div class="absolute top-0 left-0 right-0 bottom-0 bg-slate-500/50 z-2 dropdown"></div>
      <div class="absolute top-0 left-0 right-0 h-2 bg-white z-2 dropdown"></div>
      <div v-for="file in chat.files">
        <div class="dropdown absolute top-0 mt-3 right-0 mr-2
                      animate__animated animate__fadeOutUps animate__fadeInDown">
          <button class="px-2 py-1 w-16 focus:outline-none border-1px rounded-md text-black bg-white"
                  @click="DownloadFile(file)">
            <i class="fa-solid fa-cloud-arrow-down"></i>
          </button>
        </div>
        <div class="relative overflow-hidden w-300px h-300px border-1px mt-2">
          <div class="absolute h-full w-5 bg-white top-0 right-0 z-1"></div>
          <div class="absolute w-full h-5 bg-slate-200 top-0 right-0 z-1">
            {{file.name}}
          </div>
          <div class="absolute -left-10px overflow-hidden bottom-0 -top-56px -right-10px">
            <iframe :src="file.url" alt=""
                    style="overflow: hidden"
                    class="h-800px absolute left-0 w-300px overflow-hidden custom-scroll scroll-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    <div>
      <span v-html="CheckLink(chat.message)" v-if="typeof (chat.message) === 'string'"></span>
      <QuillEditor
          v-else
          ref="chatMessage"
           class="chat-quill"
          :options="quillOptions"
          :content="message"
      />

    </div>
    <div class="dropdown absolute right-0 top-0 mr-1 dropdown-cont">
      <button class="focus:outline-none" @mouseover="DisplayModify('modify-chat'+chat.id)">
        <i class="fa-solid fa-angle-down"></i>
      </button>
      <div :class="GetModifyClass()"
           :id="'modify-chat'+chat.id">
        <button class="w-full focus:outline-none hover:bg-slate-100 h-8"
                @click.prevent="$emit('SetReplyFor')">
                             <span class="w-full pl-8 block text-left">
                               <i class="fa-solid fa-reply"></i> Reply
                             </span>
        </button>
        <button class="w-full focus:outline-none hover:bg-slate-100 h-8"
                @click.prevent="$emit('ReplyPrivately')"
                v-if="chat.isChannelChat && chat.sender !== this.user.channel"
        >
                             <span class="w-full pl-8 block text-left">
                               <i class="fa-solid fa-reply"></i> Reply Privately
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
  <FilePreviews
      :files="selectedFiles"
      :is-image="selectedIsImage"
      @hide-modal="selectedFiles = undefined"
      @download="(file)=>DownloadFile(file)"
      v-if="selectedFiles"
  />

</template>

<script>
import {mapState} from "vuex";
import {checkLink} from "@/commons/chatting";
import {confirmAction} from "@/commons/swal";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "@/firebase";
import {QuillEditor,Delta} from "@vueup/vue-quill";
import FilePreviews from "@/components/chats/FilePreviews";

export default {
  name: "ChatBubble",
  components: {
    FilePreviews ,
    QuillEditor
  },
  props:['chat'],
  emits:['SetReplyFor','GoToChat','ReplyPrivately'],
  data(){
    return{
      selectedFiles:undefined,
      selectedIsImage:true,
      quillOptions:{
        modules:{
          toolbar:false,
        },
        readOnly:true
      }
    }
  },
  methods:{
    GetBubbleClass(){
      let bubbleClass =  "shadow min-h-10 flex justify-center w-fit p-2 flex-col "+
      "chat-bubble rounded-b-md dropdown-cont relative "
      bubbleClass += this.chat.sender !== this.user.username?
          'bg-primary chat-bubble-left rounded-tr-md':
          'bg-white chat-bubble-right rounded-tl-md'
      return bubbleClass
    },
    GetModifyClass(){
      let modifyClass =  "dropdown modify-chat absolute right-0" +
          " w-200px h-18 py-1 bg-white shadow-md mt-1px top-full z-1"
      modifyClass += this.chat.sender !== this.user.username?
          ' modify-chat-left text-black':
          ''
      return modifyClass
    },
    GetName(username){
      return !this.team[username]?'':`${this.team[username].firstName} ${this.team[username].lastName}`
    },
    DownloadFile({url,name}){
      let element = document.createElement('a');
      element.setAttribute('href',url);
      name = name.replace('file-','').replace('IMG-','')
      // element.setAttribute('download', name);
      element.download = name
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
    chats:state => state.chats.chats,
    channels:state => state.channels,
    message(){
      let delta = new Delta(this.chat.message)
      // this.$refs.chatMessage.getQuill().setContents(delta)
      return delta
    },
    replyFor(state){
      if(this.chat.replyFor !== null){
        return this.chats[this.chat.replyFor]
      }else{
        return
      }
    }
    // chat:ca
  }),
  mounted() {
    this.message
  }
}
</script>

<style>
/*.chat-bubble-right .reply-for-cont{*/
/*  @apply bg-slate-300*/
/*}*/
/*.chat-bubble-left .reply-for-cont{*/
/*  @apply bg-white*/
/*}*/

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
.chat-quill .ql-container.quill-snow{
  @apply border-0 h-fit;
}
.chat-quill .quill-editor{
  @apply p-0
}


</style>
