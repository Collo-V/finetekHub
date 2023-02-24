<template>
  <AddChannels v-if="showAddChannel" @hide-modal="showAddChannel = false"/>
  <div class="absolute lg:relative top-0 bottom-0 z-3
  team-cont w-full lg:min-w-250px lg:w-250px shadow-md bg-white overflow-x-hidden overflow-y-auto custom-scroll" id="team-cont">
    <div class="absolute bottom-full h-16 bg-white w-full"></div>
    <div class="channels mt-2 border-b-2px border-primary-purple">
      <h1 class="text-center text-primary-purple font-bold">Channels</h1>
      <div class="mt-2">
        <div v-for="channel in channels" @click="$emit('SelectChat',channel.id)">
          <div  className="h-18 flex border-b-1px cursor-pointer pl-1">
            <div className="h-full min-w-12 flex items-center relative">
              <img :src="channel.image" class="w-10 h-10 rounded-full" v-if="channel.image">
              <div v-else class="w-10 h-10 rounded-full border-1px flex items-center justify-center font-bold text-6">
                {{channel.name[0]}}
              </div>
            </div>
            <div  className="h-full flex justify-between w-full">
              <div className="ml-3 h-full flex flex-col justify-center w-full">
                <div className="w-full flex items-center justify-between pr-2">
                  <span className="text-16px mr-2 whitespace-nowrap font-bold">{{ channel.name }}</span>
                  <span className="whitespace-nowrap text-3  w-fit" v-if="lastChats[channel.id]">
                    {{GetDate(lastChats[channel.id].time)}}
                  </span>
                </div>
                <div className="w-full -mt-1 flex items-center justify-between pr-2">
                  <span v-if="typingStatus[channel.username]" class="text-primary">Typing...</span>
                  <span v-else>
                    <span className="whitespace-nowrap max-w-250px lg:max-w-100px pr-2 text-ellipsis overflow-hidden inline-block" v-if="lastChats[channel.id]">
                      <span v-if="lastChats[channel.id].sender === this.user.username">
                        You :
                      </span>
                      <span v-else>
                        {{GetName(lastChats[channel.id].sender)}} :
                      </span>
                      <span v-if="lastChats[channel.id].images.length>0">
                        <i class="fas fa-camera"></i>
                      </span>
                      <span v-if="lastChats[channel.id].files.length>0">
                        <i class="fas fa-file"></i>
                      </span>
                        {{lastChats[channel.id].message}}
                      </span>
                  </span>
                  <div class="w-5 h-5 rounded-full bg-primary-purple text-white flex items-center justify-center text-10px"
                       v-if="newChats[channel.id]"
                  >
                    <span v-if="newChats[channel.id]<100">{{ newChats[channel.id] }}</span>
                    <span v-else>99+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="h-8 w-full flex items-center gap-2 px-2 hover:bg-primary-purple hover:text-white my-2"
              @click="showAddChannel = true">
        <span class="h-5 w-5 bg-primary-purple/50 text-white rounded-sm">
          <i class="fas fa-plus"></i>
        </span>
        Add channel
      </button>
    </div>
    <div class="colleagues mt-2">
      <h1 class="text-center text-primary-purple font-bold">Direct messages</h1>
      <div class="mt-2">
        <div v-for="member in colleagues" @click="$emit('SelectChat',member.username)">
          <div v-if="member.email"  className="h-18 flex border-b-1px cursor-pointer">
            <div className="h-full min-w-10 flex items-center relative">
              <div className="h-4 w-4 rounded-full absolute bottom-0 right-0 bg-primary mb-2 border-2px border-white"
                   v-if=" time- status[member.username] < 5000 "
              >
              </div>
              <div className="h-4 w-4 rounded-full absolute bottom-0 right-0 bg-slate-300 mb-2 border-2px border-white"
                   v-else
              ></div>
              <img :src="member.image" class="w-10 h-10 rounded-full" v-if="member.image">
              <div v-else class="w-10 h-10 rounded-full border-1px flex items-center justify-center font-bold text-6">
                {{member.firstName[0]}}
              </div>
            </div>
            <div  className="h-full flex justify-between w-90%">
              <div className="ml-3 h-full flex flex-col justify-center w-full">
                <div className="w-full mb-2 flex items-center justify-between pr-2">
                  <span className="text-16px mr-2 whitespace-nowrap font-bold">{{GetName(member.username)}}</span>
                  <span className="whitespace-nowrap text-3  w-fit" v-if="lastChats[member.username]">
                    {{GetDate(lastChats[member.username].time)}}
                  </span>
                </div>
                <div className="w-full mb-2 flex items-center justify-between pr-2">
                  <span v-if="typingStatus[member.username]" class="text-primary">Typing...</span>
                  <span v-else>
                    <span className="inline-block whitespace-nowrap  max-w-200px lg:w-120px pr-2 text-ellipsis" v-if="lastChats[member.username]">
                      <span v-if="lastChats[member.username].images.length>0">
                        <i class="fas fa-camera"></i>
                      </span>
                      <span v-if="lastChats[member.username].files.length>0">
                        <i class="fas fa-file"></i>
                      </span>
                      {{lastChats[member.username].message}}
                   </span>
                  </span>
                  <div class="w-5 h-5 rounded-full bg-primary-purple text-white flex items-center justify-center text-10px"
                       v-if="newChats[member.username]"
                  >
                    <span v-if="newChats[member.username]<100">{{ newChats[member.username] }}</span>
                    <span v-else>99+</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {filterData} from "@/commons/objects";
