<template>
  <div class="fixed top-0 bottom-0 w-screen-w left-0 bg-slate-600/50 z-10 flex items-center justify-center"
       @click="CheckClickOutside($event)">
    <TaskDependencies
        v-if="showDependencies"
        :project-id="thisTask.projectId"
        :task-id="taskId"
        :blocking="task.blocking"
        :waiting-on="task.waitingOn"
        @hide-modal="showDependencies = false"
    />
    <CardMoveErrors
        :unresolved-tasks="unresolvedTasks"
        :unresolved-subtasks="unresolvedSubtasks"
        @resolve=""
        @proceed=""
        @hide-modal="showUnresolvedErrors=false"
        v-if="showUnresolvedErrors"
    />
    <div class="w-full max-w-95% 2xl:max-w-80% h-screen-h-80  bg-white rounded-lg relative overflow-hidden" ref="contRef" id="taskpane-modal">
      <div class="h-10 flex items-center justify-between bg-slate-100 px-8">
        <div>
          On project {{project.name}}
        </div>
        <button class="h-5 w-5 text-gray-600" @click="$emit('HideModal')">
          <i class="fas fa-xmark"></i>
        </button>
      </div>
      <div class="grid lg:flex h-full">
        <div class="w-full h-full border-r-1px">
          <div class="h-16 border-b-1px flex items-center px-8 gap-4">
            <div class="w-fit flex flex-col items-center gap-2 relative dropdown-cont">
              <div :class="'status-' +task.status+
                  ' w-fit h-8 border-1px rounded-sm flex items-center justify-center'">
                <Tooltip
                    position="top"
                    :title="'Mark as '+ statuses[statuses.indexOf(task.status)-1]"
                >
                  <button
                      class="h-8 w-6 border-r-1px"
                      v-if="statuses.indexOf(task.status)!==0 && isEditable"
                      @click="[tempTargetList = statuses[statuses.indexOf(task.status)-1],
                      SeeChange({added:{element:thisTask}}) ]"
                  >
                    <i class="fas fa-angle-left"></i>
                  </button>
                </Tooltip>
                <span class="px-1">{{task.status}}</span>

                <Tooltip
                    position="top"
                    :title="'Mark as '+ statuses[statuses.indexOf(task.status)+1]"
                >
                  <button
                      class="h-8 w-6 border-l-1px "
                      v-if="statuses.indexOf(task.status)!==statuses.length-1 && isEditable"
                      @click="[tempTargetList = statuses[statuses.indexOf(task.status)+1],
                      SeeChange({added:{element:thisTask}}) ]"
                  >
                    <i class="fas fa-angle-right"></i>
                  </button>
                </Tooltip>
              </div>
