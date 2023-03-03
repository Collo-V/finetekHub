<template>
  <div class="fixed top-0 bottom-0 w-screen-w left-0 bg-slate-600/50 z-10 flex items-center justify-center"
       @click="CheckClickOutside($event)">
    <div class="w-full max-w-500px max-h-screen-h-70 overflow-auto custom-scroll bg-white rounded-lg p-4 relative"
         @click.stop
         ref="contRef">
      <button class="float-right h-5 w-5 text-gray-600" @click="$emit('HideModal')">
        <i class="fas fa-xmark"></i>
      </button>
      <h1 class="font-bold">Dependencies</h1>
      <div class="waiting-on border-[#FFCC00] border-1px border-l-2px p-2">
        <h3 class="font-semibold text-[#FFCC00]">Waiting on</h3>
        <p>Tasks that must be done before starting this one</p>
        <ul class="list-disk list-outside mx-4">
          <li class="list-disc list-item hover:bg-slate-100 w-full relative" v-for="task in waitingOn">
            <div>{{tasks[task].name}}</div>
            <button class="h-5 w-5 absolute top-0 right-0 " @click="ManageWaitingOn(task)">
              <i class="fas fa-xmark"></i>
            </button>
          </li>
          <div class="mt-2">
            <button class="w-fit text-primary" @click="[searchInp = '',searchView = 'waitingOn']">
              <i class="fas fa-plus"></i>
              Add a waiting on task
            </button>
          </div>
        </ul>
      </div>
      <div class="search-tasks mt-4" v-if="searchView==='waitingOn'">
        <div class="relative">
          <input type="text" class="w-full h-10 pl-4"
                 v-model="searchInp"
                 placeholder="search tasks"
          >
          <button class="absolute top-0 bottom-0 right-0 w-100px bg-primary text-white"
                  @click="$emit('HideModal')"
          >
            Done
          </button>
        </div>
        <div class="mt-2">
          <div class="hover:bg-slate-100 cursor-pointer h-6 flex items-center"
               @click="ManageWaitingOn(task.id)"
               v-for="task in filteredTasks"
          >
            {{task.name}}
          </div>
        </div>
      </div>
      <div class="waiting-on border-[#F74D4B] border-1px border-l-2px p-2 mt-4">
        <h3 class="font-semibold text-[#F74D4B]">Blocking</h3>
        <p>Tasks that cannot start before finishing this one</p>
        <ul class="list-disk list-outside mx-4">
          <li class="list-disc list-item hover:bg-slate-100 w-full relative" v-for="task in blocking">
            <div>{{tasks[task].name}}</div>
            <button class="h-5 w-5 absolute top-0 right-0 " @click="ManageBlocking(task)">
              <i class="fas fa-xmark"></i>
            </button>
          </li>
        </ul>
        <div class="mt-2">
          <button class="w-fit text-primary" @click="[searchInp = '',searchView = 'blocking']">
            <i class="fas fa-plus"></i>
            Add a blocking task
          </button>
        </div>
      </div>
      <div class="search-tasks mt-4" v-if="searchView==='blocking'">
        <div class="relative">
          <input type="text" class="w-full h-10 pl-4" v-model="searchInp" placeholder="search tasks">
          <button class="absolute top-0 bottom-0 right-0 w-100px bg-primary text-white"
                  @click="$emit('HideModal')"
          >
            Done
          </button>
        </div>
        <div class="mt-2">
          <div class="hover:bg-slate-100 cursor-pointer h-6 flex items-center"
               @click="ManageBlocking(task.id)"
               v-for="task in filteredTasks"
          >
            {{task.name}}
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import {mapState} from "vuex";
import {filterData, removeFromArray} from "@/commons/objects";
import {addDoc, doc, updateDoc} from "firebase/firestore";
import {db, dbTaskActivities} from "@/firebase";
import firebase from "firebase/compat";

export default {
  name: "TaskDependencies",
  props:['waitingOn','blocking','projectId','taskId'],
  emits:['ManageWaitingOn','ManageBlocking','HideModal'],
  data(){
    return{
      searchInp:'',
      searchView:undefined,
    }
  },
  methods:{
    CheckClickOutside(event){
      let target = event.target
      let isOutside = this.$refs.contRef && !this.$refs.contRef.contains(target) &&
          target.tagName !== 'BUTTON' && target.parentNode.tagName !== 'BUTTON'


      if(isOutside){
        this.$emit('HideModal')
      }
    },
    async ManageWaitingOn(id){
      if(this.taskId){
        let waitingOn = this.tasks[this.taskId].waitingOn
        let activity
        if(waitingOn.includes(id)){
          activity = 'RemoveWaitingOn'
          waitingOn = removeFromArray(waitingOn,id)
        }else {
          activity = 'SetWaitingOn'
          waitingOn.push(id)
        }
        console.log(waitingOn)
        await updateDoc(doc(db, 'tasks', this.taskId), {
          waitingOn
        })
        addDoc(dbTaskActivities, {
          actor: this.user.username,
          taskId: this.taskId,
          activity,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          value:id
        }).catch()

      } else {
        this.$emit('ManageWaitingOn',id)
      }
    },
    async ManageBlocking(id){
      if(this.taskId){
        let blocking = this.tasks[this.taskId].blocking
        let activity
        if(blocking.includes(id)){
          activity = 'Remove Blocking'
          blocking = removeFromArray(blocking,id)
        }else {
          activity = 'SetBlocking'
          blocking.push(id)
        }
        updateDoc(doc(db,'tasks',this.taskId),{
          blocking
        })
        addDoc(dbTaskActivities, {
          actor: this.user.username,
          taskId: this.taskId,
          activity,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          value:id
        }).catch()

      } else {
        this.$emit('ManageBlocking',id)
      }
    },
  },
  computed:mapState({
    user:state => state.user,
    tasks({projects}){
      let tasks = projects.tasks
      if(this.projectId){
        tasks = filterData(tasks,['projectId','==',this.projectId])
      }
      tasks = filterData(tasks,['status','!=','Completed'])
      return tasks
    },
    task(state){
      return state.projects.tasks[this.taskId]
    },
    filteredTasks(){
      let excluded =[...this.waitingOn,...this.blocking]
      let tasks = Object.values(this.tasks)
      if(this.task){
        let tempExcluded =
            tasks.filter(task=>task.subtaskFor === this.taskId || task.id === this.taskId)
        .map(task=>task.id)
        excluded = excluded.concat(tempExcluded)
      }
      tasks = tasks.filter(task=>!excluded.includes(task.id))
      return tasks.filter(task=>task.name.toLowerCase().includes(this.searchInp))
    }
  }),
  mounted() {
  }
}
</script>

<style scoped>

</style>
