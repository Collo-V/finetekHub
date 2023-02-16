<template>
  <div class="input-cont bg-primary-light h-16 relative w-full">
    <div class="absolute z-3 bottom-full min-h-screen-h-50  w-full flex justify-center items-center bg-slate-200"
         v-if="(imagePrev!='' || filePrev!='')&& uploadTask==''" >
      <button class="absolute top-0 left-0 h-10 w-10 focus:outline-none text-5 border-1px rounded-sm m-2"
              @click="ClearFiles()">
        <i class="fas fa-xmark"></i>
      </button>
      <iframe :src="filePrev" class=" overflow-auto custom-scroll" @scroll.stop="" v-if="filePrev!=''"></iframe>
      <img :src="imagePrev" class="max-w-80% lg:max-w-50% h-auto" v-else>
    </div>
    <div id="emoji-picker-cont" v-show="showEmoji" class="w-full h-300px mt-8 absolute bottom-full"></div>
    <div class="absolute w-full min-h-16 bg-inherit bottom-full flex items-center" v-if="replyFor!= undefined">
      <div class="w-100px invisible"></div>
      <div class="w-full h-16 rounded-sm flex overflow-hidden bg-slate-300 justify-between">
        <div class="w-2 h-full bg-primary mr-2"></div>
        <div class="w-full h-full flex justify-center flex-col">
          <div class="mb-2 text-primary-red" v-if="replyFor.sender==selectedRecipient.username">
            {{selectedRecipient.firstName}} {{selectedRecipient.lastName}}
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
    <div class="reply-msg h-16 w-full flex pt-2 justify-center items-center fixed bottom-full left-0" v-if="replyFor!=undefined">
      <!--            <div class="w-100px invisible"></div>-->
      <div class="w-full h-16 rounded-sm flex overflow-hidden bg-slate-300 justify-between">
        <div class="w-2 h-full bg-primary mr-2"></div>
        <div class="w-full h-full flex justify-center flex-col">
          <div class="mb-2 text-primary-red" v-if="replyFor.sender==selectedRecipient.username">
            {{selectedRecipient.firstName}} {{selectedRecipient.lastName}}
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

    <div class="input w-full h-fit min-h-16 flex items-center pl-4 text-gray-800">
      <button class="text-6 mr-2 focus:outline-none" id="emoji-attach"
              @click="ShowEmoji(true)" v-if="!showEmoji">
        <i class="fa-solid fa-face-smile"></i>
      </button>
      <button class="text-6 mr-2 focus:outline-none" @click="ShowEmoji(false)" v-else>
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="dropdown-cont relative mr-2 text-6 flex justify-center items-center flex-col">
        <div class="dropdown absolute hidden bottom-full left-50% h-center ml-4">
          <button class="block focus:outline-none dropdown-cont h-10 w-10 mb-3 bg-primary-purple rounded-full text-white mr-20px"
                  @click="CreateImage()">
            <i class="fa-solid fa-image"></i>
            <span class="dropdown absolute left-full ml-4 bg-slate-500 p-1 rounded-pill text-4">Photos </span>
          </button>
          <button class="block focus:outline-none  dropdown-cont h-10 w-10 bg-primary-purple text-white rounded-full mr-20px"
                  @click="CreateFile()">
            <i class="fa-regular fa-file"></i>
            <span class="dropdown absolute left-full ml-4 bg-slate-500 p-1 rounded-pill text-4"> Documents</span>
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
</template>

<script>
import {CodeGenerator, dateFormatter, TextAreaAdjust} from "@/commons";
import {getDownloadURL, getStorage, ref, uploadBytesResumable,listAll} from "firebase/storage";
import {confirmAction, Report} from "@/commons/swal";
import {doc, setDoc, updateDoc} from "firebase/firestore";
import {Picker} from "emoji-picker-element";
import {mapState} from "vuex";
import {db} from "@/firebase";
import firebase from "firebase/compat";
import {getDatabase, set, ref as realDbRef} from "firebase/database";

