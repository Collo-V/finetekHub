<template>
  <div class="h-full w-full bg-slate-100 flex">
    <div class="absolute lg:relative top-0 bottom-0 z-3
        projects-cont w-full lg:min-w-250px lg:w-250px shadow-md bg-white
         overflow-x-hidden overflow-y-auto custom-scroll"
         id="settings-cont">
      <button class="py-2 w-full text-left pl-4 border-b-1px grid" @click="view = 'info'">
        <span class="font-semibold">
          Account settings
        </span>
        <span>
          Personal information
        </span>
      </button>
      <button class="py-2 w-full text-left pl-4 border-b-1px grid"  @click="view = 'password'">
        <span class="font-semibold">
          Security
        </span>
        <span>
          Password
        </span>
      </button>
    </div>
    <div class="w-full">
      <Profile/>
      <div class="px-8">
        <ChangePassword v-if="view === 'password'"/>
        <Details v-else-if="view === 'info'"/>
      </div>
    </div>
  </div>


</template>

<script>
import Avatar from "@/components/Avatar";
import {mapState} from "vuex";
import Profile from "@/components/settings/Profile";
import ChangePassword from "@/components/settings/ChangePassword";
import Details from "@/components/settings/Details";


export default {
  name: "Settings",
  components: {
    Details,
    ChangePassword,
    Profile,
    Avatar
  },
  data(){
    return{
      view:'info'
    }
  },
  methods:{

  },
  computed:mapState({
    user:state => state.user,
  }),
  mounted() {

  }
}
</script>

<style scoped>

</style>
