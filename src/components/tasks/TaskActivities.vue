<template>
  <div class="mt-4 px-8">
    <h3 class="font-semibold ">Activities</h3>
    <ul>
      <li v-for="activity in activities" class="flex justify-between">
        <span>
          <span class="relative dropdown-cont mr-1">
            <span class="text-primary cursor-pointer">{{GetName(activity.actor)}}</span>
            <span class="absolute top-full left-50% h-center dropdown z-2">
              <MemberCard :username="activity.actor"/>
            </span>
          </span>
          <span v-if="activity.activity === 'ChangeTaskPriority'">
            {{GetTitle(activity)}}
            <PriorityFlag :priority="activity.value"/> {{priorities[activity.value-1]}}
          </span>
          <span v-else>
            {{GetTitle(activity)}}
          </span>
        </span>
        <span>
          {{moment(activity.time).fromNow(time)}}
        </span>
      </li>
    </ul>
  </div>

</template>

<script>
import {mapState} from "vuex";
import {filterData, sortData} from "@/commons/objects";
import MemberCard from "@/components/MemberCard";
import moment from "moment";
import PriorityFlag from "@/components/tasks/PriorityFlag";

export default {
  name: "TaskActivities",
  components: {PriorityFlag, MemberCard},
  data(){
    return{
      moment
    }
  } ,
  props:['taskId'],
  methods:{
    GetTitle(activity){
      let activityDict = {
        1: {name:'CreateTask',title:'created this task'},
        2: {name:'ChangeTaskStatus',title:`marked this task as ${activity.value}`},
        3: {
          name:'ChangeTaskPriority',
          title:`set the priority of this task to`
        },
        4: {name:'ChangeTaskStatus',title:`marked this subtask as ${activity.value}`},
        5: {name:'SetDueDate',title:`set this task's due date to ${activity.value}`},
        6: {name:'RemoveDueDate',title:"removed this task's due date"},
        7: {name:'AssignTo',title:`assigned this task to ${this.GetName(activity.value)}`},
        8: {name:'AddSubtask',title:`created subtask '${this.GetSubtaskName(activity.subtaskId)}'`},
        9: {name:'ChangeSubtaskStatus',title:`marked subtask '${this.GetSubtaskName(activity.subtaskId)}' as ${activity.value}`},
        10: {name:'DeletedSubtask',title:`deleted subtask ${this.GetSubtaskName(activity.subtask)}`},
        11: {name:'SetWaitingOn',title:`marked this task as waiting on ${this.GetSubtaskName(activity.value)}`},
        12: {name:'RemoveWaitingOn',title:`unmarked this task as waiting on ${this.GetSubtaskName(activity.value)}`},
        13: {name:'RemoveBlocking',title:`marked this task as blocking ${this.GetSubtaskName(activity.value)}`},
        14: {name:'SetBlocking',title:`unmarked this task as blocking ${this.GetSubtaskName(activity.value)}`},

      }
      let title =  filterData(activityDict,['name','==',activity.activity])
      if(!title) {
        return ''
      }
      return Object.values(title)[0].title
    },
    GetName(username){
      if(username === this.user.username) return 'You'
      return !this.team[username]?'':`${this.team[username].firstName} ${this.team[username].lastName}`
    },
    GetSubtaskName(id){
      return !this.tasks[id]?'':`${this.tasks[id].name}`
    },
  },
  computed:mapState({
    user:state => state.user,
    time:state =>state.time,
    priorities:state => state.projects.taskPriorities,
    team:state => state.team,
    tasks:state => state.projects.tasks,
    activities({projects:{activities}}){
      activities = filterData(activities,['taskId','==',this.taskId])
      return sortData(activities,'time')
    }
  })
}
</script>

<style scoped>

</style>