<!--              <div class="gap-2 dropdown absolute top-0 left-full grid vue-shadow rounded-md overflow-hidden bg-white z-1">-->
<!--                <button class="w-120px hover:bg-slate-100">-->
<!--                  <i class="fas fa-arrow-left"></i>-->
<!--                  Backlog-->
<!--                </button>-->
<!--                <button class="w-120px hover:bg-slate-100">-->
<!--                  In progress-->
<!--                  <i class="fas fa-arrow-right"></i>-->
<!--                </button>-->
<!--              </div>-->
            </div>
            <div class="assigned-to flex relative ml-4 items-center -space-x-2 ">
              <span v-if="assignedMembers.length>0" class=" flex relative ml-4 items-center -space-x-2 ">
                <span v-for="member in assignedMembers" class="relative dropdown-cont shrink-0">
                <button class="h-5 w-5 absolute top-0 left-50% vh-center bg-white dropdown
                rounded-full z-1 hover:bg-primary-purple hover:text-white shadow"
                        @click="ManageAssigned(member.username)"
                        v-if="isOwnerEditable"
                >
                  <i class="fas fa-xmark"></i>
                </button>
                <Avatar
                    size="medium" rounded="true"
                    :image="member.image" :name="member.firstName"
                    class="bg-white"
                />
              </span>
                <button class="w-10 h-10 border-dotted border-1px rounded-full -ml-2"
                        v-if="isOwnerEditable"
                        @click="showMemberAssign = !showMemberAssign"
                >
                  <i class="fas fa-user-plus"></i>
                </button>
              </span>
              <span v-else>Not assigned</span>
              <span v-if="showMemberAssign">
                <div class="fixed top-0 popup-overlay left-0 w-screen-w h-screen-h" @click="showMemberAssign = false"></div>
              <div class="members absolute top-0 left-full w-fit bg-white z-1
              vue-shadow rounded-md h-fit min-h-200px min-w-200px">
                <div class="p-1">
                  <input type="text" class="w-full h-8"
                         placeholder="search members"
                         v-model="searchInp">
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
            <span class="block h-10 bg-slate-400 w-1px"></span>
            <div class="relative">
              <Tooltip
                  placement="top"
                  overlayClassName="mr-2"
                  title="Task priority"
              >
                <button class="h-10 w-10 rounded-full border-dotted border-1px"
                        v-if="isEditable"
                        @click="showPriorities = !showPriorities">
                  <PriorityFlag :priority="task.priority"/>
                </button>
                <button class="h-10 w-10 rounded-full border-dotted border-1px"
                        v-else>
                  <PriorityFlag :priority="task.priority"/>
                </button>
              </Tooltip>
              <span v-if="showPriorities">
                <div class="fixed top-0 popup-overlay left-0 w-screen-w h-screen-h" @click="showPriorities = false"></div>
              <div class="members absolute top-0 left-full w-fit bg-white z-1
              vue-shadow rounded-md h-fit min-w-200px overflow-hidden">
                <div class="h-8 hover:bg-slate-100 cursor-pointer flex items-center px-2 gap-2"
                     v-for="(p,index) in priorities" @click="ChangePriority(index+1)">
                  <PriorityFlag :priority="index+1"/> {{p}}
                </div>
              </div>
              </span>
            </div>
            <span class="block h-10 bg-slate-400 w-1px"></span>
            <Tooltip
                placement="top"
                overlayClassName="mr-2"
                title="Task dependencies"
            >
              <button class="h-10 w-10 rounded-full border-dotted border-1px"
                      v-if="isEditable"
                      @click="showDependencies = !showDependencies">
                <i class="fa-solid fa-bars-staggered"></i>
              </button>
            </Tooltip>


          </div>
          <div class="mt-4 px-8">
            <div class="flex flex-col gap-3 mb-3 -ml-4">
              <fieldset class="h-10 w-full relative">
                <input class="form-input text-6 font-bold w-full h-10 flex items-center rounded-sm focus:border-1px border-0"
                       id="name"
                       @blur="RenameTask($event,task.id)"
                       @keyup.enter="RenameTask($event,task.id)"
                       :readonly="!isOwnerEditable"
                       v-model="task.name">
              </fieldset>
              <fieldset class="h-10 w-full relative">
                <input class="form-input w-full h-10 flex items-center rounded-sm focus:border-1px optional border-0"
                       id="lastName" v-model="task.description"
                       v-if="isEditable"
                       @blur="Validate($event.target.id)">
              </fieldset>
            </div>
            <Subtasks :task-id="taskId" :is-editable="isEditable" />
            <div class="mt-4">
              <h2 class="font-semibold">Dependencies</h2>
              <div class="mt-2 flex flex-wrap gap-2">
                  <span class="inline-block w-fit h-fit px-1 rounded-sm bg-[#FFCC00]/25" v-for="task in task.waitingOn">
                    Waiting on  <span class="text-[#FFCC00]"> {{tasks[task].name}}</span>
                  </span>
                  <span class="inline-block h-fit  w-fit px-1 rounded-sm bg-[#F74D4B]/25" v-for="task in task.blocking">
                    Blocking  <span class="text-[#F74D4B]"> {{tasks[task].name}}</span>
                  </span>
                <Tooltip
                    placement="top"
                    overlayClassName="mr-2"
                    title="Add dependencies"
                >
                  <button class="h-6 w-6 rounded-full border-dotted border-1px"
                          v-if="isOwnerEditable"
                          @click="showDependencies = !showDependencies">
                    <i class="fa-solid fa-bars-staggered"></i>
                  </button>
                </Tooltip>
              </div>
            </div>

          </div>
        </div>
        <div class="w-full h-full">
          <div class="h-16 border-b-1px flex items-center px-8 gap-4">
            <Tooltip
                position="top"
            >
              <template #title>
                <div class='grid gap-1 text-3 text-center'>
                  <span class="uppercase">Created BY</span>
                  <span class="relative dropdown-cont">
                {{GetName(task.createdBy)}}
                <span class="absolute top-full left-50% h-center dropdown text-black">
                  <MemberCard :username="task.createdBy"/>
                </span>
              </span>
                </div>
              </template>
              <div class='grid gap-1 text-3 text-center'>
                <span class="text-gray-600 uppercase">Created</span>
                <span>{{ moment((new Date(task.created))).subtract(6, 'days').calendar() }}</span>

              </div>
            </Tooltip>
            <span class="block h-10 bg-slate-400 w-1px"></span>
            <div class='grid gap-1 text-3 text-center justify-center'>
              <span class="text-gray-600 uppercase">Time frame</span>
              <span>
                <button class="border-dotted h-8 w-8 rounded-full border-1px mx-auto" @click="showDates = true">
                <i class="fas fa-calendar"></i>
              </button>
              <span class="relative inline-block" v-if="showDates">
                <div class="fixed top-0 popup-overlay left-0 w-screen-w h-screen-h" @click="showDates = false"></div>
                <div class="w-fit z-1 w-250px h-fit bg-white absolute top-full left-50% h-center">
                  <div>
                    <RangePicker
                        v-model:value="dates" :ranges="ranges"
                        :allow-clear="isOwnerEditable"
                        :input-read-only="isOwnerEditable"
                    />
                  </div>
                  <div>
                    <TimePicker
                        v-model:value="startTime"
                        use12-hours format="h:mm a" placeholder="start time"
                        :allow-clear="isOwnerEditable"
                        :input-read-only="isOwnerEditable"
                    />
                    <TimePicker
                        v-model:value="endTime"
                        use12-hours format="h:mm a"
                        placeholder="end time"
                        :allow-clear="isOwnerEditable"
                        :input-read-only="isOwnerEditable"
                    />
                  </div>
              </div>
              </span>
              </span>
            </div>
            <span class="block h-10 bg-slate-400 w-1px"></span>
            <div class='grid gap-1 text-3 text-center'>
              <span class="text-gray-600 uppercase">Due date</span>
              <span class="relative dropdown-cont" v-if="task.plannedEndDate">
                {{ moment(GetTime(task.plannedEndDate,task.plannedEndTime)).calendar() }}
              </span>
              <span v-else>Not set</span>
              </div>
          </div>
         <TaskActivities :task-id="taskId"/>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import {mapState} from "vuex";
