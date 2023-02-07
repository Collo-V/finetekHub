<template>
  <div class="fixed h-screen-h w-full text-14px flex" v-if="$store.state.checkedUser">
    <div class="hidden lg:block">
      <Nav/>
    </div>
    <div class="lg:hidden">
      <MobNav/>
    </div>
    <div class="page-cont w-full mt-16" id="page-cont">
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
import {realDb} from "@/firebase";



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
    }
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
    window.addEventListener('offline',this.OnlineStatus(false))
    window.addEventListener('online',this.OnlineStatus(true))

    onAuthStateChanged(getAuth(),user=>{
      if(user ===null){
        this.$router.push({name:'login'})
    }
    })

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
