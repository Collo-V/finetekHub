<template>
  <div class="absolute bottom-0 left-0 w-full z-10">
    <button class="h-8 text-white absolute bottom-0 right-0 m-10 bg-primary w-fit px-2 rounded-sm"
            @click="showAddTask = true"
    >
      <i class="fas fa-plus"></i>
      Add task
    </button>
    <div class="fixed top-0 bottom-0 w-screen-w left-0 bg-slate-600/50 z-10 flex items-center justify-center"
         @click="CheckClickOutside($event)" v-if="showAddTask">
      <div class="w-full w-600px max-w-90% max-h-screen-h  bg-white rounded-lg p-4 relative" ref="contRef">
        <button class="float-right h-5 w-5 text-gray-600" @click="showAddTask=false">
          <i class="fas fa-xmark"></i>
        </button>
        <h1 class="text-5 font-semibold">Add task</h1>
        <form action="" @submit.prevent>
          <div class="flex flex-col gap-3 mb-3">
            <fieldset class="h-10 w-full relative">
              <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                     id="name" @blur="Validate($event.target.id)" v-model="task.name">
              <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
                <label class="bg-white cursor-text px-1">Task name*</label>
              </div>
              <div class="validity-checker h-0 w-fit absolute mr-4 top-1/2 btm-1/2 right-0 flex items-center justify-end">
                <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
                <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
              </div>
            </fieldset>
            <fieldset class="h-10 w-full relative">
              <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px optional"
                     id="lastName" v-model="task.description" @blur="Validate($event.target.id)">
              <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
                <label class="bg-white cursor-text px-1">Description</label>
              </div>
              <div class="validity-checker h-0 w-fit absolute mr-4 right-0 top-1/2 btm-1/2 flex items-center justify-end">
                <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
                <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
              </div>
            </fieldset>
          </div>
          <div>

            <div v-if="task.subtasks.length > 0"> Subtasks</div>
            <ul class="subtask-list list-disk list-outside px-4 overflow-auto custom-scroll max-h-300px" ref="subtaskList">

            </ul>
            <button @click="AddSubtask(task.subtasks.length)">
              <i class="fas fa-plus"></i>
              Add subtasks
            </button>
          </div>
          <div class="mt-2 flex">
            <div class="assigned-to relative flex gap-2 items-center">
              Task assigned to:
              <div class="h-10 w-fit px-2 rounded-pill flex border-1px items-center pl-4">
                <span v-for="member in assignedMembers" class="relative dropdown-cont">
                  <button class="h-5 w-5 absolute top-0 left-50% vh-center bg-white dropdown
                  rounded-full z-1 hover:bg-primary-purple hover:text-white shadow"
                          @click="ManageAssigned(member.username)"
                  >
                    <i class="fas fa-xmark"></i>
                  </button>
                  <Avatar
                      size="small" rounded="true"
                      :image="member.image" :name="member.firstName"
                      class="-ml-2"
                  />
                </span>
                <button class="w-8 h-8 border-dotted border-1px rounded-full -ml-2"
                        @click="showMemberAssign = !showMemberAssign"
                >
                  <i class="fas fa-user-plus"></i>
                </button>

              </div>
              <span class="text-3 text-red-500 hidden" id="assign-error">
                This task has not been assigned to anyone
              </span>
              <span v-if="showMemberAssign">
                <div class="fixed top-0 popup-overlay left-0 w-screen-w h-screen-h" @click="showMemberAssign = false"></div>
              <div class="members absolute top-0 left-full w-fit bg-white z-1
              vue-shadow rounded-md h-fit min-h-200px min-w-200px">
                <div class="p-1">
                  <input type="text" class="w-full h-8" placeholder="search members" v-model="searchInp">
                </div>
                <div v-for="member in filteredMembers"
                     @click="ManageAssigned(member.username)"
                     class="h-10 flex items-center justify-between hover:bg-primary-purple/10 px-4 gap-4 cursor-pointer"
                >
                  <div class="flex h-full items-center gap-4">
                    <div class="h-10 w-10">
                      <Avatar
                          size="medium" rounded="true"
                          :image="member.image" :name="member.firstName"
                      />
                    </div>
                    <div class="whitespace-nowrap">
                      <span v-if="member.username === user.username">Me</span>
                      <span v-else>{{member.firstName}} {{member.lastName}}</span>
                    </div>
                  </div>
                </div>

              </div>
              </span>
            </div>
          </div>
          <div class="others mt-2 flex gap-2 relative">
            <div class="relative">
              <Tooltip
                  placement="top"
                  overlayClassName="mr-2"
                  title="Task priority"
              >
                <button class="h-10 w-10 rounded-full border-dotted border-1px"
                        @click="showPriorities = !showPriorities">
                  <PriorityFlag :priority="task.priority"/>
                </button>
              </Tooltip>
              <span v-if="showPriorities">
                <div class="fixed top-0 popup-overlay left-0 w-screen-w h-screen-h" @click="showPriorities = false"></div>
                <div class="members absolute top-0 left-full w-fit bg-white z-1
                vue-shadow rounded-md h-fit min-w-200px overflow-hidden">
                  <div class="h-8 hover:bg-slate-100 cursor-pointer flex items-center px-2 gap-2"
                       v-for="(p,index) in priorities" @click="task.priority = index+1">
                    <PriorityFlag :priority="index+1"/> {{p}}
                  </div>
                </div>
              </span>
            </div>
            <div class="relative">
              <Tooltip
                  placement="top"
                  overlayClassName="mr-2"
                  title="Task Dates"
              >
                <button class="h-10 w-10 rounded-full border-dotted border-1px"
                        @click="showDates = !showDates">
                  <i class="fas fa-calendar"></i>
                </button>
              </Tooltip>
              <span v-if="showDates">
                <div class="fixed top-0 popup-overlay left-0 w-screen-w h-screen-h" @click="showDates = false"></div>
                <div class="vue-shadow w-fit min-w-220px z-1 h-fit absolute top-0 left-full bg-white">
                  <RangePicker v-model:value="dates" :ranges="ranges"/>
                  <TimePicker v-model:value="startTime" use12-hours format="h:mm a" placeholder="start time"/>
                  <TimePicker v-model:value="endTime" use12-hours format="h:mm a" placeholder="end time"/>
                </div>
              </span>

            </div>
            <div class="relative">
              <Tooltip
                  placement="top"
                  overlayClassName="mr-2"
                  title="Task dependencies"
              >
                <button class="h-10 w-10 rounded-full border-dotted border-1px"
                        @click="showDependencies = !showDependencies">
                  <i class="fa-solid fa-bars-staggered"></i>
                </button>
              </Tooltip>
              <TaskDependencies
                  v-if="showDependencies"
                  :project-id="projectId"
                  :blocking="task.blocking"
                  :waiting-on="task.waitingOn"
                  @manage-waiting-on="(task)=>ManageWaitingOn(task)"
                  @manage-blocking="(task)=>ManageBlocking(task)"
                  @hide-modal="showDependencies = false"
              />
            </div>
          </div>

          <div class="mt-4 flex justify-end">
            <button class="w-120px h-8 bg-primary rounded-md text-white" @click="CreateTask">Create</button>
          </div>

        </form>
      </div>
    </div>


  </div>

