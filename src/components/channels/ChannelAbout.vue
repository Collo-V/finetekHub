<template>
  <div class="px-4">
    <div class="p-4 border-1px rounded-md cursor-pointer hover:bg-slate-200" @click="showEditName = true"
         v-if="channel.createdBy === user.username"
    >
      <button class="text-primary hover:underline float-right">
        Edit
      </button>
      <h1 class="font-bold">Channel name</h1>
      <div class="flex gap-2 items-center">
        <i class="fas fa-lock" v-if="channel.isPrivate"></i>
        <i class="fas fa-hashtag" v-else></i>
        {{channel.name}}
      </div>
    </div>
    <div class="p-4 border-1px rounded-md cursor-pointer hover:bg-slate-200" v-else>
      <h1 class="font-bold">Channel name</h1>
      <div class="flex gap-2">
        <i class="fas fa-lock" v-if="channel.isPrivate"></i>
        <i class="fas fa-hashtag" v-else></i>
        {{channel.name}}
      </div>
    </div>
    <div class="border-1px rounded-md mt-4">
      <div class="border-b-1px p-4 cursor-pointer hover:bg-slate-200" @click="showEditDescription = true">
        <button class="text-primary hover:underline float-right" @click="showEditDescription = true">
          Edit
        </button>
        <h1 class="font-bold">Description</h1>
        <div class="flex gap-2">
          <span v-if="channel.description === ''">
            Add a description
          </span>
          <span v-else>
            {{channel.description}}
          </span>

        </div>
      </div>
      <div class="border-b-1px p-4">
        <h1 class="font-bold">Created by</h1>
        <div class="flex gap-2">
          {{GetName(channel.createdBy)}}
          on
          {{DateFormatter(channel.created)}}
        </div>
      </div>
      <div class="p-4 text-red-400">
        <button class="font-bold" @click="LeaveChannel">Leave channel</button>
      </div>
    </div>
    <div class="edit-name fixed top-0 bottom-0 w-screen-w left-0 bg-slate-600/50 z-10 flex items-center justify-center z-1"
         v-if="showEditName"
         @click="CheckClickOutside($event)"
    >
      <div class="w-full max-w-500px max-h-400px bg-white rounded-lg p-4 relative" ref="nameEditCont">
        <h1 class="text-5 font-bold">
          Rename this channel
        </h1>
        <div>
          <input type="text" v-model="tempName" class='h-10 rounded-md border-1px w-full'>
          <p class="text-3">Channel names must be at least 4 characters long</p>
        </div>
        <div class="flex justify-end mt-4 gap-4">
          <button class="w-120px h-8 rounded-md border-1px" @click="showEditName = false">
            Cancel
          </button>
          <button class="w-120px h-8 rounded-md bg-primary text-white"
                  v-if="nameEdited"
                  @click="EditName"
          >
            Save
          </button>
          <button class="w-120px h-8 rounded-md bg-slate-400 text-white" v-else>
            Save
          </button>
        </div>


      </div>
    </div>
    <div class="edit-name fixed top-0 bottom-0 w-screen-w left-0 bg-slate-600/50 z-10 flex items-center justify-center z-1"
         v-if="showEditDescription"
         @click="CheckClickOutside($event)"
    >
      <div class="w-full max-w-500px max-h-400px bg-white rounded-lg p-4 relative"  ref="descEditCont">
        <h1 class="text-5 font-bold">
          Edit description
        </h1>
        <p class="text-3">
          Let people know what {{channel.name}} is all about
        </p>
        <div>
          <textarea type="text" v-model="tempDescription" class='min-h-10 rounded-md border-1px w-full'/>
        </div>
        <div class="flex justify-end mt-4 gap-4">
          <button class="w-120px h-8 rounded-md border-1px" @click="showEditDescription = false">
            Cancel
          </button>
          <button class="w-120px h-8 rounded-md bg-primary text-white"
                  v-if="descEdited"
                  @click="EditDescription"
          >
            Save
          </button>
          <button class="w-120px h-8 rounded-md bg-slate-400 text-white" v-else>
            Save
          </button>
        </div>


      </div>
    </div>
  </div>

