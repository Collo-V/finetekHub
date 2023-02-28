<template>
  <div class="fixed top-0 bottom-0 w-screen-w left-0 bg-slate-600/50 z-10 flex items-center justify-center"
       @click="CheckClickOutside($event)">
    <div class="w-full max-w-500px max-h-400px bg-white rounded-lg p-4 relative" ref="contRef">
      <button class="float-right h-5 w-5 text-gray-600" @click="$emit('HideModal')">
        <i class="fas fa-xmark"></i>
      </button>
      <div>
        <h1 class="text-5">Add people to {{channel.name}}</h1>
        <div class="mt-4">
          <fieldset class="h-10 w-full relative hidden">
            <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px optional"
                   id="member-list" v-model="channel.name">
            <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
              <label class="bg-white cursor-text px-1">Add members</label>
            </div>

          </fieldset>
          <Select  class="w-full h-8 mt-4"
                   v-model:value="tempChannelMembers"
                   mode="multiple"
                   style="width: 100%;height:64px"
                   placeholder="Search members"
                   :options="addOptions"
          />
          <div class="mt-8 flex justify-end gap-4" v-if="first">
            <button class="w-120px h-8 rounded-md border-1px" @click="$emit('HideModal')"
                    v-if="tempChannelMembers.length === 0"
            >
              Skip for now
            </button>
            <button class="w-120px h-8 rounded-md bg-primary text-white" @click="AddMembers" v-else>
              Add
            </button>
          </div>
          <div class="mt-8 flex justify-end gap-4" v-else>
            <button class="w-120px h-8 rounded-md bg-slate-400 text-white"
                    v-if="tempChannelMembers.length === 0"
            >
              Add
            </button>
            <button class="w-120px h-8 rounded-md bg-primary text-white" @click="AddMembers" v-else>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {addDoc, doc, updateDoc} from "firebase/firestore";
import firebase from "firebase/compat";
import {Select} from "ant-design-vue";
import 'ant-design-vue/dist/antd.compact.css'
import {mapState} from "vuex";
import {filterData} from "@/commons/objects";
import {db, dbNotifs} from "@/firebase";
import {Report} from "@/commons/swal";
export async function AddMembers(){
  let date = (new Date()).getTime()
  console.log('here we go',this.colleagues)
  let membersAdded = filterData(this.colleagues,['username','in',this.tempChannelMembers])
  let list = Object.keys(membersAdded)
  try{

    let notifiers = this.channel.members.map(member=>member.username)
    let date =  (new Date()).getTime()
    for (let i = 0; i < list.length; i++) {
      let username = list[i]
      let members = this.channel.members
      let added = members.filter(member=>member.username === username)[0]
      let others = members.filter(member=>member.username !== username)
      let rejoined
      if(added){//the guy was once a member
        rejoined = true
        added.dateRejoined = date
      }else{
        added = {
          username,
          dateJoined:date,
          addedBy:this.user.username
        }
      }
      let c = await updateDoc(doc(db, 'channels',this.channel.id),{
        members:[...others,added],
      })
      addDoc(dbNotifs,{
        actor:rejoined?username:this.user.username,
        entity:this.channel.id,
        entityType:rejoined?'Rejoined':'Added',
        notifiers:[...notifiers,username],
        time:date,
        subject:rejoined?this.user.username:username,
        isRead:[this.user.username]
      })
    }
    Report({icon:'success',title:'Member(s) added'})
    this.$emit('HideModal')
  }catch (e){
    Report({icon:'error',title:'Error adding member'})
    console.log(e)
  }

}

export default {
  name: "AddChannels",
  components:{Select},
  emits:['HideModal'],
  props:['channelId','first'],
  data(){
    return{
      tempChannelMembers:[]
    }
  },
  methods:{
    AddMembers,
    CheckClickOutside(event){
      if(this.$refs.contRef && !this.$refs.contRef.contains(event.target)){
        this.$emit('HideModal')
      }
    }
  },
  computed:mapState({
    user:state => state.user,
    channel(state){
      return state.channels[this.channelId]
    },
    colleagues: state => {
      let my = state.user
      let tempTeam = state.team
      tempTeam = filterData(tempTeam,['username','!=',my.username])
      return tempTeam
    },
    addOptions(state){
      if(!this.channel)return []
      let team = filterData(this.colleagues,['username','not-in',this.tempChannelMembers])
      let memberIds = this.channel.members.filter(member=>{
        return !member.dateLeft || (member.dateRejoined && member.dateRejoined > member.dateLeft)
      }).map(member=>member.username)
      team = filterData(team,['username','not-in',memberIds])
      return Object.values(team).map((member) => ({
        value:member.username,
        label:`${member.firstName} ${member.lastName}`
      }))
    }
  }),
  mounted(){
    console.log(this.channelId)
  }
}
</script>

<style>
.ant-select-selection-overflow{
  @apply h-10;
}
.ant-select-item-empty{
  @apply hidden;
}

</style>
