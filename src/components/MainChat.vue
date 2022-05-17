<template>
  <div class="w-full flex flex-col h-full" style="flex-shrink: 0">
    <div class="absolute top-0 z-1 h-screen-h w-full flex left-0 relative" id="chats-prev-cont">
      <div class="ml-200px fixed left-0 p-2 w-250px shadow h-full top-0 mt-16 z-0">
        <div v-for="member in myTeam">
          <div class="h-18 flex border-b-1px cursor-pointer"
               v-if="member.email!==$store.getters.GetUser.email" @click="[selectedChat = member]">
            <div class="h-full min-w-12 flex items-center">
              <img :src="member.image" class="w-12 h-12 rounded-full">
            </div>
            <div class="h-full flex justify-between w-full">
              <div class="ml-3 h-full flex flex-col justify-center">
                <div class="mb-2 flex items-center">
                  <span class="text-16px mr-2 whitespace-nowrap">{{member.firstName}} {{member.lastName}}</span>
                  <span v-if="chats[member.username]" class="whitespace-nowrap text-3 w-fit">
                    {{DateFormat(chats[member.username][chats[member.username].length-1].time,true)}}
                  </span>
                </div>
                <div class="w-full min-w-0 flex">
                  <div class="text-ellipsis max-w-150px mr-2 inline-block" v-if="chats[member.username]">
                    <span v-if="chats[member.username][chats[member.username].length-1].image!=''">
                      <span class="mr-2"><i class="fa-solid fa-camera"></i></span>
                      <span v-if="chats[member.username][chats[member.username].length-1].message==''">Photo</span>
                    </span>
                    {{chats[member.username][chats[member.username].length-1].message}}
                  </div>
                  <div class="h-5 w-5 flex justify-center items-center bg-primary rounded-md float-right mb-2 text-3"
                       v-if="chats[member.username] && CountIsRead(chats[member.username])>0">
                    {{CountIsRead(chats[member.username])}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex items-center justify-center ml-250px h-full">
        <div v-if="selectedChat==''">
          CLick on an account and start chatting
        </div>
        <div v-else class="h-full w-full relative">
          <div class="hidden fixed top-0 w-full shadow-md mt-16 h-16 flex items-center pl-2 z-1 bg-grey-lighter">
            <img :src="selectedChat.image" alt="" class="h-12 w-12 rounded-full">
            <div class="flex flex-col ml-3">
              <div class="mb-2">{{selectedChat.firstName}} {{selectedChat.lastName}}</div>
              <div class="" v-if="selectedChat.isOnline">Online</div>
              <div class="" v-else>Last seen: {{selectedChat.lastSeen}}</div>
            </div>
          </div>
          <div class="chat-section h-full items-center relative p-2 pb-0 z-0">
            <div class="lg:w-full mx-auto h-full" id="chats-cont">
              <div class="relative w-full pt-48 pb-32  custom-scroll overflow-y-scroll h-full">
                <div class="block w-full h-10 bg-orange-lightest flex items-center justify-center shadow mb-5">
                  The messages are end-to-end encrypted
                </div>
                <div class="mb-3 w-full focus:bg-red" v-for="chat in chats[selectedChat.username]" :id="'chat-'+chat.id">
                  <div class="w-full pl-3"
                       v-if="chat.sender==selectedChat.username" >
                    <div class="bg-primary text-white shadow min-h-10 flex justify-center w-fit p-4 flex-col
                  chat-bubble chat-bubble-left rounded-b-md rounded-tr-md dropdown-cont relative">
                      <div class="triangle-left absolute right-full top-0"></div>
                      <div v-if="chat.replyFor">
                        <a :href="'#chat-'+chat.replyFor" class="block w-fit min-w-full h-16 rounded-sm
                       flex overflow-hidden bg-grey-dark pr-1px justify-between">
                          <div class="w-2 h-full bg-primary mr-2"></div>
                          <div class="w-full h-full flex justify-center flex-col">
                            <div class="mb-2 text-primary-red"
                                 v-if="SearchChat(chat.replyFor).sender==selectedChat.username">
                              {{selectedChat.firstName}} {{selectedChat.lastName}}
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
                      <div v-if="chat.image!=''" class="relative dropdown-cont">
                        <div class="dropdown absolute top-0 mt-3 right-0 mr-2
                      animate__animated animate__fadeOutUps animate__fadeInDown">
                          <button class="px-2 py-1 w-16 focus:outline-none border-1px rounded-md text-black bg-white"
                                  @click="DownloadImage(chat.image.link)">
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                          </button>
                        </div>
                        <img :src="chat.image.link" alt="" class="max-w-300px h-auto">
                        <div class="absolute w-full h-10 btm-0 left-0 flex items-center bg-blue-light bg-grey-light">
                          {{chat.image.name}}
                        </div>
                      </div>
                      <div v-if="chat.file!=''" class="relative dropdown-cont">
                        <div class="dropdown absolute top-0 mt-3 right-0 mr-2
                      animate__animated animate__fadeOutUps animate__fadeInDown">
                          <button class="px-2 py-1 w-16 focus:outline-none border-1px rounded-md text-black bg-white"
                                  @click="DownloadImage(chat.file.link)">
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                          </button>
                        </div>
                        <iframe :src="chat.file.link" alt="" class="max-w-300px h-auto"></iframe>
                        <div class="absolute w-full h-10 btm-0 left-0 flex items-center bg-grey-light bg-blue-light">
                          {{chat.file.name}}
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
                          <button class="w-full focus:outline-none hover:bg-grey-light h-8"
                                  @click.prevent="[replyFor = chat]">
                             <span class="w-full pl-8 block text-left">
                               <i class="fa-solid fa-reply"></i> Reply
                             </span>
                          </button>
                          <button class="w-full focus:outline-none hover:bg-grey-light h-8" @click='DeleteMsg(chat.id)'>
                           <span class="w-full pl-8 block text-left">
                            <i class="fa-solid fa-trash"></i> Delete
                           </span>
                          </button>

                        </div>
                      </div>
                    </div>
                    <div class="text-3 mt-1">{{DateFormat(chat.time)}}</div>
                  </div>
                  <div class="w-full pl-3 flex flex-col items-end"
                       v-else-if="chat.sender!=selectedChat.username">
                    <div class="bg-white self-end shadow min-h-10 flex justify-center w-fit p-4 flex-col
                  chat-bubble chat-bubble-right rounded-b-md rounded-tl-md dropdown-cont relative mr-2">
                      <div class="triangle-right absolute left-full top-0"></div>
                      <div v-if="chat.replyFor">
                        <a :href="'#chat-'+chat.replyFor" class="block w-fit min-w-full h-16 rounded-sm
                       flex overflow-hidden bg-grey-dark pr-1px justify-between">
                          <div class="w-2 h-full bg-primary mr-2"></div>
                          <div class="w-full h-full flex justify-center flex-col">
                            <div class="mb-2 text-primary-red"
                                 v-if="SearchChat(chat.replyFor).sender==selectedChat.username">
                              {{selectedChat.firstName}} {{selectedChat.lastName}}
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
                      <div v-if="chat.image!=''" class="relative dropdown-cont">
                        <div class="dropdown absolute top-0 mt-3 right-0 mr-2
                      animate__animated  animate__fadeInDown">
                          <button class="px-2 py-1 w-16 focus:outline-none border-1px rounded-md text-black bg-white"
                                  @click="DownloadImage(chat.image.link)">
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                          </button>
                        </div>
                        <img :src="chat.image.link" class="max-w-300px h-auto">
                        <div class="absolute w-full h-10 btm-0 left-0 flex items-center bg-grey-light bg-grey-light">
                          {{chat.image.name}}
                        </div>
                      </div>
                      <div v-if="chat.file!=''" class="relative dropdown-cont">
                        <div class="dropdown absolute top-0 mt-3 right-0 mr-2
                      animate__animated  animate__fadeInDown">
                          <button class="px-2 py-1 w-16 focus:outline-none border-1px rounded-md text-black bg-white"
                                  @click="DownloadImage(chat.file.link)">
                            <i class="fa-solid fa-cloud-arrow-down"></i>
                          </button>
                        </div>
                        <iframe :src="chat.file.link" class="max-w-300px h-auto"></iframe>
                        <div class="absolute w-full h-10 btm-0 left-0 flex items-center bg-grey-light bg-grey-light">
                          {{chat.file.name}}
                        </div>
                      </div>
                      <span v-html="CheckLink(chat.message)"></span>
                      <div class="dropdown absolute right-0 top-0 mr-1 dropdown-cont">
                        <button class="focus:outline-none" @mouseover="DisplayModify('modify-chat'+chat.id)">
                          <i class="fa-solid fa-angle-down"></i>
                        </button>
                        <div class="dropdown modify-chat absolute right-0 w-150px h-18 py-1 bg-white shadow-md mt-1px top-full z-1"
                             :id="'modify-chat'+chat.id" @blur="InputFocus()">
                          <button class="w-full focus:outline-none hover:bg-grey-light h-8"
                                  @click.prevent="[replyFor = chat,ReplyMsg()]">
                             <span class="w-full pl-8 block text-left">
                               <i class="fa-solid fa-reply"></i> Reply
                             </span>
                          </button>
                          <button class="w-full focus:outline-none hover:bg-grey-light h-8" @click='DeleteMsg(chat.id)'>
                           <span class="w-full pl-8 block text-left">
                            <i class="fa-solid fa-trash"></i> Delete
                           </span>
                          </button>

                        </div>
                      </div>
                    </div>
                    <div class="text-3 mt-1 flex">
                      {{DateFormat(chat.time)}}
                      <div class="flex justify-end text-8px ml-1">
                        <span class="text-grey" v-if="!chat.isRead"><i class="fa-solid fa-check"></i></span>
                        <span class="text-primary relative" v-else>
                        <span><i class="fa-solid fa-check"></i></span>
                        <span class="absolute right-0 mr-1"><i class="fa-solid fa-check"></i></span>
                      </span>
                      </div></div>
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
                      <div class="h-full bg-blue w-0" id="prog-bar"></div>
                    </div>
                    <iframe :src="filePrev" class=" overflow-auto custom-scroll" @scroll.stop="" v-if="filePrev!=''"></iframe>
                    <img :src="imagePrev" class=" overflow-auto custom-scroll" @scroll.stop="" v-else>
                  </div>
                </div>

              </div>
              <div class="hidden bg-red w-full h-150px"></div>
            </div>
            <div class="absolute btm-0 left-0 bg-grey-lighter w-full input-prev-cont z-2 mb-16" >
              <div class="absolute z-3 btm-full min-h-screen-h-50  w-full flex justify-center items-center relative"
                   v-if="(imagePrev!='' || filePrev!='')&& uploadTask==''" >
                <button class="absolute top-0 left-0 h-10 w-10 focus:outline-none text-5 border-1px rounded-sm m-2"
                        @click="ClearFiles()">
                  <i class="fas fa-xmark"></i>
                </button>
                <iframe :src="filePrev" class=" overflow-auto custom-scroll" @scroll.stop="" v-if="filePrev!=''"></iframe>
                <img :src="imagePrev" class="max-w-50% h-auto" v-else>
              </div>
              <div id="emoji-picker-cont" v-show="showEmoji"
                   class="w-full h-300px mt-8"></div>
              <div class="reply-msg min-h-16 w-full flex pt-2 justify-center items-center" v-if="replyFor!=''">
                <div class="w-100px invisible"></div>
                <div class="w-full h-16 rounded-sm flex overflow-hidden bg-grey-dark justify-between">
                  <div class="w-2 h-full bg-primary mr-2"></div>
                  <div class="w-full h-full flex justify-center flex-col">
                    <div class="mb-2 text-primary-red" v-if="replyFor.sender==selectedChat.username">
                      {{selectedChat.firstName}} {{selectedChat.lastName}}
                    </div>
                    <div class="mb-2 text-primary-red" v-else>You</div>
                    <span class="mr-2" v-if="replyFor.image!=''"><i class="fa-solid fa-camera"></i></span>
                    <div>{{replyFor.message}}</div>
                  </div>
                  <div class="h-full" v-if="replyFor.image!=''">
                    <img :src="replyFor.image.link" class="h-full w-auto">
                  </div>
                </div>
                <div class="w-100px h-full flex items-center justify-center text-24px cursor-pointer"
                     @click="replyFor = ''">X</div>
              </div>

              <div class="input w-full h-fit min-h-16 flex items-center pl-4 ">
                <button class="text-6 mr-2 focus:outline-none" id="emoji-attach"
                        @click="ShowEmoji(true)" v-if="!showEmoji">
                  <i class="fa-solid fa-face-smile"></i>
                </button>
                <button class="text-6 mr-2 focus:outline-none" @click="ShowEmoji(false)" v-else>
                  <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="dropdown-cont relative mr-2 text-6 flex justify-center items-center flex-col">
                  <div class="dropdown absolute hidden btm-full mb-1px left-1/2 pb-2 w-10 -ml-20px">
                    <button class="block focus:outline-none dropdown-cont h-10 w-10 mb-3 bg-primary-purple rounded-full text-white mr-20px"
                            @click="CreateImage()">
                      <i class="fa-solid fa-image"></i>
                      <span class="dropdown absolute left-full ml-4 bg-grey-darkest p-1 rounded-pill text-4">Photos </span>
                    </button>
                    <button class="block focus:outline-none  dropdown-cont h-10 w-10 bg-primary-purple text-white rounded-full mr-20px"
                            @click="CreateFile()">
                      <i class="fa-regular fa-file"></i>
                      <span class="dropdown absolute left-full ml-4 bg-grey-darkest p-1 rounded-pill text-4"> Documents</span>
                    </button>
                  </div>
                  <button class="focus:outline-none">
                    <i class="fa-solid fa-paperclip"></i>
                  </button>
                </div>
                <div class="w-full min-h-10 mr-2">
               <textarea class="rounded-md w-full block focus:outline-none flex h-10
               items-center justify-center py-1 overflow-hidden max-h-16" @keyup="Resize('chat-textarea')"
                         id="chat-textarea" @keydown="CheckKey($event)"
                         v-model="input"></textarea>
                </div>
                <div class="min-w-100px">
                  <button class="text-8 mr-2 focus:outline-none" @click="UploadFiles()">
                    <i class="fa-regular fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    {{GetChats,WriteTeam(),GetUser(),ReadMsg,ScrollToBottom}}
  </div>
</template>

<script>
import 'emoji-picker-element'
import {Picker} from "emoji-picker-element";
import {chats, team,db} from "@/firebase";
import {getDoc, onSnapshot, setDoc, doc, query, where, getDocs, deleteDoc, updateDoc, addDoc} from 'firebase/firestore'
import {TextAreaAdjust, RemoveFromArray, ReverseArray, isEmail, CodeGenerator} from "@/commons";
import {Alert, Report} from "@/commons/swal";
import {getDownloadURL, getStorage, ref, uploadBytes,uploadBytesResumable} from "firebase/storage";

export default {
  name: "Chats",
  data(){
    return {
      myTeam:"",
      selectedChat:'',
      chats:{},
      chatIds:{},
      sending:false,
      input:"",
      user:'',
      modifyId:'',
      replyFor:'',
      showEmoji:false,
      inputImage:'',
      imagePrev:'',
      filePrev:'',
      inputFile:'',
      uploadTask:''


    }

  },
  components:{
    Picker
  },
  methods:{
    WriteTeam(){
      this.myTeam = this.$store.getters.GetTeam
    },
    GetUser(){
      this.user = this.$store.getters.GetUser
    },
    Resize(id){
      TextAreaAdjust(id)
    },
    InputFocus(){
      document.getElementById('chat-textarea').focus()
    },
    async Send(chatId,docId,file){
      this.showEmoji = false
      while(true){
        if (this.input.charAt(this.input.length-1) == '\n'){
          this.input = this.input.slice(0,-1)
        }else{
          break
        }
      }
      if(this.input=='' && !file){return}
      console.log('passed',this.input)
      let input  = this.input
      this.ClearFiles()
      this.input = ''
      this.input.replaceAll('\n','')
      this.Resize('chat-textarea')
      let user = this.selectedChat.username
      let id = this.$store.state.chatIds[user]
      let temp = {}
      // let time = new Date().getTime()
      let fileUrl
      if(file){
        try{
          let fileRef = ref(getStorage(), `chats/${docId}/${chatId}`)
          // await uploadBytes(imgRef, inputImage)
          fileUrl = await getDownloadURL(fileRef)
        }catch{
          Report({
            position:'top-center',
            title:'Image could not be saved',
            icon:'error'
          })
        }
      }
      temp[chatId] = {
        message:input,
        sender:this.user.username,
        isRead:false,
        file:'',
        image:''
      }
      if(file){
        if(file.isImg){
          temp[chatId].image = {
            name: file.name,
            link:fileUrl
          }
        }else{
          temp[chatId].file = {
            name: file.name,
            link:fileUrl
          }
        }
      }
      if(this.replyFor!=''){
        temp[chatId]['replyFor'] = this.replyFor.id
      }
      temp[chatId].time = new Date().getTime()
      this.replyFor = ''

      if(this.chats[user]){
        let userChats = this.chats[user]
        userChats.forEach(chat => {
          let chatId = chat.id
          delete chat.id
          temp[chatId] = chat
        })
        try{
          await updateDoc((doc(db, 'chats', docId)), {
            chats: temp
          })
        }catch (e) {
          console.log(e)
          this.input = input
        }
      }else{
        let chat = {
          chats:temp,
          participants:[this.user.username,this.selectedChat.username]
        }
        try{
          await setDoc(doc(db,'chats',docId),chat)
        }catch(e){
          console.log(e)
          this.input = input
        }
      }
      this.ScrollToBottom
      let toScroll  = document.getElementById('chats-cont')
      try{
        toScroll.scrollTop = toScroll.scrollHeight + 1500
      }catch {}
      this.InputFocus()
    },
    CountIsRead(chats){
      let count = 0
      for (let i = 0; i < chats.length; i++) {
        if(chats[i].isRead == false && chats[i].sender!==this.$store.getters.GetUser.username){
          count++
        }
      }
      return count
    },
    DateFormat(date,prev){
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      date = parseInt(date)
      let today = new Date()
      let d = new Date(date)
      let isToday = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`
      ==`${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`?true:false
      let time = d.getHours()>=12?'pm':'am'
      let hours = d.getHours()>12?d.getHours()-12:d.getHours()==0?12:d.getHours()
      let mins = d.getMinutes()<10?`0${d.getMinutes()}`:d.getMinutes()
      if(!prev){
        return isToday ? `${hours}:${mins} ${time}` :
            `${months[d.getMonth()]} ${d.getDate()}, ${hours}:${mins} ${time}`
      }else{
        return isToday ? `${hours}:${mins} ${time}` :
            `${months[d.getMonth()]} ${d.getDate()}`
      }


    },
    async DeleteMsg(deleteId){
      if(!await Alert()){return}
      let user = this.selectedChat.username
      let id = this.$store.state.chatIds[user]
      let temp = {}
      let userChats = this.chats[user]
      if (!userChats){return}
      userChats.forEach(chat => {
        chat = JSON.parse(JSON.stringify(chat))
        let chatId = chat.id
        delete chat.id
        if(deleteId==chatId){
          chat.isDeleted = true
        }
        temp[chatId] = chat
      })
      try{
        await updateDoc((doc(db, 'chats', id)), {
          chats: temp
        })
      }catch (e) {
        console.log(e)
      }
      this.InputFocus()
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
        let user = this.selectedChat.username
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
    CreateImage:function (){
      let input=document.createElement("input");
      input.type="file";
      input.accept=".png,.jpg"
      let files=[]
      let all  = this
      input.onchange = e=>{
        files=e.target.files;
        let reader=new FileReader();
        reader.onload=function(){
          all.imagePrev = reader.result
        }
        reader.readAsDataURL(files[0]);
        this.inputImage = files[0]
      }
      input.click()
    },
    CreateFile:function (){
      let input=document.createElement("input");
      input.type="file";
      let files=[]
      let all  = this
      input.onchange = e=>{
        files=e.target.files;
        let reader=new FileReader();
        reader.onload=function(){
          all.docPrev = reader.result
        }
        reader.readAsDataURL(files[0]);
        // this.inputImage = files[0]
        all.inputFile = files[0]
      }

      input.click()
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
      let msg = ``
      if (message.startsWith('\n')){
        message = message.replace('\n','')
      }
      let lines = message.split('\n')
      let lineCount = 0
      while (lineCount<lines.length){
        let line  = lines[lineCount]
        let words = line.split(' ')
        let count = 0
        while ( count<words.length){
          let word  = words[count]
          let linkIndex = word.indexOf('http')
          if (linkIndex>-1){
            msg+=word.slice(0,linkIndex)
            let head = word.slice(linkIndex,linkIndex+8)
            word = word.slice(linkIndex+8)
            let href= ''
            for (let i = 0; i < word.length; i++) {
              let letter = word[i]
              if(letter.match(/[a-z]/i) || !isNaN(letter) || letter=='/' || letter=='.'){
                href += letter
              }
              else if (letter==':'){
                href+=letter
                word = word.replace(href,'')
                href += parseInt(word)
                break
              }else{
                break
              }
            }
            msg+=`<a href ='${head}${href}' class="underline link-text" target="_blank">${head}${href}</a>`
          }
          else if(isEmail(word)){
            msg+=`<a href ='mailto:${word}' class="underline link-text" target="_blank">${word}</a>`
          }
          else if(word.startsWith('+')){
            let tel = parseInt(word.slice(1))
            if(tel.toString().length>10 && tel.toString().length<13){
              msg+=`<a href ='tel:+${tel}' class="underline link-text">+${tel}</a>`
            }
            msg+=word.replace(`+${tel}`,'')
          }
          else{
            msg+=word
          }
          msg+=' '
          count++
        }
        msg+='<br>'
        lineCount++
      }
      return msg
    },
    CheckKey(event){
      if(event.altKey && event.code === 'Enter' && this.input!=''){
        this.input+='\n'
      }
      else if(event.code === 'Enter'){
        this.UploadFiles()
      }
    },
    async UploadFiles(){
      let chatId = new Date().getTime()
      let inputImage = this.inputImage
      let inputFile = this.inputFile
      let user = this.selectedChat.username
      let id = this.$store.state.chatIds[user]
      let docId=id?id:'chat-'+CodeGenerator()+new Date().getTime()
      if(inputFile== "" && inputImage==''){
        await this.Send(chatId,docId)
      }else{
        let imgRef = ref(getStorage(), `chats/${id}/${chatId}`)
        let uploadTask = inputFile!==''?uploadBytesResumable(imgRef, inputFile)
            :uploadBytesResumable(imgRef, inputImage)
        this.uploadTask = uploadTask
        let all = this
        const progBar = document.getElementById('prog-bar')
        let interval
        function addWidth(width){
          progBar.style.width = `${Math.round(width)}%`
          return width
        }
        function manageInterval(stop,progress){
          let width = progress
          clearInterval(interval)
          if (stop || width>=100){return}
          interval= setInterval(()=>{
            width = addWidth(width)+1
            if (width>progress+20){
              clearInterval(interval)
            }
          },200)
        }
        uploadTask.on('state_changed',
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              // progBar.classList.replace('w-0','w-full')
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              progBar.style.minWidth = `${Math.round(progress)}%`
              let width = progress

              if (snapshot.state==='running'){
                manageInterval(false,width)
              }else {
                manageInterval(true)
              }
              // switch (snapshot.state) {
              //   case 'paused':
              //     break;
              //   case 'running':
              //     break;
              // }
            },
            (error) => {
              console.log(error)
            },
            () => {
              manageInterval(true)
              progBar.style.minWidth = '0'
              progBar.style.width = `0%`
              all.uploadTask = ''
              let file = {}
              if(inputFile!==''){
                file.name = inputFile.name
              }else{
                file.name = inputImage.name
                file.isImg = true
              }
              all.Send(chatId,docId,file)
            }
        );

      }

    },
    ClearFiles(){
      this.imagePrev=''
      this.inputImage=''
      this.filePrev=''
      this.inputFile=''
      this.uploadTask = ''
    }
  },
  computed:{
    GetChats(){
      this.chats = this.$store.getters.GetChats
      try{
        let toScroll = document.getElementById('chats-cont')
        toScroll.scrollTop = toScroll.scrollHeight
      }catch {}
    },
    async ReadMsg(){
      let unread = false
      if (this.selectedChat==''){
        return
      }
      let user = this.selectedChat.username
      let id = this.$store.state.chatIds[user]
      let temp = {}
      let userChats = this.chats[user]
      if (!userChats){return}
      userChats.forEach(chat => {
        chat = JSON.parse(JSON.stringify(chat))
        let chatId = chat.id
        delete chat.id
        if(chat.sender==user && chat.isRead==false){
          chat.isRead = true
          unread = true
        }
        temp[chatId] = chat
      })
      if(unread ==false){
        return
      }
      try{
        await updateDoc((doc(db, 'chats', id)), {
          chats: temp
        })
      }catch (e) {
        console.log(e)
      }
    },
    ScrollToBottom(){
      let toScroll  = document.getElementById('chats-cont')
      try{
        toScroll.scrollTop = toScroll.scrollHeight + 1500
      }catch {}
    },
  },
  mounted() {
    // document.getElementById('page-cont').classList.remove('mt-16')
    // document.querySelector('emoji-picker')



  },
  beforeUnmount() {
    // document.getElementById('page-cont').classList.add('mt-16')
  }
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
.chat-section{
  background: url(../assets/images/bg-offers.webp) no-repeat center/cover;
}
.chat-bubble-right .link-text{color: #00afee;display: none}

emoji-picker,.picker{width: 100%}

/* width */
.custom-scroll::-webkit-scrollbar {
  width: 5px;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 10px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #98CB00;
}

</style>