</template>

<script>
import {validateInp} from "@/commons";
import {removeFromArray} from "@/commons/objects";
import {mapState} from "vuex";
import Avatar from "@/components/Avatar";
import PriorityFlag from "@/components/tasks/PriorityFlag";
import {Tooltip,RangePicker,TimePicker} from "ant-design-vue";
import moment,{Moment} from 'moment'
import {ref} from "vue";
import TaskDependencies from "@/components/tasks/TaskDependencies";
import {addDoc, doc, updateDoc} from "firebase/firestore";
import {db, dbNotifs, dbTaskActivities, dbTasks} from "@/firebase";
import {checkClickOutside} from "@/commons/eventHandlers";
import {Report} from "@/commons/swal";
import firebase from "firebase/compat";
// import {A}
let priorities = ['Urgent','High','Normal','Low']
export const taskMethods = {
  async CreateTask(){
    let task = this.task
    console.log(this.dates,this.startTime)
    validateInp('name')
    if(!task.name || this.task.name === '')return
    if(task.assignedTo.length === 0){
      document.getElementById('assign-error').classList.remove('hidden')
      return
    }
    document.getElementById('assign-error').classList.add('hidden')
    let date = (new Date()).getTime()
    let subtasks = task.subtasks
    delete task.subtasks
    if(this.dates){
      let startDate = this.dates[0].$d.getTime()
      let endDate = this.dates[0].$d.getTime()
      task = {
        ...task,
        plannedStartDate:startDate,
        plannedEndDate:endDate,
      }
    }
    if( this.startTime && this.startTime !== null){
      task.plannedStartTime = this.startTime.$d.getTime()
    }
    if( this.endTime && this.endTime !== null){
      task.plannedEndTime = this.endTime.$d.getTime()
    }
    try {
      let task = await addDoc(dbTasks,{
        ...task,
        projectId:this.projectId,
        createdBy:this.user.username,
        status:'Backlog',
        created:firebase.firestore.FieldValue.serverTimestamp()
      })
      addDoc(dbTaskActivities, {
        actor: this.user.username,
        taskId: task.id,
        activity: 'Created',
        time: firebase.firestore.FieldValue.serverTimestamp(),
      }).catch()
      subtasks = subtasks.filter(subtask=>subtask !=='').map(subtask=>({
        name:subtask,
        projectId:this.projectId,
        createdBy:this.username.username,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        status:'Backlog',
        subtaskFor:task.id,
        blocking:[],
        waitingOn:[],
        priority:3,
        assignedTo:[]
      }))
      for (let i = 0; i < subtasks.length; i++) {
        c= await addDoc(dbTasks,subtasks[i])
        addDoc(dbTaskActivities, {
          actor: this.user.username,
          taskId: task.id,
          activity: 'AddSubtask',
          subtaskId: c.id,
          time: firebase.firestore.FieldValue.serverTimestamp(),
        }).catch()
      }
      // if(subtasks.length>0){
      //   if(task.plannedStartDate){
      //     subtasks[0]
      //   }
      // }
      Report({icon:'success',title:'Task created'})
    }catch {
      Report({icon:'error',title:'error creating task'})
    }
},
  ManageBlocking(task){
    if(this.task.blocking.includes(task)){
      this.task.blocking = removeFromArray(this.task.blocking,task)
    }else {
      this.task.blocking.push(task)
    }

  },
  ManageWaitingOn(task){
    if(this.task.waitingOn.includes(task)){
      this.task.waitingOn = removeFromArray(this.task.waitingOn,task)
    }else {
      this.task.waitingOn.push(task)
    }
  },
  async ManageAssigned(username){
    let assignedTo = this.task.assignedTo
    if(assignedTo.includes(username)){
      assignedTo = removeFromArray(this.task.assignedTo,username)
    }else {
      assignedTo.push(username)
    }
    if(this.taskId){
      await updateDoc(doc(db,'tasks',this.taskId), {
            assignedTo
      })
      addDoc(dbTaskActivities, {
        actor: this.user.username,
        taskId: this.taskId,
        activity: 'AssignTo',
        time: firebase.firestore.FieldValue.serverTimestamp(),
        value:username
      }).catch()

    }else{
      this.task.assignedTo = assignedTo
    }
  } ,
  AddSubtask(index){
    if(index !== this.task.subtasks.length)return
    console.log('starting')
    this.task.subtasks.push('')
    let listCont = this.$refs.subtaskList
    let list = document.createElement('li')
    let button = document.createElement('button')
    button.type = 'button'
    button.classList.add('v-center')
    let icon = document.createElement('i')
    icon.classList.add('fas','fa-trash-can')
    button.appendChild(icon)
    button.addEventListener('click',()=>{
      this.DeleteSubtask(index,list)
    })
    let input = document.createElement('input')
    input.id = 'subtask-'+index+1
    input.addEventListener('change',(event)=>{
      this.task.subtasks[index] = event.target.value
    })
    input.addEventListener('blur',(event)=>{
      if(event.target.value === ''){
        this.DeleteSubtask(index,list)
      }
    })
    input.addEventListener('keyup',(event)=>{
      if(event.key === 'Enter'){
        console.log('creating input number ',index+1)
        this.AddSubtask(index+1)
      }
    })
    list.append(input,button)
    listCont.appendChild(list)
    input.focus()
  },
  async DeleteSubtask(index, list){
  if(list){
    let subtasks = this.task.subtasks
    if(subtasks.length>1){
      this.task.subtasks = removeFromArray(subtasks,subtasks[index])
    }else {
      this.task.subtasks = []
    }
    let listCont = this.$refs.subtaskList
    listCont.removeChild(list)
  }
  console.log(this.task.subtasks)

},
}

