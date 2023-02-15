<template>
  <div class="absolute lg:relative top-0 bottom-0 z-3
  team-cont w-full lg:min-w-250px lg:w-250px shadow-md bg-white overflow-hidden" id="team-cont">
    <div class="absolute bottom-full h-16 bg-white w-full"></div>
    <div v-for="member in chatList" @click="$emit('Select-Chat',member)">
      <div v-if="member.email"  className="h-18 flex border-b-1px cursor-pointer">
        <div className="h-full min-w-12 flex items-center relative">
          <div className="h-4 w-4 rounded-full absolute bottom-0 right-0 bg-primary mb-2 border-2px border-white"
               v-if=" time- status[member.username] < 5000 "
          >
          </div>
          <div className="h-4 w-4 rounded-full absolute bottom-0 right-0 bg-slate-300 mb-2 border-2px border-white"
               v-else
          ></div>
          <img :src="member.image" class="w-12 h-12 rounded-full">
        </div>
        <div  className="h-full flex justify-between w-full">
          <div className="ml-3 h-full flex flex-col justify-center">
            <div className="mb-2 flex items-center">
              <span className="text-16px mr-2 whitespace-nowrap">{{ member.firstName }} {{ member.lastName }}</span>
<!--              <span v-if="chats[member.username]" className="whitespace-nowrap text-3 w-fit">-->
<!--                    {{ DateFormat(chats[member.username][chats[member.username].length - 1].time, true) }}-->
<!--                  </span>-->

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {filterData} from "@/commons/objects";
import {mapState} from "vuex";

export default {
  name: "TeamCont",
  data(){
    return{}
  },
  computed: mapState({
    user:state => state.user,
    chatList: state => {
      let my = state.user
      let tempTeam = state.team
      tempTeam = filterData(tempTeam,['email','!=',my.email])
      return tempTeam
      let groups  = []
    },
    time:state => state.time,
    status:state => state.chats.status,
    latestChat:state => {
      return state.chats.chats
    }
  })
}
</script>

<style scoped>
.team-cont{
  transition: width 1s;
}

</style>
