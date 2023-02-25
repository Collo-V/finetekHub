<template>
  <AddChannelMembers :channel-id="channel.id" v-if="showAddMembers"
                     @HideModal="showAddMembers = false"
  />
  <ChannelDetails
      @HideModal="showChannelDetails = false"
      v-if="showChannelDetails"
      :channel-id="channel.id"
      :view="detailsView"
  />
    <div class="header h-16 bg-white lg:bg-slate-300 p-2 flex shadow-md lg:shadow-0 justify-between items-center" >
    <div class="flex">
      <button class="focus:outline-none text-18px mx-5 lg:hidden" @click="$emit('SetSelected')">
        <i class="fas fa-long-arrow-left"></i>
      </button>
      <div class="flex">
        <img :src="channel.image" class="w-10 h-10 rounded-full" v-if="channel.image">
        <div  v-else class="w-42px h-42px rounded-full bg-slate-300 lg:bg-white flex items-center justify-center font-bold p-1px text-6">
          <div class="w-10 h-10 rounded-full flex bg-white lg:bg-slate-300 items-center justify-center font-bold text-6">
            {{channel.name[0]}}
          </div>
        </div>
        <div class="flex flex-col ml-3">
          <div class="font-bold text-5">{{channel.name}}</div>
          <div >
            <span class="text-primary">Typing...</span>
          </div>
        </div>
      </div>
    </div>
    <div class="h-10 flex items-center border-1px min-w-4 border-white items-center">
      <Tooltip
          placement="bottom"
          overlayClassName="mr-2"
      >
        <template #title>
          <div class="w-fit max-w-200px">
            <div class="font-semibold">
              View all members of {{channel.name}}
            </div>
            <div>
              Includes {{memberNames}}

            </div>
          </div>
        </template>
        <div class="flex gap-2 px-2 items-center cursor-pointer"
             @click="[detailsView = 'members',showChannelDetails=true]"
        >
          <div class="flex items-center pl-2">
            <div v-for="member in members" class="rounded-full flex items-center -ml-3">
              <img :src="member.image" class="w-8 h-8 rounded-full" v-if="member.image">
              <div  v-else class="w-34px h-34px rounded-full bg-slate-300 lg:bg-white flex items-center justify-center font-bold p-1px text-6">
                <div class="w-8 h-8 rounded-full flex bg-white lg:bg-slate-300 items-center justify-center font-bold text-6">
                  {{member.firstName[0]}}
                </div>
              </div>
            </div>
          </div>
          {{channel.members.length}}
        </div>
      </Tooltip>

      <button class="h-full border-l-1px w-10 border-white" @click="showAddMembers = true">
        <i class="fas fa-user-plus"></i>
      </button>

    </div>
  </div>

</template>

<script>
import {mapState} from "vuex";
import AddChannelMembers from "@/components/channels/AddChannelMembers";
import {Tooltip} from "ant-design-vue";
import ChannelDetails from "@/components/channels/ChannelDetails";

export default {
  name: "ChannelHeader",
  props:['channelId'],
  emits:['SetSelected'],
  components:{
    ChannelDetails,
    AddChannelMembers,
    Tooltip
  },
  data(){
    return{
      showAddMembers:false,
      showChannelDetails:false,
      detailsView:undefined
    }
  },
  computed:mapState({
    channel(state){
      return state.channels[this.channelId]
    },
    memberNames(state){
      let names = this.members.map(member=>`${member.firstName} ${member.lastName}`).slice(0,5)
      let str = ''
      for (let i = 0; i < names.length; i++) {
        let conjun = i===names.length-1?' and ':
            i===0?' ':', '
        str+=conjun+names[i]
      }
      return str
    },
    members(state){
      let usernames = this.channel.members.filter(member=>{
        return !member.dateLeft || (member.dateRejoined && member.dateRejoined > member.dateLeft)
      }).map(member=> member.username)
      return usernames.map(username=>state.team[username])
    },

  })
}
</script>

<style scoped>

</style>