</template>

<script>
import {mapState} from "vuex";
import {dateFormatter} from "@/commons";
import {addDoc, doc, updateDoc} from "firebase/firestore";
import {db, dbNotifs} from "@/firebase";
import {confirmAction, Report} from "@/commons/swal";
import {filterData} from "@/commons/objects";

export default {
  name: "ChannelAbout",
  props:['channelId'],
  emits:['HideModal'],
  data(){
    return{
      showEditName:false,
      showEditDescription:false,
      tempName:'' ,
      tempDescription:'' ,
    }
  },
  methods:{
    GetName(username){
      return !this.team[username]?'':`${this.team[username].firstName} ${this.team[username].lastName}`
    },
    DateFormatter(date){
      return dateFormatter(date,'formal')
    },
    CheckClickOutside(event){
      if(this.$refs.nameEditCont && !this.$refs.nameEditCont.contains(event.target)){
        this.showEditName = false
      }
      if(this.$refs.descEditCont && !this.$refs.descEditCont.contains(event.target)){
        this.showEditDescription = false
      }
    },
    async EditName(){
      let oldName = this.channel.name
      try {
        updateDoc(doc(db, 'channels',this.channelId),{
          name:this.tempName.trim(),
        })
        this.showEditName = false
        this.tempName = ''
        let date = (new Date()).getTime()
        let notifiers = this.channel.members.map(member=>member.username)
        await addDoc(dbNotifs,{
          actor:this.user.username,
          entity:this.channelId,
          entityType:'ChangeName',
          notifiers,
          time:date,
          subject:oldName,
          isRead:[this.user.username]
        })
        Report({icon:'success',title:'Name edited'})
      }catch {
        Report({icon:'error',title:'Error editing'})
      }

    },
    async EditDescription(){
      let oldDesc = this.channel.description
      try {
        updateDoc(doc(db, 'channels',this.channelId),{
          description:this.tempDescription.trim(),
        })
        let date = (new Date()).getTime()
        this.tempDescription = ''
        this.showEditDescription = false
        let notifiers = this.channel.members.map(member=>member.username)
        await addDoc(dbNotifs,{
          actor:this.user.username,
          entity:this.channelId,
          entityType:'ChangeDescription',
          notifiers,
          time:date,
          subject:oldDesc,
          isRead:[this.user.username]
        })
        Report({icon:'success',title:'Description edited'})
      }catch {
        Report({icon:'error',title:'Error editing'})
      }

    },
    async LeaveChannel(){
      if(! await confirmAction({
        title:`Leave ${this.channel.name}?` ,
        text:'' ,
        btnText:'Leave'
      }))return
      let date = (new Date()).getTime()
      let members = this.channel.members
      let me = members.filter(member=>member.username === this.user.username)[0]
      me['dateLeft'] = date
      let others = members.filter(member=>member.username !== this.user.username)
      members = [...others,me]
      try {
        await updateDoc(doc(db, 'channels',this.channelId),{
          members
        })
        let notifiers = this.channel.members.map(member=>member.username)
        notifiers.push(me.username)
        await addDoc(dbNotifs,{
          actor:me.username,
          entity:this.channelId,
          entityType:'Left',
          notifiers,
          time:date-1,
          isRead:[]
        })
        this.$emit('HideModal')
      }catch (e){
        console.log(e)

      }


    }
  } ,
  computed:mapState({
    user:state => state.user,
    team:state => state.team,
    channel(state) {
      let channel = state.channels[this.channelId]
      if(!channel) return {}
      this.tempName = channel.name
      this.tempDescription = channel.description?channel.description:''
      return channel
    },
    members(state) {
      let usernames = this.channel.members.map(member => member.username)
      return usernames.map(username => state.team[username])
    },
    nameEdited(){
      return this.tempName !== this.channel.name && this.tempName.trim().length >4
    },
    descEdited(){
      return this.tempDescription !== this.channel.description
    }
  })
}
</script>

<style scoped>

</style>
