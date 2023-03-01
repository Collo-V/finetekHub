<template>
  <div class="w-250px h-200px bg-white rounded-md vue-shadow-md py-4 flex flex-col justify-between relative z-1" v-if="username">
    <div class="pb-2 flex gap-4 items-center border-b-1px p-2">
      <img :src="member.image" alt="" class="h-12 w-12">
      <div>
        <div class="font-semibold">
          <span>{{member.firstName}} {{member.lastName}}</span>
          <span v-if="member.username === user.username">(You)</span>
        </div>
      </div>

    </div>
    <div class="p-2">
        <span>{{member.position}}</span>
    </div>
    <div class="flex justify-center">
        <button @click="" class="border-1px h-8 w-100px rounded-sm">
          <span class="mr-2"> <i class="fas fa-message"></i> Message</span>
        </button>
    </div>
  </div>
  <span v-else></span>

</template>

<script>
import {mapState} from "vuex";

export default {
  name: "MemberCard",
  props:['username'] ,
  computed:mapState({
    user:state => state.user,
    team:state => state.team,
    member(){
      let member = this.team[this.username]
      if(!member) member = {}
      return member
    },
    channel(state){
      return state.channels[this.channelId]
    },
  }),
}
</script>

<style scoped>

</style>
