<template>
    <div class="w-full h-full chat-section relative">
      <div class="h-full flex flex-col" >
        <div>
          <div class="header h-16 bg-white lg:bg-slate-300 p-2 flex shadow-md lg:shadow-0" v-if="colleague">
            <button class="focus:outline-none text-18px mx-5 lg:hidden" @click="$emit('SetSelected',undefined)">
              <i class="fas fa-long-arrow-left"></i>
            </button>
            <img :src="colleague.image" class="w-12 h-12 rounded-full" v-if="colleague.image">
            <div v-else class="w-10 h-10 rounded-full border-1px lg:border-white flex items-center justify-center font-bold text-6">
              {{colleague.firstName[0]}}
            </div>
            <div class="flex flex-col ml-3">
              <div class="mb-2">{{colleague.firstName}} {{colleague.lastName}}</div>
              <div v-if="typingStatus[colleague.username]">
                <span class="text-primary">Typing...</span>
              </div>
              <div class="" v-else>
                <span v-if=" time- status[colleague.username] < 4000 " class="text-primary">Online</span>
                <span v-else >Last seen: {{lastSeen}}</span>
              </div>
            </div>
          </div>
          <ChannelHeader v-else :channel-id="channel.id"  @set-selected="$emit('SetSelected',undefined)"/>
        </div>
        <div class="chats-cont bg-primary h-full overflow-auto custom-scroll px-3 relative pb-100px"
             @scroll="SeeScroll($event)"
        >
          <div class="block w-full h-10 bg-orange-100 flex items-center justify-center shadow mb-5 mt-10 xl:mt-16 2xl:mt-24">
            The messages are end-to-end encrypted
          </div>
          <div v-for="div in chats" class="mt-10 chat-div" :id="'chat-div-'+div.date">
            <div class="h-0 border-b-1px flex items-center justify-center">
              <div class="w-200px h-8 bg-white rounded-pill flex items-center chat-div-display vue-shadow-md
               justify-center top-16 lg:top-32 z-4 bg-gray-400"
                   :id="'chat-div-display-'+div.date"
              >
                {{GetDate(div.date)}}
              </div>
            </div>
            <div class="mb-3 w-full focus:bg-red-500 mt-5" v-for="chat in div.chats" :id="chat.id+'-div'">
              <div v-if="chat.isNotif" class="pt-4">
                <NotificationBar :notification-id="chat.id" :channel-id="channel.id"/>
              </div>
              <div v-else>
                <div class="w-full pl-3 flex flex-col items-end"
                     v-if="chat.sender ===user.username">
                  <ChatBubble
                      :chat="chat"
                      @set-reply-for="replyId = chat"
                      @go-to-chat="(chatId)=>GoToChat(chatId)"
                  />
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
                <div class="w-full pl-3" v-else >
                  <ChatBubble
                      :chat="chat"
                      @set-reply-for="replyId = chat"
                      @go-to-chat="(chatId)=>GoToChat(chatId)"
                      @reply-privately="ReplyPrivately(chat)"
                  />
                  <div class="text-3 mt-1">{{GetTime(chat.time)}}</div>
                </div>
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
                   :reply-id="replyId"
                   :recipient-id="selectedId"
                   @set-reply-for="[replyId = undefined,$emit('RemovePrivateReply')]"
        />
      </div>
    </div>

</template>


<script>
import 'emoji-picker-element'
import {Picker} from "emoji-picker-element";
import {doc,updateDoc,} from 'firebase/firestore'
import {dateFormatter} from "@/commons";
import {mapState} from 'vuex'
import TeamCont from "@/components/chats/TeamCont";
import {filterData, removeFromArray} from "@/commons/objects";
import ChatInput from "@/components/chats/ChatInput";
import {db} from "@/firebase";
import ChannelHeader from "@/components/channels/ChannelHeader";
import {sortData} from "@/commons/objects-arrays";
import ChatBubble from "@/components/chats/ChatBubble";
import TextArea from "@/components/chats/TextArea";
import Membercard from "@/components/MemberCard";
import NotificationBar from "@/components/chats/NotificationBar";

