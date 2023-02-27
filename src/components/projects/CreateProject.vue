<template>
  <div class="fixed top-0 bottom-0 w-screen-w left-0 bg-slate-600/50 z-10 flex items-center justify-center"
       @click="CheckClickOutside($event)" v-if="!created">
    <div class="w-full max-w-500px max-h-400px bg-white rounded-lg p-4 relative" ref="contRef">
      <button class="float-right h-5 w-5 text-gray-600" @click="$emit('HideModal')">
        <i class="fas fa-xmark"></i>
      </button>
      <div >
        <h1 class="text-5 font-bold">Create a project</h1>
<!--        <p class="mt-2">Channels are where you communicate with colleagues</p>-->
        <form class="mt-4" @submit.prevent="" id="project-form">
          <div class="flex flex-col gap-3 mb-3">
            <fieldset class="h-10 w-full relative">
              <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                     id="name" @blur="Validate($event.target.id)" v-model="project.name">
              <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
                <label class="bg-white cursor-text px-1">Project title*</label>
              </div>
              <div class="validity-checker h-0 w-fit absolute mr-4 top-1/2 btm-1/2 right-0 flex items-center justify-end">
                <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
                <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
              </div>
            </fieldset>
            <fieldset class="h-10 w-full relative">
              <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px optional"
                     id="lastName" v-model="project.description" @blur="Validate($event.target.id)">
              <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
                <label class="bg-white cursor-text px-1">Description</label>
              </div>
              <div class="validity-checker h-0 w-fit absolute mr-4 right-0 top-1/2 btm-1/2 flex items-center justify-end">
                <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
                <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
              </div>
            </fieldset>
          </div>
          <div class="mt-4">
            <h1>Create a channel</h1>
            <div class="flex justify-between items-center">
              <div class="">
                We'll automatically create a project channel for you
              </div>
              <button class="w-80px h-8 rounded-pill bg-primary border-1px relative px-2 flex items-center justify-between"
                      v-if="createChannel"
                      @click="createChannel = false"
              >
              <span class="inline-block text-white text-5 font-bold ml-2">
                <i class="fas fa-check"></i>
              </span>
                <span class="h-5 w-5 rounded-full bg-white inline-block"></span>
              </button>
              <button class="w-80px h-8 rounded-pill border-1px px-2 flex items-center justify-between"
                      v-else @click="createChannel = true"
              >
                <span class="h-5 w-5 rounded-full bg-gray-400 inline-block"></span>
              </button>
            </div>
          </div>
          <div class="mt-8 flex justify-end">
            <button class="w-120px h-8 rounded-md bg-primary text-white" @click="CreateProject">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div v-else>
    <AddProjectMembers :project-id="projectId" @hide-modal="$emit('HideModal')" :first="true"/>
  </div>
</template>

<script>
import {formIsValid, validateInp} from "@/commons";
import {addDoc, doc, updateDoc} from "firebase/firestore";
import 'ant-design-vue/dist/antd.compact.css'
import {mapState} from "vuex";
import {filterData} from "@/commons/objects";
import {db, dbProjects} from "@/firebase";
import AddProjectMembers from "@/components/projects/AddProjectMembers";
import {CreateChannel} from "@/components/channels/AddChannels";
export default {
  name: "CreateProject",
  components:{
    AddProjectMembers,
  },
  emits:['HideModal'],
  data(){
    return{
      project:{
        members:[]
      },
      created:false,
      projectId:undefined ,
      tempChannelMembers:[],
      createChannel:true,
      channel:{
        isPrivate:true
      }
    }
  },
  watch:{
    projectId(val){
      if(val && this.projects[val]){
        this.created = true
      }
    }
  } ,
  methods:{
    CreateChannel,
    Validate(id){
      validateInp(id)
    },
    async CreateProject(){
      if(!formIsValid('project-form'))return
      let date =  (new Date()).getTime()
      let project = {...this.project}
      project.members = [{
        username:this.user.username,
        dateJoined: date,
        isOwner:true,
        isProjectManager:true
      }]
      try{
        let c = await addDoc(dbProjects,{
          ...project,
          created:date,
          createdBy:this.user.username
        })
        this.projectId = c.id
        if(this.createChannel){
          this.channel = {
            ...this.channel,
            name:project.name,
            description:`This is the official channel for '${project.name}' project`
          }
          let channelId = await this.CreateChannel(this.projectId)
          await updateDoc(doc(db,'projects',this.projectId),{
            channelId
          })
        }
      }catch (e){
        console.log(e)
      }

    },
    CheckClickOutside(event){
      let target = event.target
      let isOutside = this.$refs.contRef && !this.$refs.contRef.contains(target) &&
      target.tagName !== 'BUTTON' && target.parentNode.tagName !== 'BUTTON' &&
          target.parentNode.parentNode.tagName !== 'BUTTON'


      if(isOutside){
        this.$emit('HideModal')
      }
    }
  },
  computed:mapState({
    user:state => state.user,
    projects:state => {
      return state.projects.projects
    },
    colleagues: state => {
      let my = state.user
      let tempTeam = state.team
      tempTeam = filterData(tempTeam,['username','!=',my.username])
      return tempTeam
    },
  })
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
