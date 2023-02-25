<template>
  <div class="fixed top-0 bottom-0 w-screen-w left-0 bg-slate-600/50 z-10 flex items-center justify-center"
       @click="CheckClickOutside($event)">
    <div class="w-full max-w-500px h-screen-h-80 min-h-screen-h-80 overflow-hidden bg-white rounded-lg py-4 relative" ref="contRef">
      <button class="float-right h-5 w-5 text-gray-600 mr-4" @click="$emit('HideModal')">
        <i class="fas fa-xmark"></i>
      </button>
      <div>
        <h1 class="flex gap-2 font-bold text-5 px-4">
          <span v-if="channel.isPrivate">
            <i class="fas fa-lock"></i>
          </span>
          <span v-else>
            #
          </span>
          {{channel.name}}
        </h1>
        <div class="view-nav-cont mt-4 border-b-1px flex gap-2 px-4">
          <span v-for="nav in views">
            <button class="w-80px border-b-2px border-primary capitalize" v-if="nav === selectedView">
              {{nav}}
            </button>
            <button class="w-80px capitalize" v-else @click="selectedView = nav">
              {{nav}}
            </button>
          </span>
        </div>
        <div class="view-cont mt-4">
          <ChannelMembers :channel-id="channel.id" v-if="selectedView === 'members'"/>
          <ChannelAbout
              v-else-if="selectedView === 'about' "
              :channel-id="channel.id"
              @set-selected="(id)=>$emit('SetSelected',id)"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import ChannelMembers from "@/components/channels/ChannelMembers";
import ChannelAbout from "@/components/channels/ChannelAbout";

export default {
  name: "ChannelDetails",
  components: {ChannelAbout, ChannelMembers},
  emits:['HideModal'],
  props:['channelId','tempView'],
  data(){
    return{
      selectedView:this.view?this.view:'members',
      views:['about','members','settings'],
    }
  },
  methods:{
    CheckClickOutside(event){
      try{
        let target = event.target
        let isOutside = this.$refs.contRef && !this.$refs.contRef.contains(target) &&
            target.tagName !== 'BUTTON' && target.parentNode.tagName !== 'BUTTON' &&
            target.parentNode.parentNode.tagName !== 'BUTTON'


        if(isOutside){
          this.$emit('HideModal')
        }
      }catch {}
    },

  },

  computed:mapState({
    user:state => state.user,
    channel(state) {
      return state.channels[this.channelId]
    },
    members(state) {
      let usernames = this.channel.members.map(member => member.username)
      return usernames.map(username => state.team[username])
    },
  })
}
</script>

<style scoped>

</style>
