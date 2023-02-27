<template>
  <div class="h-full overflow-auto custom-scroll pb-10 max-w-full">
    <div class="header h-10 flex border-b-1px">

    </div>
    <div class="tasks-cont mt-4 relative h-full">
      <AddTask :project-id="projectId"/>
      <div class="absolute top-0 bottom-0 right-0 left-0">
        <div class="kanban flex gap-4 items-start overflow-x-auto custom-scroll max-w-full mb-10">
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
                  class="list-group"
                  group="tasks"
                  v-model="myTasks['backlog']"
                  itemKey="title"
              >
                <template #item="{element:task,index}">
                  <div class="mb-2">
                    <TaskCard :task="task"/>
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
                  class="list-group"
                  group="tasks"
                  v-model="myTasks['toDo']"
                  itemKey="title"
              >
                <template #item="{element:task,index}">
                  <div class="mb-2">
                    <TaskCard :task="task"/>
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
                  class="list-group"
                  group="tasks"
                  v-model="myTasks['progress']"
                  itemKey="title"
              >
                <template #item="{element:task,index}">
                  <div class="mb-2">
                    <TaskCard :task="task"/>
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
                  class="list-group"
                  group="tasks"
                  v-model="myTasks['progress']"
                  itemKey="title"
              >
                <template #item="{element:task,index}">
                  <div class="mb-2">
                    <TaskCard :task="task"/>
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
import TaskCard from "@/components/projects/TaskCard";
import Draggable from 'vuedraggable'
import AddTask from "@/components/projects/AddTask";

export default {
  name: "Tasks" ,
  props:['projectId'],
  components: {
    AddTask,
    TaskCard,
    Draggable
  },
  data(){
    return{
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      myTasks:{
        backlog:[
          {
            title:'Backlog1'
          },
          {
            title:'Backlog2'
          },
        ],
        toDo:[
          {
            title:'To do 1'
          },
          {
            title:'To do 2'
          },
        ],
        progress:[
          {
            title:'Completed 1'
          },
          {
            title:'Completed 2'
          },
        ]
      }
    }
  },
  computed:mapState({
    tasks(state){
      return this.myTasks
    }
  })
}
</script>

<style scoped>
.sortable-ghost{
  @apply opacity-50
}

</style>
