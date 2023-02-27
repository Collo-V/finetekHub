<template>
  <CreateProject @hide-modal="showCreateProject=false" v-if="showCreateProject"/>
  <div class="absolute lg:relative top-0 bottom-0 z-3
        projects-cont w-full lg:min-w-250px lg:w-250px shadow-md bg-white
         overflow-x-hidden overflow-y-auto custom-scroll"
       id="projects-cont">
    <div class="projects mt-2 border-b-2px border-primary-purple">
      <h1 class="text-center text-primary-purple font-bold">Projects</h1>
      <div>
        <div v-for="project in projects" @click="$emit('SelectProject',project.id)"
             class=" px-2 h-8 flex items-center border-b-1px hover:bg-slate-100 cursor-pointer"
        >
          {{project.name}}
        </div>

      </div>
      <button class="h-8 w-full flex items-center gap-2 px-2 hover:bg-primary-purple hover:text-white my-2"
              @click="showCreateProject = true">
        <span class="h-5 w-5 bg-primary-purple/50 text-white rounded-sm">
          <i class="fas fa-plus"></i>
        </span>
        Create project
      </button>

    </div>
  </div>

</template>

<script>
import CreateProject from "@/components/projects/CreateProject";
import {mapState} from "vuex";
export default {
  name: "ProjectsCont",
  emits:['SelectProject'],
  components: {CreateProject},
  data(){
    return{
      showCreateProject:false
    }
  },
  computed:mapState({
    projects:state => state.projects.projects
  })
}
</script>

<style scoped>

</style>