export default {
  name: "AddTask",
  components: {
    TaskDependencies,
    PriorityFlag, Avatar,
    RangePicker,TimePicker,
    Tooltip
  },
  props:['projectId'],
  data(){
    return{
      showAddTask:false,
      priorities,
      task:{
        assignedTo:[],
        subtasks:[],
        priority:3,
        blocking:[],
        waitingOn:[],
      },
      searchInp:'',
      showMemberAssign:false,
      showPriorities:false,
      showDates:false,
      showDependencies:false,
      dates: ref<Moment>([]),
      startTime:ref<Moment | undefined>(undefined),
      endTime:ref<Moment | undefined>(undefined),
      ranges: { Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] },
    };
  },
  methods:{
    ...taskMethods,
    Validate(id){
      validateInp(id)
    },
    CheckClickOutside(event){
      let callBack = ()=>{
        this.showAddTask = false
      }
      checkClickOutside(event,this.$refs.contRef,callBack)
    }
  },
  computed:mapState({
    user:state => state.user,
    team:state => state.team,
    project(state) {
      console.log(state.projects.projects,this.projectId)
      return state.projects.projects[this.projectId]
    },
    members(){
      let usernames = this.project.members.map(member=>member.username)
      return usernames.map(username =>this.team[username])
    },
    assignedMembers(){
      return this.members.filter(member=>this.task.assignedTo.includes(member.username))
    },
    filteredMembers(state){
      return this.members.filter(member=> {
        return (member.firstName.toLowerCase().
            includes(this.searchInp.toLocaleLowerCase())
            || member.lastName.toLowerCase().includes(this.searchInp.toLowerCase())) &&
            !this.task.assignedTo.includes(member.username)
      })

    }
  })
}
</script>

<style >
.subtask-list{
  @apply list-disc
}
.subtask-list input{
  @apply pl-2 w-full mt-2 h-5 flex items-center rounded-sm focus:outline-none border-0
}
.subtask-list li{
  @apply relative list-item
}
.subtask-list button{
  @apply h-8 w-8 absolute top-50% right-4

}

</style>
