<template>
  <div>
    <div class="font-semibold"> Subtasks</div>
    <div>
      <ul class="custom-scroll max-h-300px" ref="subtaskList">
        <li class="flex gap-2 items-center mt-2 h-6 relative" v-for="subtask in subtasks">
          <div class="relative inline-block w-fit h-fit">
            <Tooltip
                position="top"
                :title="'Task status: '+subtask.status"
            >
              <div class="w-5 h-5 border-1px flex items-center justify-center cursor-pointer"
                   @click="showSubTaskStatus[subtask.id] = true"
              >
                <div class="w-14px h-14px" v-if="subtask.status === 'Backlog'"></div>
                <div class="w-14px h-14px bg-slate-300" v-else-if="subtask.status === 'ToDo'"></div>
                <div class="w-14px h-14px bg-primary" v-else-if="subtask.status === 'InProgress'"></div>
                <div class="w-14px h-14px bg-green-500" v-else-if="subtask.status === 'Completed'"></div>
              </div>
            </Tooltip>
            <span v-if="showSubTaskStatus[subtask.id]">
              <div class="fixed top-0 popup-overlay left-0 w-screen-w h-screen-h"
                   @click="showSubTaskStatus[subtask.id] = false"></div>
              <div class="members absolute top-0 left-full w-fit bg-white z-1
              vue-shadow rounded-md h-fit min-w-200px">
                <span
                    class="w-full inline-block"
                    v-for="status in taskStatuses.filter(status =>status!==subtask.status)">
                  <button class="h-8 hover:bg-slate-100 w-full text-left pl-4 flex items-center justify-between"
                          @click="ChangeSubtaskStatus(subtask.id,status)"
                  >
                  {{ status }}
                </button>
                </span>
        </div>
            </span>
          </div>
          <input v-model="subtask.name" class="w-full h-6 border-0 focus:border-1px">
          <Tooltip
              position="top"
              title="More options"
          >
            <button class="h-6 w-6 absolute top-0 right-0" @click="showSubTaskOps[subtask.id] = true">
              <i class="fas fa-ellipsis-vertical"></i>
            </button>
          </Tooltip>
          <span v-if="showSubTaskOps[subtask.id]">
                    <div class="fixed top-0 popup-overlay left-0 w-screen-w h-screen-h"
                         @click="showSubTaskOps[subtask.id] = false"></div>
                    <div class="members absolute top-0 left-full w-fit bg-white z-1
                    vue-shadow rounded-md h-fit min-w-200px">
                <button class="h-8 hover:bg-slate-100 w-full text-left pl-4 flex items-center justify-between"
                        @click="Convert(subtask.id)"
                >
                  <span>
                    <span>
                    <i class="fas fa-refresh"></i>
                  </span>
                  <span class="ml-2">
                    Convert to task
                  </span>
                  </span>

                </button>
                <button class="h-8 hover:bg-slate-100 w-full text-left pl-4 flex items-center justify-between"
                        @click="showSubTaskMove[subtask.id] = true"

                >
                  <span>
                    <span>
                      <i class="fas fa-right-from-bracket"></i>
                    </span>
                    <span class="ml-2">
                      Move
                    </span>
                  </span>
                </button>
                    <MoveSubtask
                        :task-id="subtask.id"
                        v-if="showSubTaskMove[subtask.id]"
                        @hide-modal="showSubTaskMove[subtask.id] = false"
                    />
                <button class="h-8 hover:bg-slate-100 w-full text-red-500 text-left pl-4"
                        @click="DeleteSubtask(subtask.id)">
                  <span>
                    <i class="fas fa-trash-can"></i>
                  </span>
                  <span class="ml-2">
                    Delete
                  </span>

                </button>

              </div>
                  </span>
        </li>

      </ul>
      <input class="form-input w-full h-10 flex items-center rounded-sm optional
                border-0 border-t-1px shadow-md focus:border-1px"
             @keyup.enter.stop="AddSubtask"
             placeholder="Add subtask"
             @blur="AddSubtask"
      >
    </div>
  </div>
</template>

<script>
import {addDoc, doc, updateDoc,deleteField} from "firebase/firestore";
import {db, dbTasks} from "@/firebase";
import {mapState} from "vuex";
import MoveSubtask from "@/components/tasks/MoveSubtask";
import {Tooltip} from "ant-design-vue";
import {filterData} from "@/commons/objects";
import firebase from "firebase/compat";

export default {
  name: "Subtasks",
  props:['taskId'],
  components:{
    MoveSubtask,
    Tooltip
  },
  data(){
    return{
      showSubTaskOps:{},
      showSubTaskMove:{},
      showSubTaskStatus:{},

    }
  },
  methods:{
    async AddSubtask(event){
      let value = event.target.value
      if(value !==''){
        let date = (new Date()).getTime()
        let subtask ={
          name:value,
          projectId:this.task.projectId ,
          createdBy:this.user.username,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          status:'Backlog',
          subtaskFor:this.taskId,
          blocking:[],
          waitingOn:[],
          priority:3,
          assignedTo:[]
        }
        await addDoc(dbTasks,subtask)
      }
      event.target.value = ''
    },
    async Convert(id){
      await updateDoc(doc(db,'tasks',id),{
        subtaskFor:false
      })
    },
    async ChangeSubtaskStatus(id,status){
      await updateDoc(doc(db,'tasks',id),{
        status
      })
      this.showSubTaskStatus[id] = false
    },
    async DeleteSubtask(id){
      await updateDoc(doc(db,'tasks',id),{
        isDeleted:true
      })
      this.showSubTaskOps[id] = false
    },
  },
  computed:mapState({
    tasks:state => state.projects.tasks,
    user:state => state.user,
    task(){
      return this.tasks[this.taskId]
    },
    taskStatuses:state => state.projects.taskStatuses,
    project({projects: {projects}}) {
      return  projects[this.thisTask.projectId]
    },
    subtasks(state){
      return filterData(this.tasks,['subtaskFor','==',this.taskId])
    },
  })
}
</script>

<style scoped>

</style>
