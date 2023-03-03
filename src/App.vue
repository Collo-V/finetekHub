<template>
  <div class="fixed h-screen-h w-full text-14px flex" v-if="$store.state.checkedUser">
    <router-view name="NavBar"></router-view>
    <div class="page-cont w-full lg:mt-16" id="page-cont">
      <router-view></router-view>
    </div>
  </div>
  <Loader v-else/>

</template>

<script>
import Nav from "@/components/Nav";
import MobNav from "@/components/MobNav";
import Loader from "@/components/Loader";
import {Report} from "@/commons/swal";
import {getAuth,onAuthStateChanged} from "firebase/auth";
import {ref, set} from "firebase/database";
import {db, realDb} from "@/firebase";
import '@/assets/styles/loaders.css'



export default {
  name: 'App',
  components:{
    Nav,Loader,MobNav
  },
  methods:{
    OnlineStatus(online){
      let obj={
        position:'bottom-left',
        title:online?'Back online':'You are offline',
        icon:online?'success':'error'
      }
      Report(obj)
      console.log('sent')
      if(!online)return
      setInterval(()=>{
        try {
          let user = getAuth().currentUser
          if(user !== null){
            let dbRef = ref(realDb,'/status/'+user.uid)
            set(dbRef, {
              email:user.email,
              lastSeen:new Date().getTime()
            })
          }

        }catch {}
      },60000)
    },
  },

  mounted() {
    if (window.performance) {
      // console.info("window.performance works fine on this browser");
    }
    // console.info(performance.navigation.type);
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      // logout
    } else {
      // console.info( "This page is not reloaded");
    }
    // window.addEventListener('offline',this.OnlineStatus(false))
    // window.addEventListener('online',this.OnlineStatus(true))

    let c = window.location.href.split('?').filter(a=>a.includes('email'))
    if(c.length > 0){
      let email = c[0].replace('email=','')
      this.$store.commit('GetUser',email)
      this.$router.push({name:'welcome'})
    }else{
      onAuthStateChanged(getAuth(),user=>{
        if(user ===null){
          this.$router.push({name:'login'})
          this.$store.commit("WriteUser",{})
          this.$store.dispatch("ClearIntervals")
        }else{
          this.$store.dispatch('GetUser',user.email)
        }
      })
    }
    this.$store.commit('WriteCheckedUser',true)

  },
  watch:{
    '$store.state.user'(user){
      if(user.username){
        this.$store.dispatch('WriteOnlineStatus')
        this.$store.dispatch('GetChannels')
        this.$store.dispatch('GetTypingStatus')
        this.$store.dispatch('GetNotifications')
        this.$store.dispatch('GetProjects')
        this.$store.dispatch('GetTasks')
        this.$store.dispatch('GetActivities')
      }
      if(user.username && Object.keys(this.$store.state.chats.chats).length == 0){
        this.$store.dispatch('GetChats')
      }
    },
  },

  beforeMount() {
    this.$store.dispatch('Gets')
  }

}
</script>

<style>
    button{color: inherit}
* {
  font-family: 'Montserrat', sans-serif;box-sizing: border-box;
}
 a{color: inherit;text-decoration: none}
button:focus,button:active{outline: none;}
.text-ellipsis{text-overflow: ellipsis;overflow: hidden;white-space: nowrap}

  .leading-10{line-height: 30px}
  .list-none{list-style: none;}



    .custom-scroll::-webkit-scrollbar {
      width: 5px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: gray;
      border-radius: 10px;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #98CB00;
    }







    /*Dropdown*/
    .dropdown-cont:hover >.dropdown{
      display: initial;
    }
    .dropdown{display: none}

    .form-label{transform: translateY(-50%)}
    .form-input:focus + .form-label,.prefilled-form .form-input+.form-label,.input-valid + .form-label,
    .input-invalid + .form-label{top: 0;color: #1476f2;font-size: smaller}
    .next-circle{background: #1865c7;}
    .input-invalid~.validity-checker .invalid{display: initial}
    .input-valid~.validity-checker .valid{display: initial}
</style>
