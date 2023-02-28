<template>
  <CardMoveErrors
      :unresolved-tasks="unresolvedTasks"
      :unresolved-subtasks="unresolvedSubtasks"
      @resolve="Resolve"
      @proceed="Resolve"
      @hide-modal="showUnresolvedErrors=false"
      v-if="showUnresolvedErrors"
  />
  <div class="h-full overflow-auto custom-scroll pb-10 max-w-full">
    <div class="header h-10 flex border-b-1px">

    </div>
    <div class="tasks-cont mt-4 relative h-full">
      <AddTask :project-id="projectId"/>
      <div class="absolute top-0 bottom-0 right-0 left-0">
        <div class="kanban flex gap-4 items-start overflow-x-auto custom-scroll max-w-full mb-10 min-h-full">
          <div class="backlog w-300px shrink-0 grid gap-4">
            <div class="header h-10 bg-white shadow-md flex justify-between items-center px-2">
              <span class="font-semibold">Backlog</span>
              <div class="flex gap-2 items-center">
                <button class="h-6 w-6 bg-primary/50">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <div class="grid gap-4">
              <Draggable
                  class="list-group min-h-10 backlog-list"
                  group="tasks"
                  id="Backlog-list"
                  :move="SeeMove"
                  @change="(change)=>SeeChange(change)"
                  :list="myTasks['Backlog']"
                  itemKey="id"
              >
                <template #item="{element:task,index}">
                  <div class="mb-2">
                    <TaskCard :task-id="task.id"/>
                  </div>
                </template>
              </Draggable>
            </div>
          </div>
          <div class="to-do w-300px shrink-0 grid gap-4">
            <div class="header h-10 bg-white shadow-md flex justify-between items-center px-2">
              <span class="font-semibold">To-do</span>
              <div class="flex gap-2 items-center">
                <button class="h-6 w-6 bg-primary/50">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <div class="grid gap-4">
              <Draggable
                  id="ToDo-list"
                  class="list-group min-h-200px to-do-list"
                  group="tasks"
                  :move="SeeMove"
                  @change="(change)=>SeeChange(change)"
                  :list="myTasks['ToDo']"
                  itemKey="id"
              >
                <template #item="{element:task,index}">
                  <div class="mb-2">
                    <TaskCard :task-id="task.id"/>
                  </div>
                </template>
              </Draggable>
            </div>
          </div>
          <div class="progress w-300px shrink-0 grid gap-4">
            <div class="header h-10 bg-white shadow-md flex justify-between items-center px-2">
              <span class="font-semibold">In progress</span>
              <div class="flex gap-2 items-center">
                <button class="h-6 w-6 bg-primary/50">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <div class="grid gap-4">
              <Draggable
                  id="InProgress-list"
                  class="list-group min-h-10"
                  group="tasks"
                  :list="myTasks['InProgress']"
                  :move="SeeMove"
                  @change="(change)=>SeeChange(change)"
                  itemKey="id"
              >
                <template #item="{element:task,index}">
                  <div class="mb-2">
                    <TaskCard :task-id="task.id"/>
                  </div>
                </template>
              </Draggable>
            </div>
          </div>
          <div class="progress w-300px shrink-0 grid gap-4">
            <div class="header h-10 bg-white shadow-md flex justify-between items-center px-2">
              <span class="font-semibold">Completed</span>
              <div class="flex gap-2 items-center">
<!--                <button class="h-6 w-6 bg-primary/50">-->
<!--                  <i class="fas fa-plus"></i>-->
<!--                </button>-->
              </div>
            </div>
            <div class="grid gap-4">
              <Draggable
                  id="Completed-list"
                  class="list-group min-h-10"
                  group="tasks"
                  :list="myTasks['Completed']"
                  :move="SeeMove"
                  @change="(change)=>SeeChange(change)"
                  itemKey="id"
              >
                <template #item="{element:task,index}">
                  <div class="mb-2">
                    <TaskCard :task-id="task.id"/>
                  </div>
                </template>
              </Draggable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mapState} from "vuex";
import TaskCard from "@/components/tasks/TaskCard";
import Draggable from 'vuedraggable'
import AddTask from "@/components/tasks/AddTask";
import {filterData} from "@/commons/objects";
import {doc, updateDoc,deleteField} from "firebase/firestore";
import {db} from "@/firebase";
import {Report} from "@/commons/swal";
import CardMoveErrors from "@/components/tasks/CardMoveErrors";
import firebase from "firebase/compat";

export default {
  name: "Tasks" ,
  props:['projectId'],
  components: {
    CardMoveErrors,
    AddTask,
    TaskCard,
    Draggable,
  },
  data(){
    return{
      myTasks:{
        Backlog:[],
        ToDo:[],
        InProgress:[],
        Completed:[],
      },
      tempAdded:undefined,
      tempRemoved:undefined,
      tempTargetList:undefined,
      showUnresolvedErrors:false,
      unresolvedTasks:[],
      unresolvedSubtasks:[],
    }
  },
  methods:{
    Resolve(){
      let tasks = Object.values(this.tasks)
      if(this.projectId){
        tasks = tasks.filter(task=>task.projectId === this.projectId && !task.subtaskFor)
      }
      this.myTasks.Backlog = filterData(tasks,['status','==','Backlog'])
      this.myTasks.ToDo = filterData(tasks,['status','==','ToDo'])
      this.myTasks.InProgress = filterData(tasks,['status','==','InProgress'])
      this.myTasks.Completed = filterData(tasks,['status','==','Completed'])
    },
    SeeMove(event){
      this.tempTargetList = event.to.id.replace('-list','')
    },
    async SeeChange(change) {
      console.log(this.tempTargetList)
      if (change.added) {
        this.unresolvedTasks = []
        this.unresolvedSubtasks = []
        let task = change.added.element
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
      }
    }
  },
  computed:mapState({
    tasks(state){
      console.log('changed')
      let tempTasks = state.projects.tasks
      let tasks = Object.values(tempTasks)
      if(this.projectId){
        tasks = tasks.filter(task=>task.projectId === this.projectId && !task.subtaskFor)
      }
      this.myTasks.Backlog = filterData(tasks,['status','==','Backlog'])
      this.myTasks.ToDo = filterData(tasks,['status','==','ToDo'])
      this.myTasks.InProgress = filterData(tasks,['status','==','InProgress'])
      this.myTasks.Completed = filterData(tasks,['status','==','Completed'])
      // tempTasks['InProgress'] = filterData(tasks,['status','==','InProgress'])
      // tempTasks['ToDo'] = filterData(tasks,['status','==','ToDo'])
      // tempTasks['Completed'] = filterData(tasks,['status','==','Completed'])
      // this.myTasks = {...tempTasks}
      // console.log(tempTasks)
      // return tempTasks
      return tempTasks
    }
  }),
  mounted() {
    this.tasks
  }
}
</script>

<style scoped>
.sortable-ghost{
  @apply opacity-50 cursor-grab
}

</style>