import {taskMethods} from '@/components/tasks/AddTask'
import PriorityFlag from "@/components/tasks/PriorityFlag";
import {validateInp} from "@/commons";
import {Tooltip} from "ant-design-vue";
import TaskDependencies from "@/components/tasks/TaskDependencies";
import {ref} from "vue";
import {checkClickOutside} from "@/commons/eventHandlers"
import moment, {Moment} from "moment";
import {RangePicker,TimePicker} from "ant-design-vue";
import {addDoc, deleteField, doc, updateDoc} from "firebase/firestore";
import {db, dbTaskActivities, dbTasks} from "@/firebase";
import {filterData} from "@/commons/objects";
import Subtasks, {RenameTask} from "@/components/tasks/Subtasks";
import MemberCard from "@/components/MemberCard";
import TaskActivities from "@/components/tasks/TaskActivities";
import firebase from "firebase/compat";
import CardMoveErrors from "@/components/tasks/CardMoveErrors";

export function GetTime(date,time){
  if(!date)return
  let tempDate = (new Date(moment(date).format('L'))).getTime()
  if(time){
    let today = (new Date(moment(time).format('L'))).getTime()
    let tempTime = (new Date(time)).getTime()
    time = tempTime-today
    tempDate+=time
  }
  return tempDate
}
export async function SeeChange(change) {
  if (change.added) {
    this.unresolvedTasks = []
    this.unresolvedSubtasks = []
    let task = change.added.element
    let isEditable = task.createdBy === this.user.username
        || task.assignedTo.includes(this.user.username)
    if(!isEditable){
      if(this.myTasks){//for drag method
        try{
          this.Resolve()
        }catch {}
      }
      return
    }
    if (this.tempTargetList === 'InProgress') {
      let dependencies = task.waitingOn
      for (let i = 0; i < dependencies.length; i++) {
        let dependency = this.tasks[dependencies[i]]
        if (dependency.status !== 'Completed') {
          this.unresolvedTasks.push(dependency.id)
        }
      }
      if (this.unresolvedTasks.length > 0) {
        this.showUnresolvedErrors = true
        return
      }
    } else if (this.tempTargetList === 'Completed') {
      let dependencies = task.waitingOn
      for (let i = 0; i < dependencies.length; i++) {
        let dependency = this.tasks[dependencies[i]]
        if (dependency.status !== 'Completed') {
          this.unresolvedTasks.push(dependency.id)
        }
      }
      let subtasks = Object.values(this.tasks).filter(subtask => subtask.subtaskFor === task.id)
      for (let i = 0; i < subtasks.length; i++) {
        let subtask = subtasks[i]
        if (subtask.status !== 'Completed') {
          this.unresolvedSubtasks.push(subtask.id)
        }
      }
      if (this.unresolvedSubtasks.length > 0 || this.unresolvedSubtasks.length > 0) {
        this.showUnresolvedErrors = true
        return
      }
    }
    let updates = {
      status: this.tempTargetList,
    }
    if(task.status === 'Completed') {
      task['completed'] = deleteField()
    }else if(this.tempTargetList === 'Completed') {
      task['completed'] = firebase.firestore.FieldValue.serverTimestamp()
    }
    if(this.tempTargetList === 'InProgress' && (task.status === 'Backlog' ||task.status === 'ToDo')){
      task['started'] = firebase.firestore.FieldValue.serverTimestamp()
    }
    if(this.tempTargetList === 'InProgress' && (task.status === 'Backlog' ||task.status === 'ToDo')){
      task['completed'] = firebase.firestore.FieldValue.serverTimestamp()
    }
    try{
      await updateDoc(doc(db, 'tasks', task.id), updates)
      console.log('done')
    }catch {}
    addDoc(dbTaskActivities, {
      actor: this.user.username,
      taskId: task.id,
      activity: 'ChangeTaskStatus',
      time: firebase.firestore.FieldValue.serverTimestamp(),
      value:updates.status
    }).catch()
  }
}

