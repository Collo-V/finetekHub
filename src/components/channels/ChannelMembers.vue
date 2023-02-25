<template>
  <div>
    <div class="px-4">
      <div class="relative">
        <div class="absolute top-0 bottom-0 left-0 w-10 flex items-center justify-center">
          <i class="fas fa-search"></i>
        </div>
        <input type="text" placeholder="Search members" v-model="searchInp"
               class="w-full h-10 border-1px rounded-md pl-10"
        >
        <div class="absolute top-0 bottom-0 right-0 w-10 flex items-center justify-center">
          <button class="h-5 w-5 rounded-full bg-slate-400/50 text-white hover:bg-slate-400"
                  @click="searchInp = ''">
            <i class="fas fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="members-cont mt-4">
      <div class="h-50px flex items-center hover:bg-primary-purple/10 px-4 gap-4 cursor-pointer"
           @click="showAddMembers=true"
      >
        <button class="w-10 h-10 bg-primary/50">
          <i class="fas fa-user-plus"></i>
        </button>
        Add people
      </div>
      <div v-for="member in filteredMembers"
           class="h-50px flex items-center justify-between hover:bg-primary-purple/10 px-4 gap-4 cursor-pointer"
      >
        <div class="flex h-full items-center gap-4">
          <div class="h-10 w-10">
            <img :src="member.image" class="w-10 h-10 " v-if="member.image">
            <div  v-else class="w-42px h-42px  bg-slate-300 lg:bg-white flex items-center justify-center font-bold p-1px text-6">
              <div class="w-10 h-10 rounded-full flex bg-white lg:bg-slate-300 items-center justify-center font-bold text-6">
                {{member.firstName[0]}}
              </div>
            </div>
          </div>
          <div>
            {{member.firstName}} {{member.lastName}}
            <span v-if="member.username === user.username">(You)</span>
          </div>
        </div>
        <div class="flex gap-4">
          <button v-if="Promotable(member.username)"
                  class="bg-transparent text-3 text-primary hover:border-b-1px border-primary"
                  @click="MakeAdmin(member.username)"
          >
            Make admin
          </button>
          <button v-else-if="Demotable(member.username)"
                  class="bg-transparent text-3 text-primary hover:border-b-1px border-primary"
                  @click="RemoveAdmin(member.username)"
          >
            Remove Admin
          </button>
          <button v-if="Removable(member.username)"
                  class="bg-transparent text-3 text-primary hover:border-b-1px border-primary"
                  @click="RemoveMember(member.username)"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
  <AddChannelMembers
      :channel-id="channel.id" v-if="showAddMembers"
      @HideModal="showAddMembers = false"
  />
</template>

<script>
import {mapState} from "vuex";
import {addDoc, doc, updateDoc} from "firebase/firestore";
import {db, dbNotifs} from "@/firebase";
import {filterData} from "@/commons/objects";
import {confirmAction} from "@/commons/swal";
import AddChannelMembers from "@/components/channels/AddChannelMembers";

export default {
  name: "ChannelMembers",
  props:['channelId'],
  components:{
    AddChannelMembers
  },
  data(){
    return{
      searchInp:'',
      showAddMembers:false
    }
  },
  computed:mapState({
    user:state => state.user,
    team:state => state.team,
    channel(state) {
      return state.channels[this.channelId]
    },
    members(state) {
      let usernames = this.channel.members.filter(member=>{
        return !member.dateLeft || (member.dateRejoined && member.dateRejoined > member.dateLeft)
      }).map(member => member.username)
      return usernames.map(username => state.team[username])
    },
    objChannelMembers() {
      let temp = {}
      this.channel.members.forEach(member=>{
        temp[member.username] = member
      })
      return temp
    },
    filteredMembers(state) {
      return this.members.filter(member=>member.firstName.toLowerCase().includes(this.searchInp.toLocaleLowerCase())
          || member.lastName.toLowerCase().includes(this.searchInp.toLowerCase()))
      // return [
      //     ...filterData(this.members,['firstName','includes',this.searchInp]),
      //     ...filterData(this.members,['lastName','includes',this.searchInp])
      // ]
    },
  }) ,
  methods:{
    Promotable(username){
      return username !== this.user.username &&  this.objChannelMembers[this.user.username].isAdmin &&
           !this.objChannelMembers[username].isAdmin

    },
    Demotable(username){
      return username !== this.user.username && this.objChannelMembers[this.user.username].isAdmin &&
          !this.objChannelMembers[username].isOwner && this.objChannelMembers[username].isAdmin

    },
    Removable(username){
      return username !== this.user.username && this.objChannelMembers[this.user.username].isAdmin &&
          !this.objChannelMembers[username].isOwner

    },
    async RemoveMember(username){
      if(!await confirmAction({
        title:`Remove ${this.team[username].firstName} ${this.team[username].lastName}?`,
        btnText:'Yes',
        text:'They will no longer be part of the channel'
      }))return
      let date =  (new Date()).getTime()
      let members = this.channel.members
      let removed = members.filter(member=>member.username === username)[0]
      removed['dateLeft'] = date
      let others = members.filter(member=>member.username !== username)
      members = [...others,removed]
      await updateDoc(doc(db,'channels',this.channel.id),{
        members
      })
      let notifiers = this.channel.members.map(member=>member.username)
      addDoc(dbNotifs,{
        actor:this.user.username,
        entity:this.channelId,
        entityType:'Removed',
        notifiers,
        time:date,
        subject:username,
        isRead:[this.user.username]
      })
    },
    async MakeAdmin(username){
      if(!await confirmAction({
        title:`Make ${this.team[username].firstName} ${this.team[username].lastName} admin?`,
        btnText:'Yes',
        text:'Privileges include removing other members'
      }))return
      let promoted = this.channel.members.filter(member=> member.username === username)[0]
      let others = this.channel.members.filter(member=> member.username!== username)
      promoted.isAdmin = true
      others.push(promoted)
      await updateDoc(doc(db,'channels',this.channel.id),{
        members:others
      })
      let date = (new Date()).getTime()
      addDoc(dbNotifs,{
        actor:this.user.username,
        entity:this.channelId,
        entityType:'MakeAdmin',
        notifiers:[username],
        time:date,
        subject:username,
        isRead:[]
      })
    },
    async RemoveAdmin(username){
      let demoted = this.channel.members.filter(member=> member.username === username)[0]
      let others = this.channel.members.filter(member=> member.username!== username)
      demoted.isAdmin = false
      others.push(demoted)
      await updateDoc(doc(db,'channels',this.channel.id),{
        members:others
      })
      let date = (new Date()).getTime()
      addDoc(dbNotifs,{
        actor:this.user.username,
        entity:this.channelId,
        entityType:'RemoveAdmin',
        notifiers:[username],
        time:date,
        subject:username,
        isRead:[]
      })
    }
  }
}
</script>

<style scoped>

</style>
