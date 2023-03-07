<template>
  <div class="h-full w-full bg-slate-100 flex">
    <div class="absolute lg:relative top-0 bottom-0 z-3
        projects-cont w-full lg:min-w-250px lg:w-250px shadow-md bg-white
         overflow-x-hidden overflow-y-auto custom-scroll"
         id="settings-cont">
      <button class="py-2 w-full text-left pl-4 border-b-1px grid">
        <span class="font-semibold">
          Account settings
        </span>
        <span>
          Personal information
        </span>
      </button>
      <button class="py-2 w-full text-left pl-4 border-b-1px grid">
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
        <ChangePassword/>
      </div>
    </div>
  </div>


</template>

<script>
import Avatar from "@/components/Avatar";
import {mapState} from "vuex";
import Profile from "@/components/settings/Profile";
import ChangePassword from "@/components/settings/ChangePassword";


export default {
  name: "Settings",
  components: {
    ChangePassword,
    Profile,
    Avatar
  },
  data(){
    return{
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