export default {
  name: "TaskPane",
  components: {
    TaskActivities,
    MemberCard,
    Subtasks,
    Avatar,
    PriorityFlag,
    Tooltip,RangePicker,
    TimePicker,
    TaskDependencies ,
    CardMoveErrors,
  },
  props:['taskId'],
  emits:['HideModal'],
  data(){
    return{
      showMemberAssign:false,
      showPriorities:false,
      showDependencies:false,
      showDates:false,

      moment,
      time:'',
      searchInp:'',
      tempTargetList:undefined,
      unresolvedSubtasks:[],
      unresolvedTasks:[],
      showUnresolvedErrors:false,
      task:{
        name:'Doing this',
        description:'A little',
        assignedTo:[],
        subtasks:[],
        priority:3,
        blocking:[],
        waitingOn:[],
      } ,
      dates: false,
      startTime:ref<Moment | undefined>(undefined),
      endTime:ref<Moment | undefined>(undefined),
      ranges: { Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] },
    }
  },
  watch:{
    async dates(dates){
      try{
        if(dates){
          let plannedStartDate = dates[0].$d.getTime()
          let plannedEndDate = dates[0].$d.getTime()
          await updateDoc(doc(db,'tasks',this.taskId),{
            plannedStartDate,
            plannedEndDate
          })
        }else{
          await updateDoc(doc(db,'tasks',this.taskId),{
            plannedStartDate:deleteField(),
            plannedEndDate:deleteField()
          })
        }
      }catch {}
    },
    async startTime(time){
      if(time){
        try{
          await updateDoc(doc(db,'tasks',this.taskId),{
            plannedStartTime:time.$d.getTime()
          })
        }catch {}
      }
      else{
       try{
         await updateDoc(doc(db,'tasks',this.taskId),{
           plannedStartTime:deleteField()
         })
       }catch {}
      }
    },
    async endTime(time){
      if(time){
        try{
          await updateDoc(doc(db,'tasks',this.taskId),{
            plannedEndTime:time.$d.getTime()
          })
        }catch {}
      }else{
        try{
          await updateDoc(doc(db,'tasks',this.taskId),{
            plannedStartTime:deleteField()
          })
        }catch {}
      }
    }
  },
  methods:{
    ...taskMethods,
    RenameTask,
    SeeChange,
    async ChangePriority(priority){
      await updateDoc(doc(db,'tasks',this.taskId),{
        priority
      })
      addDoc(dbTaskActivities, {
        actor: this.user.username,
        taskId: this.taskId,
        activity: 'ChangeTaskPriority',
        time: firebase.firestore.FieldValue.serverTimestamp(),
        value:priority
      }).catch()
    },
    Validate(id){
      validateInp(id)
    },
    GetTimeFrame(date,time){
      time = this.GetTime(date,time)
      console.log(time)
      return
      moment(GetTime(task.plannedStartDate,task.plannedStartTime)).calendar()
    },
    GetTime,
    GetName(username){
      return !this.team[username]?'':`${this.team[username].firstName} ${this.team[username].lastName}`
    },
    CheckClickOutside(event){
      checkClickOutside(event,this.$refs.contRef,this.$emit,'HideModal')
    }
  },
  computed:mapState({
    team:state => state.team,
    priorities:state => state.projects.taskPriorities,
    statuses:state => state.projects.taskStatuses,
    user:state => state.user,
    isEditable(){
      return this.task.createdBy === this.user.username
          || this.task.assignedTo.includes(this.user.username)
    },
    isOwnerEditable(){
      return this.task.createdBy === this.user.username
    },
    thisTask({projects:{tasks}}){
      let task =tasks[this.taskId]
      this.task = {...task}
      if(task.plannedStartDate){
        this.dates = [moment(task.plannedStartDate),moment(task.plannedEndDate)]
      }
      if(task.plannedStartTime){
        this.startTime = moment(task.plannedStartTime)
      }
      if(task.plannedEndTime){
        this.endTime = moment(task.plannedEndTime)
      }
      return task
    },
    tasks:state => state.projects.tasks,
    project({projects: {projects}}) {
     return  projects[this.thisTask.projectId]
    },
    subtasks(state){
      return filterData(this.tasks,['subtaskFor','==',this.taskId])
    },
    members(state){
      return  Object.values(this.team)
      // return usernames.map(username =>this.team[username])
    },
    assignedMembers(state){
      let usernames = this.task.assignedTo
      return usernames.map(username=>state.team[username])
      // return state.team

    },
    filteredMembers(state){
        console.log(this.members)
      return this.members.filter(member=> {
        return (member.firstName.toLowerCase().
                includes(this.searchInp.toLocaleLowerCase())
                || member.lastName.toLowerCase().includes(this.searchInp.toLowerCase())) &&
            !this.task.assignedTo.includes(member.username)
      })

    }
  }),
  mounted() {
    this.thisTask
    console.log(this.dates)
  }
}
</script>

<style scoped>
.status-ToDo{
  @apply bg-slate-100/50

}
.status-InProgress{
  @apply bg-primary/50 text-primary
}
.status-Completed{
  @apply bg-green-500/50 text-green-500
}


</style>
