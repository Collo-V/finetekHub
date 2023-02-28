<template>
  <div class="fixed top-0 bottom-0 w-screen-w left-0 bg-slate-600/50 z-10 flex items-center justify-center"
       @click="CheckClickOutside($event)">
    <div class="w-full max-w-500px max-h-screen-h-70 overflow-auto custom-scroll bg-white rounded-lg p-4 relative"
         @click.stop
         ref="contRef">
      <button class="float-right h-5 w-5 text-gray-600" @click="$emit('HideModal')">
        <i class="fas fa-xmark"></i>
      </button>
      <h1 class="font-bold">Move subtask</h1>
      <div class="search-tasks mt-4">
        <div class="relative">
          <input type="text" class="w-full h-10 pl-4"
                 v-model="searchInp"
                 placeholder="search tasks"
          >
        </div>
        <div class="mt-2">
          <div class="hover:bg-slate-100 cursor-pointer h-6 flex items-center"
               @click="MoveSubtask(task)"
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
import {doc, updateDoc} from "firebase/firestore";
import {db} from "@/firebase";
import {Report} from "@/commons/swal";
import {checkClickOutside} from "@/commons/eventHandlers";

export default {
  name: "MoveSubtask",
  props:['taskId'],
  emits:['HideModal'],
  setup(){
    return{
      searchInp:''
    }
  },
  methods:{
    async MoveSubtask(task){
      try{
        await updateDoc(doc(db,'tasks',this.taskId),{
          subtaskFor:task.id,
          status:task.status
        })
        Report({icon:'success',title:'Subtask moved'})
        this.$emit('HideModal')
      } catch {
        Report({icon:'error',title:'Error moving subtask'})
      }
    },
    CheckClickOutside(event){
      checkClickOutside(event,this.$refs.contRef,this.$emit,'HideModal')
    }
  },
  computed:mapState({
    tasks:state => state.projects.tasks,
    task() {
      return this.tasks[this.taskId]
    },
    filteredTasks(){
      let tasks = Object.values(this.tasks)
      return tasks.filter(task=>{
        return !task.subtaskFor && task.id !== this.task.subtaskFor  &&
            task.name.toLowerCase().includes(this.searchInp)
      })
    }
  })
}
</script>

<style scoped>

</style>