export default {
  name: "MainChat",
  props:['selectedId','privateReply'],
  emits:['ReplyPrivately','RemovePrivateReply','SetSelected'],
  data(){
    return {
      chatIds:{},
      sending:false,
      replyId:undefined,
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
    NotificationBar,
    Membercard,
    TextArea,
    ChatBubble,
    ChannelHeader,
    ChatInput,
    TeamCont,
    Picker
  },
  methods:{
    GoToChat(chatId){
      if(this.chats[chatId]){
        let div = document.getElementById(chatId+'-div')
        div.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        div.classList.add('bg-primary-purple/20')
        setTimeout(()=>div.classList.remove('bg-primary-purple/20'),400)
      } else {
        let chat  = this.$store.state.chats.chats[chatId]
        if(chat && chat.isChannelChat){
          this.$emit('SetSelected',chat.recipient)
        }
      }
    },
    ReplyPrivately({id,sender}){
      this.$emit('ReplyPrivately',{id,sender})
      this.replyId = [id]
    },
    DateFormat(date,prev){
      return dateFormatter(date)

    },
    SetUploadTask(task){
      this.uploadTask = task
    },
    SetReplyFor(task){
      this.replyId = task
    },
    GetTime(time){
      time = new Date(time)
      let hour = time.getHours()
      let mins = time.getMinutes()
      if(mins<10) mins = '0'+mins
      return  hour<=12? `${hour}:${mins} a.m`:`${hour-12}:${mins} p.m`
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
        let minTop = screen.width <961?100:150
        if(rect.top<minTop && rect.bottom>20){
          let onView = divs[i]
          let display = document.getElementById(onView.id.replace('chat-div','chat-div-display'))
          // console.log(display)
          display.classList.add('fixed','mt-2')
        }
      }
    },
    SearchChat(id){
      try{
        let user = this.colleague.username
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
    WriteIsRead(chats){
      chats = Object.values(chats).filter(a=>a.sender!==this.user.username && a.isRead !== true)
      for (let i = 0; i < chats.length; i++) {
        let chat = chats[i]
        if(chat.isChannelChat && !chat.isRead.includes(this.user.username)){
          updateDoc(doc(db,'chats',chat.id),{
            isRead:[...chat.isRead,this.user.username]
          }).catch()
        }else if(!chat.isChannelChat && !chat.isRead){
            updateDoc(doc(db,'chats',chat.id),{
              isRead:true
            }).catch()

        }
      }
    },
  },
  computed: mapState({
    team:state => state.team,
    colleague(state){
      return state.team[this.selectedId]
    },
    channel(state){
      return state.channels[this.selectedId]
    },
    user:state => state.user,
    time:state => state.time,
    status:state => state.chats.status,
    typingStatus:state => state.chats.typingStatus,
    lastSeen(state) {
      try {
        const last = new Date( state.chats.status[this.colleague.username])
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
      let myChats = {}
      if(this.colleague){
        let recipient = this.colleague
          myChats = filterData({
            ...filterData(chats, ['recipient', '==', recipient.username]),
            ...filterData(chats, ['sender', '==', recipient.username])
          },['isChannelChat','!=',true])
      }else if(this.channel){
        myChats = filterData(chats, ['recipient','==',this.channel.id])
        let channelNotifs = filterData(
            storeChats.notifications,
            ['entity','==',this.channel.id]
        )
        myChats = {...myChats,...channelNotifs}
        let my = this.channel.members.filter(member=>member.username === this.user.username)[0]
        if(my.dateLeft){
          if(!my.dateRejoined){
            myChats = filterData(myChats,['time','<=',my.dateLeft])
          }
        }
      }else {
        this.$emit('SetSelected',undefined)
      }
      myChats = sortData(myChats,'time')
      // console.log(myChats)
      let timeDivs = {}
      Object.values(myChats).forEach(chat=>{
        let chatTime = new Date (chat.time)
        let dateCat = (new Date(`${chatTime.getFullYear()}-${chatTime.getMonth()+1}-${chatTime.getDate()}`)).getTime()
        if(timeDivs[dateCat]){
          let divChats = timeDivs[dateCat].chats
          divChats.push(chat)
          timeDivs[dateCat].chats  = divChats
        }else {
          timeDivs[dateCat]  = {
            date:dateCat,
            chats:[chat]
          }
        }
      })
      this.WriteIsRead(myChats)
      return timeDivs

    }
  }),
  mounted() {
  }
}
</script>

<style scoped>
.chats-cont{
  background: url(../assets/images/bg-offers.webp) no-repeat center/cover;
}
</style>