export default {
  name: "ChatInput",
  props:['replyFor','selectedRecipient','uploadTask'],
  data(){
    return {
      sending:false,
      input:"",
      showEmoji:false,
      inputImage:'',
      imagePrev:'',
      filePrev:'',
      inputFile:'',


    }
  },
  methods:{
    Resize(id){
      TextAreaAdjust(id)
    },
    InputFocus(){
      document.getElementById('chat-textarea').focus()
    },
    async GetFiles(chatId){
      let filesRef = ref(getStorage(), `chats/${chatId}`)
      let chatFiles = (await listAll(filesRef)).items
      let images = [],files=[]
      for (let i = 0; i < chatFiles.length; i++) {
        let path = chatFiles[i].fullPath
        let name = path.replace(`chats/${chatId}/file-`,'')
            .replace(`chats/${chatId}/IMG-`,'')
        let url = await getDownloadURL(ref(getStorage(),path))
        if(path.includes('file-')){
          files.push({
            url,name
          })
        }else {
          images.push({
            url,name
          })
        }
      }
      return [images,files]

    },
    async Send(chatId,file){
      this.showEmoji = false
      while(true){
        if (this.input.charAt(this.input.length-1) == '\n'){
          this.input = this.input.slice(0,-1)
        }else{
          break
        }
      }
      if(this.input=='' && !file){return}
      let input  = this.input
      this.ClearFiles()
      this.input = ''
      this.input.replaceAll('\n','')
      this.Resize('chat-textarea')
      let user = this.user.username
      let temp = {}
      // let time = new Date().getTime()
      let fileUrl
      let images=[],files=[]
      if(file){
        [images,files] = await this.GetFiles(chatId)
      }
      let myRecipient = this.selectedRecipient
      let myChat = {
        message:input,
        sender:this.user.username,
        files,images,
        replyFor:this.replyFor !== undefined?this.replyFor.id:null,
        recipient:myRecipient.username?myRecipient.username:myRecipient.id,
        isDelivered:myRecipient.username?false:[],
        isRead:myRecipient.username?false:[],
        time:firebase.firestore.FieldValue.serverTimestamp(),
        participants:[this.user.username,myRecipient.username],
      }
      // myChat.time =  (new Date('2023-01-11').getTime())
      try{
        await setDoc(doc(db,'chats',chatId),myChat)
      }catch(e){
        console.log(e)
        this.input = input
      }
      this.$emit('setReplyFor',undefined)


      this.ScrollToBottom
      let toScroll  = document.getElementById('chats-cont')
      try{
        toScroll.scrollTop = toScroll.scrollHeight + 1500
      }catch {}
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
      input.accept=".png,.jpg,.jpeg"
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
    CheckKey(event){
      if(event.altKey && event.code === 'Enter' && this.input!=''){
        this.input+='\n'
      }
      else if(event.code === 'Enter'){
        this.UploadFiles()
      }else{
        this.SetTyping()
      }
    },
    async UploadFiles(){
      let date = (new Date()).getTime()
      let  chatId='chat-'+CodeGenerator()+date
      let inputImage = this.inputImage
      let inputFile = this.inputFile
      if(inputFile== "" && inputImage==''){
        await this.Send(chatId)
      }else{
        let imgRef = inputImage ===""? ref(getStorage(), `chats/${chatId}/file-${inputFile.name}`):
            ref(getStorage(), `chats/${chatId}/IMG-${inputImage.name}`)
        let uploadTask = inputFile!==''?uploadBytesResumable(imgRef, inputFile)
            :uploadBytesResumable(imgRef, inputImage)
        this.$emit('SetUploadTask',uploadTask)
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
              this.$emit('SetUploadTask','')
              let file = {}
              if(inputFile!==''){
                file.name = inputFile.name
              }else{
                file.name = inputImage.name
                file.isImg = true
              }
              all.Send(chatId,file)
            }
        );

      }

    },
    ClearFiles(){
      this.imagePrev=''
      this.inputImage=''
      this.filePrev=''
      this.inputFile=''
      this.$emit('SetUploadTask','')
    },
    async SetTyping(){
      const database = getDatabase()
      const reference = realDbRef(database, 'typing-status/' + this.user.username)
      try{
        let c = await set( reference, {
          typing:true,
          recipient:this.selectedRecipient.username
        })
      }catch (e){
        console.log(e)
      }
      setTimeout(async()=>{
        try{
          let c = await set( reference, {
            typing:false,
          })
        }catch (e){
          console.log(e)
        }
      },3000)

    }
  },
  computed: mapState({
    user:state => state.user,
    time:state => state.time,
  }),
}
</script>

<style scoped>

</style>
