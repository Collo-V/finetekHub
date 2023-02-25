<template>
  <div class="w-fit max-w-90% mx-auto px-2 bg-primary/25 rounded-pill">
    <p v-if="notification.entityType === 'Added'">
      <span v-if="notification.actor !== user.username">
        {{GetName(notification.actor)}}
      </span>
      <span v-else>You</span>
       added
      <span>
        {{GetName(notification.subject)}}
      </span>
    </p>
    <p v-else-if="notification.entityType === 'Removed'">
      <span v-if="notification.subject !== user.username">
        <span v-if="notification.actor !== user.username">
          {{GetName(notification.actor)}}
        </span>
        <span v-else>You</span>
         removed
        <span>
          {{GetName(notification.subject)}}
        </span>
      </span>
      <span v-else>
        You were removed from this channel.
      </span>
    </p>
    <p v-else-if="notification.entityType === 'Left'">
        <span v-if="notification.actor !== user.username">
          {{GetName(notification.actor)}}
        </span>
        <span v-else>You</span>
        left the channel
    </p>
    <p v-else-if="notification.entityType === 'Rejoined'">
        <span v-if="notification.actor !== user.username">
          {{GetName(notification.actor)}}
        </span>
        <span v-else>You</span>
        rejoined via
        <span v-if="notification.subject !== user.username">
          invitation from {{GetName(notification.subject)}}
        </span>
        <span v-else>
          your invitation
        </span>
    </p>
    <p v-else-if="notification.entityType === 'MakeAdmin' && notification.subject === this.user.username">
      You are now an admin
    </p>
    <p v-else-if="notification.entityType === 'RemoveAdmin' && notification.subject === this.user.username">
      You are no longer an admin
    </p>
    <p v-else-if="notification.entityType === 'ChangeDescription'">
        <span v-if="notification.actor !== user.username">
          {{GetName(notification.actor)}}
        </span>
      <span v-else>You</span>
      changed the description from
      "{{notification.subject}}" to "{{channel.description}}"
    </p>
    <p v-else-if="notification.entityType === 'ChangeName'">
        <span v-if="notification.actor !== user.username">
          {{GetName(notification.actor)}}
        </span>
      <span v-else>You</span>
      changed the channel's name from
      "{{notification.subject}}" to "{{channel.name}}"
    </p>
  </div>

</template>

<script>
import {mapState} from "vuex";

export default {
  name: "NotificationBar",
  props:['notificationId','channelId'],
  data(){
    return{}
  },
  methods:{
    GetName(username){
      return !this.team[username]?'':`${this.team[username].firstName} ${this.team[username].lastName}`
    },
  },
  computed:mapState({
    team:state => state.team,
    user:state => state.user,
    channel(state){
      return state.channels[this.channelId]
    },
    notificatons:state => state.chats.notificatons,
    notification(state){
      return state.chats.notifications[this.notificationId]
    }
  })
}
</script>

<style scoped>

</style>
