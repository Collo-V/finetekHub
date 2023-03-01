<template>
  <div class="fixed top-0 bottom-0 w-screen-w left-0 bg-slate-600/50 z-10 flex items-center justify-center"
       @click="CheckClickOutside($event)">
    <div class="w-full max-w-500px max-h-400px bg-white rounded-lg p-4 relative" ref="contRef">
      <button class="float-right h-5 w-5 text-gray-600" @click="$emit('HideModal')">
        <i class="fas fa-xmark"></i>
      </button>
      <div>
        <h1 class="text-5">Add people to {{ project.name }}</h1>
        <div class="mt-4">
          <Select  class="w-full h-8 mt-4"
                   v-model:value="tempProjectMembers"
                   mode="multiple"
                   style="width: 100%;height:64px"
                   placeholder="Search members"
                   :options="addOptions"
          />
          <div class="mt-8 flex justify-end gap-4" v-if="first">
            <button class="w-120px h-8 rounded-md border-1px" @click="$emit('HideModal')"
                    v-if="tempProjectMembers.length === 0"
            >
              Skip for now
            </button>
            <button class="w-120px h-8 rounded-md bg-primary text-white" @click="AddMembers" v-else>
              Add
            </button>
          </div>
          <div class="mt-8 flex justify-end gap-4" v-else>
            <button class="w-120px h-8 rounded-md bg-slate-400 text-white"
                    v-if="tempProjectMembers.length === 0"
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
import {doc, updateDoc} from "firebase/firestore";
import {Select} from "ant-design-vue";
import 'ant-design-vue/dist/antd.compact.css'
import {mapState} from "vuex";
import {filterData} from "@/commons/objects";
import {db, dbNotifs} from "@/firebase";
import {Report} from "@/commons/swal";
import {AddMembers as AddChannelMembers} from '@/components/channels/AddChannelMembers'

export default {
  name: "AddProjectMembers",
  components:{Select},
  emits:['HideModal'],
  props:['projectId','first'],
  data(){
    return{
      tempProjectMembers:[],
      tempChannelMembers:[]
    }
  },
  methods:{
    AddChannelMembers,
    async AddMembers(){
      // let membersAdded = filterData(this.colleagues,['username','in',this.tempProjectMembers])
      // let list = Object.keys(membersAdded)
      let list = this.tempProjectMembers
      try{
        let date =  (new Date()).getTime()
        for (let i = 0; i < list.length; i++) {
          let username = list[i]
          let members = this.project.members
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
          let c = await updateDoc(doc(db, 'projects',this.project.id),{
            members:[...others,added],
          })
        }
        if(this.channel){
          this.tempChannelMembers = this.tempProjectMembers
          this.AddChannelMembers()
        }
        Report({icon:'success',title:'Member(s) added'})
        this.$emit('HideModal')
      }catch (e){
        Report({icon:'error',title:'Error adding member'})
        console.log(e)
      }

    },
    CheckClickOutside(event){
      if(this.$refs.contRef && !this.$refs.contRef.contains(event.target)){
        this.$emit('HideModal')
      }
    }
  },
  computed:mapState({
    user:state => state.user,
    project(state){
      return state.projects.projects[this.projectId]
    },
    channel(state){
      return state.channels[this.project.channelId]
    },
    colleagues: state => {
      let my = state.user
      let tempTeam = state.team
      tempTeam = filterData(tempTeam,['username','!=',my.username])
      return tempTeam
    },
    addOptions(state){
      if(!this.project)return []
      let team = filterData(this.colleagues,['username','not-in',this.tempProjectMembers])
      let memberIds = this.project.members.filter(member=>{
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
