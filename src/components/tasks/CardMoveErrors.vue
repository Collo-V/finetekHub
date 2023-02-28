<template>
  <div class="fixed top-0 bottom-0 w-screen-w left-0 bg-slate-600/50 z-10 flex items-center justify-center"
       @click="CheckClickOutside($event)">
    <div class="w-full w-600px max-w-80% h-screen-h-70 p-10  bg-white rounded-lg relative overflow-hidden flex flex-col"
         ref="contRef">
      <button class="absolute top-0 right-0 m-4 h-5 w-5 text-gray-600 text-5" @click="$emit('HideModal')">
        <i class="fas fa-xmark"></i>
      </button>
      <div class="flex justify-center">
        <img :src="require('../../assets/images/icons/warning.svg')" alt="">
      </div>
      <div class="text-center">
        <h1 class="text-5 lg:text-6 text-primary-red">Are you sure about this?</h1>
        <p class="mt-4">This task has unresolved
          <span>dependencies</span>
<!--          <span>subtasks</span>-->
        </p>
      </div>
      <div class="mt-4" v-if="unresolvedTasks.length>0">
        <h3 class="font-semibold">
          <span>
            Waiting for {{unresolvedTasks.length}} unfinished task
            <span v-if="unresolvedTasks.length>1">s</span>
          </span>
        </h3>
        <ul class="list-outside mx-4">
          <li class="list-disc" v-for="task in tasks">
            {{task.name}}
          </li>
        </ul>
      </div>
      <div class="mt-4" v-if="unresolvedSubtasks.length>0">
        <h3 class="font-semibold">
          This task has {{unresolvedSubtasks.length}} subtask<span v-if="unresolvedSubtasks.length>1">s</span>
          have not been completed
        </h3>
        <ul class="list-outside mx-4">
          <li class="list-disc" v-for="task in subtasks">
            {{task.name}}
          </li>
        </ul>
      </div>
      <div class="mt-4">
        <button class="h-10 bg-green-500 text-white block w-full" @click="Resolve">
          Go back and resolve the issues
        </button>
        <button class="h-10 block w-full border-1px hover:bg-gray-300 mt-2" @click="Proceed">
          Continue without resolving
        </button>

      </div>

    </div>
  </div>

</template>

<script>
import {checkClickOutside} from "@/commons/eventHandlers";
import {mapState} from "vuex";
import {filterData} from "@/commons/objects";

export default {
  name: "CardMoveErrors",
  props:['unresolvedTasks','unresolvedSubtasks'],
  emits:['HideModal','Proceed','Resolve'],
  methods:{
    CheckClickOutside(event){
      checkClickOutside(event,this.$refs.contRef,this.Resolve,'HideModal')
    },
    Resolve(){
      this.$emit('HideModal')
      this.$emit('Resolve')
    },
    Proceed(){
      this.$emit('HideModal')
      this.$emit('Proceed')
    }
  },
  computed:mapState({
    tasks({projects:{tasks}}){
      return Object.values(tasks).filter(task=>this.unresolvedTasks.includes(task.id))
    },
    subtasks({projects:{tasks}}){
      let subtasks =Object.values(tasks).filter(task=>this.unresolvedSubtasks.includes(task.id))
      return subtasks
    }

  })
}
</script>

<style scoped>

</style>
