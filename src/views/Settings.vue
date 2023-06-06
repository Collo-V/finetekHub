<template>
  <div class="flex overflow-y-auto h-full custom-scroll bg-slate-100 flex relative pb-8">
    <div class="absolute top-0 left-0 z-2 bg-primary">
      <button class="focus:outline-none text-18px mx-5 lg:hidden" @click="minView = false">
        <i class="fas fa-long-arrow-left"></i>
      </button>
    </div>

    <div class="absolute lg:relative top-0 bottom-0 z-3
        projects-cont w-full lg:min-w-250px lg:w-250px shadow-md bg-white
         overflow-x-hidden overflow-y-auto custom-scroll"
         id="settings-cont">
      <button class="py-2 w-full text-left pl-4 border-b-1px grid" @click="[view = 'info',minView = true]">
        <span class="font-semibold">
          Account settings
        </span>
        <span>
          Personal information
        </span>
      </button>
      <button class="py-2 w-full text-left pl-4 border-b-1px grid"  @click="[view = 'password',minView = true]">
        <span class="font-semibold">
          Security
        </span>
        <span>
          Password
        </span>
      </button>
    </div>
    <div class="w-full overflow-auto h-screen-50">
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
      view:'info',
      minView:false
    }
  },
  watch:{
    minView(val){
      let cont  = document.getElementById('settings-cont')
      if(val){
        cont.classList.add('w-0')
      } else {
        cont.classList.remove('w-0')
      }
    }

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