import {mapState} from "vuex";
import {dateFormatter} from "@/commons";
import AddChannels from "@/components/channels/AddChannels";
import {sortData} from "@/commons/objects-arrays";

export default {
  name: "TeamCont",
  components: {AddChannels},
  emits:['SelectChat'],
  data(){
    return{
      showAddChannel:false
    }
  },
  methods:{
    GetDate(date){
      let today = new Date()
      let todayTime = (new Date(`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`)).getTime()
      if(todayTime- date < 86400000){ //The length of a day
        let time = new Date(date)
        let hour = time.getHours()
        let mins = time.getMinutes()
        if(mins<10) mins = '0'+mins
        let pref = hour<12?'a.m':'p.m'
        hour = hour === 0?12:hour <=12?hour:hour-12
        return `${hour}:${mins} ${pref}`
      }
      if(todayTime- date < 86400000*2){ //The length of a day
        return 'Yesterday'
      }
      return  dateFormatter(date,'short-slash')
    },
    GetName(username){
      return !this.team[username]?'':`${this.team[username].firstName} ${this.team[username].lastName}`
    }
  },
  computed: mapState({
    user:state => state.user,
    team:state => state.team,
    colleagues: state => {
      let my = state.user
      let tempTeam = state.team
      tempTeam = filterData(tempTeam,['username','!=',undefined])
      tempTeam = filterData(tempTeam,['username','!=',my.username])
      return tempTeam
    },
    channels: state => state.channels,
    time:state => state.time,
    status:state => state.chats.status,
    typingStatus:(state) => {
      return state.chats.typingStatus
    },
    lastChats({chats}) {
      let mylastChats = {}
      Object.values(this.colleagues).forEach(colleague=>{
        let colleagueChats = filterData({
          ...filterData(chats.chats, ['recipient', '==', colleague.username]),
          ...filterData(chats.chats, ['sender', '==', colleague.username])
        },['isChannelChat','!=',true])
        colleagueChats = sortData(colleagueChats,'time')
        mylastChats[colleague.username] = Object.values(colleagueChats)[Object.keys(colleagueChats).length-1]
      })
      Object.values(this.channels).forEach(channel=>{
        let channelChats = filterData(chats.chats, ['recipient', '==', channel.id])
        channelChats = sortData(channelChats,'time')
        mylastChats[channel.id] = Object.values(channelChats)[Object.keys(channelChats).length-1]
      })
      return mylastChats
    },
    newChats:({chats:{newChats,chats}}) => {
      let tempNew = {}
      newChats.forEach(id=>{
        let chat = chats[id]
        if(chat.isChannelChat){
          if(tempNew[chat.recipient]){
            tempNew[chat.recipient]+=1
          }else{
            tempNew[chat.recipient] = 1
          }
        }else{
          if(tempNew[chat.sender]){
            tempNew[chat.sender]+=1
          }else{
            tempNew[chat.sender] = 1
          }
        }
      })
      return tempNew
    },


  })
}
</script>

<style scoped>
.team-cont{
  transition: width 1s;
}

</style>
