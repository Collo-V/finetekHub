<template>
  <div v-if="task">
    <TaskPane :task-id="taskId" v-if="showTaskPane" @hide-modal="showTaskPane = false"/>
    <div class="shadow-md bg-white py-4 relative rounded-md" @click="showTaskPane = true">
      <div class="float-right relative dropdown-cont w-fit px-4">
        <button class="h-6 w-6">
          <i class="fas fa-ellipsis-vertical"></i>
        </button>
        <div class="dropdown absolute w-150px top-0 left-full bg-white shadow-md">
          <button class="inline-block h-8 text-left w-full px-4 hover:bg-slate-100"></button>
          <button class="inline-block h-8 text-left w-full px-4 hover:bg-slate-100"></button>
          <button class="inline-block h-8 text-left w-full px-4 hover:bg-slate-100"></button>
        </div>
      </div>
      <div class="flex gap-4 px-4">
        <span v-if="task.projectId" class="text-3 itelics ">
          {{ projects[task.projectId].name }}
        </span>
<!--      <span v-for="index in 2" class="text-3">-->
<!--        <span class="inline-block w-fit px-2 rounded-pill bg-green-500 text-white" v-if="index === 1">-->
<!--          Category-->
<!--        </span>-->
<!--        <span class="inline-block w-fit px-2 rounded-pill bg-orange-500 text-white" v-else>-->
<!--          Category-->
<!--        </span>-->
<!--      </span>-->
      </div>
      <div class="mt-2 px-4">
        <h3 class="font-bold">
          {{task.name}}
        </h3>

        <span class="inline-block mt-1 whitespace-nowrap max-w-200px text-ellipsis">
        {{ task.description }}
      </span>
      </div>
      <div class="subtaks px-4" v-if="subtasks.length>0">
        <h3 class="font-semibold text-14px">
          Subtasks
        </h3>
        <ul class="list-none">
          <li v-for="subtask in subtasks.slice(0,3)" :key="subtask" class="flex gap-2">
            <button class="h-5 w-5 rounded-full border-1px border-slate-400 bg-slate-400" v-if="subtask === 1" @click="">
              <i class="fas fa-check"></i>
            </button>
            <button class="h-5 w-5 rounded-full border-1px border-slate-400" v-else @click="">
            </button>
            <span>{{subtask.name}}</span>
          </li>
        </ul>
      </div>
      <div class="border-t-1px px-2 py-2 pb-0 min-h-8">
        <div class="flex justify-between">
          <div class="flex members mx-4 -space-x-2">
            <Avatar
                v-for="member in assignedTo"
                :name="member.firstName"
                :image="member.image"
                rounded="true" size="small"
                class="bg-white"
            />
          </div>
          <span class="block cursor-pointer">
            <Tooltip position="top" :title="'Priority: '+priorities[task.priority-1]">
              <PriorityFlag :priority="task.priority"/>
            </Tooltip>
          </span>
          <div>
            <div class="" v-if="task.plannedEndDate">
            <span v-if="dueDate < time" class="text-red-500">
              Due {{ moment(dueDate).fromNow() }}
            </span>
              <span v-else-if="dueDate < time+1800000" class="text-primary-yellow font-bold">
              Due {{ moment(dueDate).fromNow() }}
            </span>
              <span v-else>
              Due {{ moment(dueDate).fromNow() }}
            </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Avatar from "@/components/Avatar";
import TaskPane, {GetTime} from "@/components/tasks/TaskPane";
import {mapState} from "vuex";
import {filterData} from "@/commons/objects";
import moment from "moment";
import PriorityFlag from "@/components/tasks/PriorityFlag";
import {Tooltip} from "ant-design-vue";
export default {
  name: "TaskCard",
  components: {
    PriorityFlag,
    TaskPane,
    Avatar,
    Tooltip
  },
  props:['taskId'],
  data(){
    return{
      showTaskPane:false,
      moment,
      interval:'',
    }
  },
  methods:{
    GetTime,
  },
  computed:mapState({
    time:state => state.time,
    team:state => state.team,
    priorities:state => state.projects.taskPriorities,
    projects:state => state.projects.projects,
    task(state) {
      return state.projects.tasks[this.taskId]
    },
    subtasks({projects:{tasks}}){
      let subtasks = filterData(tasks,['subtaskFor','==',this.taskId])
      return Object.values(subtasks)
    },
    assignedTo(){
      return this.task.assignedTo.map(username=>this.team[username])
    },
    dueDate(){
      return this.GetTime(this.task.plannedEndDate,this.task.plannedEndTime)
    }
  }),
  mounted() {
  }
}
</script>

<style scoped>

</style>
