<template>
    <div class="h-full w-full bg-slate-100 flex">
      <ProjectsCont @select-project="(id)=>{selectedId = id}" />
      <div class="flex flex-row-reverse h-full w-full">
          <QuickChat :channel-id="project.channelId"
                     v-if="project && project.channelId && showQuickChat"/>
        <div class="h-full flex flex-col w-full" v-if="selectedId">
          <div class="h-16 px-4 mt-4">
            <div class="font-bold text-5 lg:text-6">
              {{project.name}}
            </div>
          </div>
          <div class="flex gap-2 shrink-0 h-10 justify-between px-2 items-center">
            <div class="flex h-full gap-2 items-center">
            <span v-for="nav in views">
                <button class="w-80px border-b-2px border-primary capitalize text-primary" v-if="nav === selectedView">
                  {{nav}}
                </button>
                <button class="w-80px capitalize hover:text-primary" v-else @click="selectedView = nav">
                  {{nav}}
                </button>
              </span>
            </div>
            <div class="flex h-full items-center gap-4">
              <button class="w-120px bg-primary h-8 text-white" @click="showQuickChat = !showQuickChat">
                {{
                showQuickChat?'Close chats':'Open chats'
                }}
              </button>
              <div class="h-full flex items-center border-1px min-w-4 border-white items-center mr-4">
                <Tooltip
                    placement="bottom"
                    overlayClassName="mr-2"
                >
                  <template #title>
                    <div class="w-fit max-w-200px">
                      <div class="font-semibold">
                        View all members of {{project.name}}
                      </div>
                      <!--                  <div>-->
                      <!--                    Includes {{memberNames}}-->

                      <!--                  </div>-->
                    </div>
                  </template>
                  <div class="flex gap-2 px-2 items-center cursor-pointer"
                       @click="[selectedView = 'members']"
                  >
                    <div class="flex items-center pl-2">
                      <div v-for="member in members" class="rounded-full flex items-center -ml-3">
                        <Avatar size="medium" rounded="true"
                                :image="member.image" class=""
                                :name="member.firstName"
                        />
                      </div>
                    </div>
                    {{project.members.length}}
                  </div>
                </Tooltip>

                <button class="h-full border-l-1px w-10 border-white" @click="showAddMembers = true">
                  <i class="fas fa-user-plus"></i>
                </button>
                <AddProjectMembers :project-id="project.id" v-if="showAddMembers" @hide-modal="showAddMembers = false"/>

              </div>
            </div>
          </div>
          <div class="views-cont px-4 h-full w-full">
            <Tasks :project-id="selectedId"/>
          </div>
        </div>
      </div>
  </div>

</template>

<script>
import Tasks from "@/components/tasks/Tasks";
import ProjectsCont from "@/components/projects/ProjectsCont";
import {Tooltip} from "ant-design-vue";
import {mapState} from "vuex";
import Avatar from "@/components/Avatar";
import AddProjectMembers from "@/components/projects/AddProjectMembers";
import QuickChat from "@/components/projects/QuickChat";

export default {
  name: "Projects",
  components:{
    QuickChat,
    AddProjectMembers,
    Avatar,
    ProjectsCont,
    Tooltip,
    Tasks,
  },
  data(){
    return{
      views:['tasks','timeline','overview','members'],
      selectedView:'tasks',
      selectedId:undefined,
      showAddMembers:false,
      showQuickChat:false,
    }
  },
  watch:{
    selectedId(id){
      if(!id){}
    }
  },
  computed:mapState({
    members(state){
      let usernames = this.project.members.filter(member=>{
        return !member.dateLeft || (member.dateRejoined && member.dateRejoined > member.dateLeft)
      }).map(member=> member.username)
      return usernames.map(username=>state.team[username])
    },
    project(state){
      return state.projects.projects[this.selectedId]
    }
  })
}
</script>

<style scoped>

</style>
