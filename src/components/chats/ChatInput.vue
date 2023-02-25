<template>
  <div class="z-4 input-cont bg-primary-light min-h-100px w-full pb-2 absolute bottom-0 w-full left-0">
    <div class="absolute z-3 bottom-full h-screen-h-50  w-full flex justify-center items-center bg-slate-200"
         v-if="(imagePrev!='' || filePrev!='')&& uploadTask==''" >
      <button class="absolute top-0 left-0 h-10 w-10 focus:outline-none text-5 border-1px rounded-sm m-2"
              @click="ClearFiles()">
        <i class="fas fa-xmark"></i>
      </button>
      <iframe :src="filePrev" class=" overflow-auto custom-scroll" @scroll.stop="" v-if="filePrev!=''"></iframe>
      <img :src="imagePrev" class="max-w-80% lg:max-w-50% h-auto max-h-full" v-else>
    </div>
    <div class="absolute reply-for w-full min-h-16 bg-inherit bottom-full flex items-center" v-if="replyFor!= undefined">
      <div class="w-100px invisible"></div>
      <div class="w-full h-16 rounded-sm flex overflow-hidden bg-slate-300 justify-between">
        <div class="w-2 h-full bg-primary mr-2"></div>
        <div class="w-full h-full flex justify-center flex-col">
          <div class="flex mb-2 text-primary-red gap-2">
            <span class="" v-if="replyFor.sender==recipient.username">
              {{GetName(replyFor.sender)}}
            </span>
            <span class="mb-2 text-primary-red" v-else>You</span>
            <span v-if="replyFor.isChannelChat && recipient.username"> At {{channels[replyFor.recipient].name}}</span>
          </div>
          <div class="flex items-center gap-2 max-h-50px overflow-hidden whitespace-nowrap">
            <i class="fa-solid fa-camera" v-if="replyFor.images.length>0"/>
            <QuillEditor
                v-else
                ref="chatMessage"
                class="chat-quill"
                :options="quillOptions"
                :content="GetMessage(replyFor.message)"
            />
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
      <div class="w-100px h-full flex items-center justify-center text-24px cursor-pointer"
           @click="$emit('SetReplyFor')">X</div>
    </div>
    <div class="input w-full h-fit min-h-100px flex items-center pl-4 text-gray-800">
      <TextArea
          @create-file="CreateFile"
          @create-image="CreateImage"
          @send="(content)=>UploadFiles(content)"
          @set-typing="SetTyping"
      />

    </div>
  </div>
</template>

<script>
import {CodeGenerator, TextAreaAdjust} from "@/commons";
import {getDownloadURL, getStorage, ref, uploadBytesResumable,listAll} from "firebase/storage";
import {doc, setDoc} from "firebase/firestore";
import {Picker} from "emoji-picker-element";
import {mapState} from "vuex";
import {db} from "@/firebase";
import firebase from "firebase/compat";
import {getDatabase, set, ref as realDbRef} from "firebase/database";
import TextArea from "@/components/chats/TextArea";
import {Delta,QuillEditor} from "@vueup/vue-quill";

export default {
  name: "ChatInput",
  components: {TextArea},
  props:['replyId','recipientId','uploadTask'],
  data(){
    return {
      sending:false,
      content:'',
      showEmoji:false,
      inputImage:'',
      imagePrev:'',
      filePrev:'',
      inputFile:'',
      timeOut:'',
      quillOptions:{
        modules:{
          toolbar:false,
        },
        readOnly:true
      }
    }
  },
  methods:{
    GetMessage(message){
      if(typeof (message) === 'string') return  message
      let delta = new Delta(message)
      return delta
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
      if(this.content=='' && !file){return}
      let input  = this.content
      this.ClearFiles()
      this.content = ''
      this.content.replaceAll('\n','')
      let user = this.user.username
      let temp = {}
      // let time = new Date().getTime()
      let fileUrl
      let images=[],files=[]
      if(file){
        [images,files] = await this.GetFiles(chatId)
      }
      let myChat = {
        message:input,
        sender:this.user.username,
        files,images,
        replyFor:this.replyFor !== undefined?this.replyFor.id:null,
        recipient:this.recipientId,
        isDelivered:this.recipient.username?false:[],
        isRead:this.recipient.username?false:[],
        isDeleted:false,
        time:firebase.firestore.FieldValue.serverTimestamp(),
        isChannelChat:this.recipient.username?false:true
      }
      // myChat.time =  (new Date('2023-01-11').getTime())
      try{
        await setDoc(doc(db,'chats',chatId),myChat)
      }catch(e){
        console.log(e)
        this.content = input
      }
      this.$emit('setReplyFor',undefined)


      this.ScrollToBottom
      let toScroll  = document.getElementById('chats-cont')
      try{
        toScroll.scrollTop = toScroll.scrollHeight + 1500
      }catch {}
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
    CreateImage:function (){
      let input=document.createElement("input");
      input.type="file";
      input.accept=".png,.jpg,.jpeg,.jfif"
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
      if(event.altKey && event.code === 'Enter' && this.content!=''){
        this.content+='\n'
      }
      else if(event.code === 'Enter'){
        this.UploadFiles()
      }
    },
    async UploadFiles(content){
      this.content = content
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
      clearTimeout(this.timeOut)
      const database = getDatabase()
      const reference = realDbRef(database, 'typing-status/' + this.user.username)
      try{
        let c = await set( reference, {
          typing:true,
          recipient:this.recipientId
        })
      }catch (e){
        console.log(e)
      }
      this.timeOut = setTimeout(async()=>{
        try{
          let c = await set( reference, {
            typing:false,
          })
        }catch (e){
          console.log(e)
        }
      },3000)

    },
    GetName(username){
      return !this.team[username]?'':`${this.team[username].firstName} ${this.team[username].lastName}`
    },
  },
  watch:{
    replyFor(val){
      console.log(val)
    }
  },
  computed: mapState({
    user:state => state.user,
    time:state => state.time,
    team:state => state.team,
    channels:state => state.channels,
    replyFor({chats:{chats}}) {
      return chats[this.replyId]
    },
    recipient(state){
      let colleague = state.team[this.recipientId]
      return colleague?colleague:state.channels[this.recipientId]
    },
    mentionList(){
      return Object.values(this.team).map(member=>({
        username:member.username,
        name:`${member.firstName} ${member.lastName}`
      }))
    }
  }),

}
</script>

<style scoped>

</style>
