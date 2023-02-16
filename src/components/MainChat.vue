<template>
    <div class="w-full h-full chat-section relative">
      <div class="h-full flex flex-col" >
        <div>
          <div class="header h-16 bg-white lg:bg-slate-300 p-2 flex shadow-md lg:shadow-0" v-if="selectedRecipient.username">
            <button class="focus:outline-none text-18px mx-5 lg:hidden" @click="$emit('RemoveSelected')">
              <i class="fas fa-long-arrow-left"></i>
            </button>
            <img :src="selectedRecipient.image" alt="" class="h-12 w-12 rounded-full">
            <div class="flex flex-col ml-3">
              <div class="mb-2">{{selectedRecipient.firstName}} {{selectedRecipient.lastName}}</div>
              <div v-if="typingStatus[selectedRecipient.username]">
                <span class="text-primary">Typing...</span>
              </div>
              <div class="" v-else>
                <span v-if=" time- status[selectedRecipient.username] < 4000 " class="text-primary">Online</span>
                <span v-else >Last seen: {{lastSeen}}</span>
              </div>
            </div>
          </div>
          <div class="header h-16 bg-white lg:bg-slate-300 p-2 flex shadow-md lg:shadow-0" v-else>
            <button class="focus:outline-none text-18px mx-5 lg:hidden" @click="$emit('RemoveSelected')">
              <i class="fas fa-long-arrow-left"></i>
            </button>
            <img :src="selectedRecipient.image" alt="" class="h-12 w-12 rounded-full">
            <div class="flex flex-col ml-3">
              <div class="mb-2">{{selectedRecipient.firstName}} {{selectedRecipient.lastName}}</div>
              <div v-if="selectedRecipient.username && typingStatus[selectedRecipient.username]">
                <span class="text-primary">Typing...</span>
              </div>
              <div class="" v-else>
                <span v-if=" time- status[selectedRecipient.username] < 4000 " class="text-primary">Online</span>
                <span v-else >Last seen: {{lastSeen}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="chats-cont bg-primary h-full overflow-auto custom-scroll px-3 relative"
             @scroll="SeeScroll($event)"
        >
          <div class="block w-full h-10 bg-orange-100 flex items-center justify-center shadow mb-5 mt-10 xl:mt-16 2xl:mt-24">
            The messages are end-to-end encrypted
          </div>
          <div v-for="div in chats" class="mt-10 chat-div" :id="'chat-div-'+div.date">
            <div class="h-0 border-b-1px flex items-center justify-center">
              <div class="w-200px h-8 bg-white rounded-pill flex items-center chat-div-display
               justify-center top-16 top-16 lg:top-32 z-4 bg-gray-400"
                   :id="'chat-div-display-'+div.date"
              >
                {{GetDate(div.date)}}
              </div>
            </div>
            <div class="mb-3 w-full focus:bg-red-500 mt-5" v-for="chat in div.chats" :id="'chat-'+chat.id">
              <div class="w-full pl-3 flex flex-col items-end"
                   v-if="chat.sender ===user.username">
                <div class="bg-white self-end shadow min-h-10 flex justify-center w-fit p-4 flex-col
                  chat-bubble chat-bubble-right rounded-b-md rounded-tl-md dropdown-cont relative mr-2">
                  <div class="triangle-right absolute left-full top-0"></div>
                  <div v-if="chat.replyFor  !==null">
                    <a :href="'#chat-'+chat.replyFor" class="block w-fit min-w-full h-16 rounded-sm
                       flex overflow-hidden bg-slate-300 pr-1px justify-between">
                      <div class="w-2 h-full bg-primary mr-2"></div>
                      <div class="w-full h-full flex justify-center flex-col">
                        <div class="mb-2 text-primary-red"
                             v-if="SearchChat(chat.replyFor).sender==selectedRecipient.username">
                          {{selectedRecipient.firstName}} {{selectedRecipient.lastName}}
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
                      animate__animated  animate__fadeInDown">
                        <button class="px-2 py-1 w-16 focus:outline-none border-1px rounded-md text-black bg-white"
                                @click="DownloadImage(image.url)">
                          <i class="fa-solid fa-cloud-arrow-down"></i>
                        </button>
                      </div>
                      <img :src="image.url" class="max-w-300px h-auto">

                    </div>
                  </div>
                  <div v-if="chat.files.length >0" class="relative dropdown-cont mb-2">
                    <div v-for="file in chat.files">
                      <div class="dropdown absolute top-0 mt-3 right-0 mr-2
                      animate__animated  animate__fadeInDown">
                        <button class="px-2 py-1 w-16 focus:outline-none border-1px rounded-md text-black bg-white"
                                @click="DownloadImage(file.url)">
                          <i class="fa-solid fa-cloud-arrow-down"></i>
                        </button>
                      </div>
                      <iframe :src="file.url" class="max-w-300px h-auto"></iframe>
                      <div class="absolute w-full h-10 btm-0 left-0 flex items-center bg-slate-200">
                        {{file.name}}
                      </div>
                    </div>
                  </div>
                  <span v-html="CheckLink(chat.message)"></span>
                  <div class="dropdown absolute right-0 top-0 mr-1 dropdown-cont">
                    <button class="focus:outline-none" @mouseover="DisplayModify('modify-chat'+chat.id)">
                      <i class="fa-solid fa-angle-down"></i>
                    </button>
                    <div class="dropdown modify-chat absolute right-0 w-150px h-18 py-1 bg-white shadow-md mt-1px top-full z-1"
                         :id="'modify-chat'+chat.id" @blur="InputFocus()">
                      <button class="w-full focus:outline-none hover:bg-slate-200 h-8"
                              @click.prevent="[replyFor = chat,ReplyMsg()]">
                             <span class="w-full pl-8 block text-left">
                               <i class="fa-solid fa-reply"></i> Reply
                             </span>
                      </button>
                      <button class="w-full focus:outline-none hover:bg-slate-200 h-8" @click='DeleteMsg(chat.id)'>
                           <span class="w-full pl-8 block text-left">
                            <i class="fa-solid fa-trash"></i> Delete
                           </span>
                      </button>

                    </div>
                  </div>
                </div>
                <div class="text-3 mt-1 flex">
                  {{GetTime(chat.time)}}
                  <div class="flex justify-end text-8px ml-1">
                    <span class="text-grey relative" v-if="!chat.isRead">
                      <span><i class="fa-solid fa-check"></i></span>
                        <span class="absolute right-0 mr-1" v-if="chat.isDelivered">
                          <i class="fa-solid fa-check"></i>
                        </span>
                    </span>
                    <span class="text-primary relative" v-else>
                        <span><i class="fa-solid fa-check"></i></span>
                        <span class="absolute right-0 mr-1"><i class="fa-solid fa-check"></i></span>
                      </span>
                  </div></div>
              </div>
              <div class="w-full pl-3"
                   v-else >
                <div class="bg-primary text-white shadow min-h-10 flex justify-center w-fit p-4 flex-col
                  chat-bubble chat-bubble-left rounded-b-md rounded-tr-md dropdown-cont relative">
                  <div class="triangle-left absolute right-full top-0"></div>
                  <div v-if="chat.replyFor !== null">
                    <a :href="'#chat-'+chat.replyFor" class="block w-fit min-w-full h-16 rounded-sm
                       flex overflow-hidden bg-slate-300 pr-1px justify-between">
                      <div class="w-2 h-full bg-primary mr-2"></div>
                      <div class="w-full h-full flex justify-center">
                        <div class="mb-2 text-primary-red"
                             v-if="SearchChat(chat.replyFor).sender==selectedRecipient.username">
                          {{selectedRecipient.firstName}} {{selectedRecipient.lastName}}
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
                  <div v-if="chat.files.length>0" class="relative dropdown-cont mb-2">
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
                    <div class="dropdown modify-chat modify-chat-left absolute right-0 w-150px text-black
                      h-18 py-1 bg-white shadow-md -mt-1 top-full z-1"
                         :id="'modify-chat'+chat.id" @blur="InputFocus()">
                      <button class="w-full focus:outline-none hover:bg-slate-100 h-8"
                              @click.prevent="[replyFor = chat]">
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
                <div class="text-3 mt-1">{{GetTime(chat.time)}}</div>
              </div>

            </div>
          </div>
          <div class="w-full pl-3 flex flex-col items-end">
            <div class="upload-tracker bg-white self-end shadow min-h-100px flex justify-center w-fit flex-col
                  chat-bubble chat-bubble-right rounded-b-md rounded-tl-md dropdown-cont relative mr-2" v-show="uploadTask!=''">
              <div class="min-h-100px w-200px relative p-1">
                <div class="absolute left-0  z-2 top-0 p-2 h-full w-full flex items-center justify-center dropdown-cont">
                  <button class="absolute left-0  top-0 focus:outline-none h-10 w-10 bg-white border-grey
                      rounded-full border-1px flex items-center justify-center mt-1
                       mx-auto" @click="uploadTask.cancel()" v-if="uploadTask._state != 'canceling'">
                    <i class="fas fa-xmark"></i>
                  </button>
                  <button class="absolute left-0  top-0 focus:outline-none h-10 w-10 bg-white border-grey
                      rounded-full border-1px flex items-center justify-center mt-1
                       mx-auto" @click="ClearFiles()"
                          v-if="uploadTask._state == 'canceling'">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  <button class="hidden dropdown focus:outline-none h-10 w-10 bg-white border-grey
                      rounded-full border-1px flex items-center justify-center
                       mx-auto" @click="uploadTask.pause()" v-if="uploadTask._state == 'running'">
                    <i class="fa-solid fa-pause"></i>
                  </button>
                  <button class="focus:outline-none h-10 w-10 bg-white border-grey
                      rounded-full border-1px flex items-center justify-center
                       mx-auto" @click="uploadTask.resume()" v-else-if="uploadTask._state == 'paused' ||
                               uploadTask._state == 'pausing' ">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                  </button>
                  <button class="focus:outline-none h-10 w-10 bg-white border-grey
                      rounded-full border-1px flex items-center justify-center
                       mx-auto" @click="UploadFiles()"
                          v-if="uploadTask._state == 'canceled' || uploadTask._state == 'canceling'">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                  </button>
                </div>
                <div class="absolute right-0 w-16px bg-white top-0 h-full z-1"></div>
                <div class="absolute right-0 w-full bg-white top-0 h-16px z-1"></div>
                <div class="prog-bar-cont absolute btm-0 w-full h-2 left-0 overflow-x-hidden">
                  <div class="h-full bg-blue-500 w-0" id="prog-bar"></div>
                </div>
                <iframe :src="filePrev" class=" overflow-auto custom-scroll" @scroll.stop="" v-if="filePrev!=''"></iframe>
                <img :src="imagePrev" class=" overflow-auto custom-scroll" @scroll.stop="" v-else>
              </div>
            </div>

          </div>
        </div>
        <ChatInput :uploadTask="uploadTask"
                   @set-upload-task="(task)=>SetUploadTask(task)"
                   :reply-for="replyFor"
                   :selected-recipient="selectedRecipient"
                   @set-reply-for="(reply)=>SetReplyFor(reply)"
        />
      </div>
    </div>

</template>


<script>
import 'emoji-picker-element'
import {Picker} from "emoji-picker-element";
import {getDoc, onSnapshot, setDoc, doc, query, where, getDocs, deleteDoc, updateDoc, addDoc} from 'firebase/firestore'
import {TextAreaAdjust, RemoveFromArray, ReverseArray, isEmail, CodeGenerator, dateFormatter} from "@/commons";
import {confirmAction, Report} from "@/commons/swal";
import {mapState} from 'vuex'
import {getDownloadURL, getStorage, ref, uploadBytes,uploadBytesResumable} from "firebase/storage";
import TeamCont from "@/components/chats/TeamCont";
import {filterData} from "@/commons/objects";
import {checkLink} from "@/commons/chatting";
import ChatInput from "@/components/chats/ChatInput";
import {db} from "@/firebase";

export default {
  name: "MainChat",
  props:['selectedRecipient'],
  data(){
    return {
      chatIds:{},
      sending:false,
      input:"",
      replyFor:undefined,
      showEmoji:false,
      inputImage:'',
      imagePrev:'',
      filePrev:'',
      inputFile:'',
      uploadTask:'',
      onlineStatus:{},


    }

  },
  components:{
    ChatInput,
    TeamCont,
    Picker
  },
  methods:{
    DateFormat(date,prev){
      return dateFormatter(date)

    },
    SetUploadTask(task){
      this.uploadTask = task
    },
    SetReplyFor(task){
      this.replyFor = task
    },
    GetTime(time){
      time = new Date(time)
      let hour = time.getHours()
      let mins = time.getMinutes()
      if(mins<10) mins = '0'+mins
      return  hour<12? `${hour}:${mins} a.m`:`${hour-12}:${mins} p.m`
    },
    GetDate(date){
      let today = new Date()
      let todayTime = (new Date(`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`)).getTime()
      if(todayTime- date < 86400000){ //The length of a day
        return 'Today'
      }
      if(todayTime- date < 86400000*2){ //The length of a day
        return 'Yesterday'
      }
      return  dateFormatter(date,'short-formal')
    },
    SeeScroll(event){
      let divs  = event.target.getElementsByClassName('chat-div')
      let displays = document.getElementsByClassName('chat-div-display')
      for (let i = 0; i < displays.length; i++) {
        displays[i].classList.remove('fixed','mt-2')
      }
      for (let i = 0; i < divs.length; i++) {
        let rect = divs[i].getBoundingClientRect()
        if(rect.top<100 && rect.bottom>20){
          let onView = divs[i]
          let display = document.getElementById(onView.id.replace('chat-div','chat-div-display'))
          // console.log(display)
          display.classList.add('fixed','mt-2')
        }
      }
    },
    async DeleteMsg(deleteId){
      if(!await confirmAction()){return}
      try{
        await updateDoc((doc(db, 'chats', deleteId)), {
          isDeleted: true
        })
      }catch (e) {
        console.log(e)
      }
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
    SearchChat(id){
      try{
        let user = this.selectedRecipient.username
        let userChats = this.chats[user]
        if (!userChats) {
          return
        }
        for (let i = 0; i < userChats.length; i++) {
          let c = JSON.parse(JSON.stringify(userChats[i]))
          if (c.id == id) {
            return c
          }
        }
      }catch{}
    },
    ShowEmoji(show){
      let all = this
      this.showEmoji= show
      if(!show){return}
      if(document.getElementById('emoji-picker')){
        this.InputFocus()
        return;
      }
      let picker = new Picker()
      picker.classList.add('w-full','h-full')
      picker.id = 'emoji-picker'
      picker.addEventListener('emoji-click', event => {
        all.input+=event.detail.emoji.unicode
        this.InputFocus()
      })
      document.getElementById('emoji-picker-cont').appendChild(picker)

    },
    DownloadImage(link){
      let element = document.createElement('a');
      element.setAttribute('href',link);
      // element.setAttribute('download', 'Img_'+new Date());
      // element.download
      element.target = '_blank'
      element.click()
    },
    CheckLink(message){
      return checkLink(message)
    },
    CheckKey(event){
      if(event.altKey && event.code === 'Enter' && this.input!=''){
        this.input+='\n'
      }
      else if(event.code === 'Enter'){
        this.UploadFiles()
      }
    },
    WriteIsRead(chats){
      chats = Object.values(chats).filter(a=>a.sender!==this.user.username)
      for (let i = 0; i < chats.length; i++) {
        updateDoc(doc(db,'chats',chats[i].id),{
          isRead:true
        })
      }
    },
  },
  computed: mapState({
    user:state => state.user,
    time:state => state.time,
    status:state => state.chats.status,
    typingStatus:state => state.chats.typingStatus,
    lastSeen(state) {
      try {
        const last = new Date( state.chats.status[this.selectedRecipient.username])
        let d  =  new Date (state.time)
        let today = (new Date (`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`)).getTime()
        let mins = last.getMinutes()
        if(mins < 10) mins = '0'+mins
        if(today-last.getTime() < 86400000){ //The length of a day
          let hour = last.getHours()
          return  hour<12? `${hour}:${mins} a.m`:`${hour-12}:${mins} p.m`
        }
        if(today-last.getTime() < 86400000*2){ //The length of a day
          let hour = last.getHours()
          let time =  hour<12? `${hour}:${mins} a.m`:`${hour-12}:${mins} p.m`
          return 'Yesterday, '+ time
        }
        return dateFormatter(last,'formal')

      } catch (e){
        console.log(e)
      }
      return
    },
    chats({chats:storeChats}) {
      let chats = storeChats.chats
      let recipient = this.selectedRecipient
      let myChats = {}
      if(recipient.username){
        myChats = filterData(chats, ['participants','array-contains',recipient.username])
      }
      let timeDivs = {}
      Object.values(myChats).forEach(chat=>{
        let chatTime = new Date (chat.time)
        let dateCat = (new Date(`${chatTime.getFullYear()}-${chatTime.getMonth()+1}-${chatTime.getDate()}`)).getTime()
        if(timeDivs[dateCat]){
          let divChats = timeDivs[dateCat].chats
          divChats.push(myChats[chat.id])
          timeDivs[dateCat].chats  = divChats
        }else {
          timeDivs[dateCat]  = {
            date:dateCat,
            chats:[myChats[chat.id]]
          }
        }
      })
      this.WriteIsRead(myChats)
      return timeDivs

    }

  }),
  mounted() {

  },
  beforeUnmount() {
    // document.getElementById('page-cont').classList.add('mt-16')
  }
}
</script>

<style scoped>
*{box-sizing:border-box}
.chats-cont{
  background: url(../assets/images/bg-offers.webp) no-repeat center/cover;
}
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
