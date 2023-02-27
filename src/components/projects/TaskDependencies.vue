<template>
  <div class="fixed top-0 bottom-0 w-screen-w left-0 bg-slate-600/50 z-10 flex items-center justify-center"
       @click="CheckClickOutside($event)">
    <div class="w-full max-w-500px max-h-screen-h-70 overflow-auto custom-scroll bg-white rounded-lg p-4 relative" ref="contRef">
      <button class="float-right h-5 w-5 text-gray-600" @click="$emit('HideModal')">
        <i class="fas fa-xmark"></i>
      </button>
      <h1 class="font-bold">Dependencies</h1>
      <div class="waiting-on border-[#FFCC00] border-1px border-l-2px p-2">
        <h3 class="font-semibold text-[#FFCC00]">Waiting on</h3>
        <p>Tasks that must be done before starting this one</p>
        <ul class="list-disk list-outside mx-4">
          <li class="list-disc flex justify-between hover:slate-100 w-full">
            <div>Task name</div>
            <button class="h-5 w-5 " @click="$emit('ManageWaitingOn')">
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
               @click="$emit('ManageWaitingOn',task.id)"
               v-for="task in filteredTasks"
          >
            {{task.name}}
          </div>
        </div>
      </div>
      <div class="waiting-on border-[#F74D4B] border-1px border-l-2px p-2 mt-4">
        <h3 class="font-semibold text-[#F74D4B]">Blocking</h3>
        <p>Tasks that cannot start before finidhing this one</p>
        <ul class="list-disk list-outside mx-4">
          <li class="list-disc flex justify-between hover:slate-100 w-full">
            Task name
            <button class="h-5 w-5 " @click="$emit('ManageBlocking')">
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
               @click="$emit('ManageWaitingOn',task.id)"
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

export default {
  name: "TaskDependencies",
  props:['waitingOn','blocking','projectId'],
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
    }
  },
  computed:mapState({
    tasks(tasks){
      //Filter for this project
      return []
    },
    filteredTasks(){
      return this.tasks.filter(task=>task.name.toLowerCase().includes(this.searchInp))
    }
  })
}
</script>

<style scoped>

</style>
