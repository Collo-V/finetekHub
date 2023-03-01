<template>
  <div class="h-screen-h bg-primary-purple min-w-200px top-0 left-0 z-10 hidden lg:block" id="admin-nav">
   <div class="fixed top-0 left-0 w-full h-16 shadow-md flex justify-between bg-grey-light z-10">
     <div class="h-full w-200px bg-primary-purple"></div>
     <div class="flex flex-row h-full items-center pr-3 bg-grey-light gap-3">
       <div v-html="time">

       </div>
       <div class="relative dropdown-cont">
         <img :src="$store.getters.GetUser.image" class="h-12 w-12 rounded-full" v-if="$store.getters.GetUser">
         <div class="dropdown absolute top-full right-0 w-150px h-150px shadow-md bg-white  tooltip z-10 -mt-1">
           <button class="w-full focus:outline-none hover:bg-grey-light h-8">
               <span class="w-full pl-8 block text-left">
                 <i class="fa-solid fa-user"></i> Edit profile
               </span>
           </button>
           <button class="w-full focus:outline-none hover:bg-grey-light h-8" @click="Logout()">
               <span class="w-full pl-8 block text-left">
                 <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
               </span>
           </button>
         </div>
       </div>

     </div>
   </div>
    <div class="mt-16 full px-2">
      <router-link :to="{name:nav.linkName}" v-for="nav in GetNavs"
          class="block h-10 flex items-center text-white pl-3 hover:pl-4 rounded-sm mb-2 justify-between" >
        {{nav.title}}
        <div class="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-3"
             v-if="nav.title === 'Chats' && newChats>0"
        >
          <span v-if="newChats<100">{{ newChats }}</span>
          <span v-else>99+</span>
        </div>
      </router-link>

   </div>
    <div class="mt-4 flex justify-center ">
      <div class="clock">
        <div class="hour">
          <div class="hr" id="hr"></div>
        </div>
        <div class="min">
          <div class="mn" id="mn"></div>
        </div>
        <div class="sec">
          <div class="sc" id="sc"></div>
        </div>
      </div>
    </div>
  </div>
  <span class="hidden">{{clock}}</span>
  <div class="lg:hidden">
<!--    <MobNav/>-->
  </div>


</template>

<script>
import {getAuth,signOut} from 'firebase/auth'
import {ref,set} from 'firebase/database'
import {realDb} from "@/firebase";
import {dateFormatter} from "@/commons";
import {mapState} from "vuex";

export default {
  name: "Nav",
  data(){
    return{
      mainNavs:[
        {title:"Blogs",linkName:'blogs'},
        {title:"Chats",linkName:'chats'},
        {title:"Projects",linkName:'projects'},
        {title:"Settings",linkName:'settings'},
      ],
      currentTab:'Blogs',
      user:'',
    }
  },
  methods:{
    Logout(){
      signOut(getAuth())
    },
    CheckNewMsg(){
      return this.$store.state.newChats
    },


  },
  computed: mapState({
    newChats: state => state.chats.newChats.length,
    // NewChats(state) {
    //   console.log(state.chats)
    //   let newChats = state.chats.newChats
    //   return state.chats.newChats
    // },
    time(state){
      return dateFormatter(state.time,'long-slash')
    },
    GetNavs({user}){
      if(!user.username)return []
      if(user.isAdmin){
        return [
          {title:"Team",linkName:'team'},
          {title:"Messages",linkName:'messages'},
            ...this.mainNavs
        ]
      }else {
        return this.mainNavs
      }

    },
    clock(state) {
      let date = new Date(state.time);
      console.log('here')
      const deg = 6;
      const hr = document.querySelector('#hr');
      const mn = document.querySelector('#mn');
      const sc = document.querySelector('#sc');
      let hh = date.getHours() * 30;
      let mm = date.getMinutes() * deg;
      let ss = date.getSeconds() * deg;
      hr.style.transform = `rotateZ(${hh + (mm / 12)}deg)`;
      mn.style.transform = `rotateZ(${mm}deg)`;
      sc.style.transform = `rotateZ(${ss}deg)`;
      return date
    }
  }),
  mounted() {
    this.clock
    // this.user = this.$router.getters.GetUser
  }
}
</script>

<style scoped>
.router-link-active{
  @apply text-primary-yellow bg-primary-purple-light
}

.clock
{
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../assets/images/icons/clock.webp);
  background-size: cover;
  border: 4px solid #262162;
  border-radius: 50%;
  box-shadow: 0 -15px 15px rgba(255,255,255,0.05),
  inset 0 -15px 15px rgba(255,255,255,0.05),
  0 15px 15px #262162,
  inset 0 15px 15px #262162;
}

.clock::before
{
  content: '';
  position: absolute;
  width: 15px;
  height: 15px;
  background: #fff;
  border-radius: 50%;
  z-index: 10000;
}
.clock .hour,
.clock .min,
.clock .sec
{
  position: absolute;
}
.clock .hour, .hr
{
  width: 60px;
  height: 80px;
}
.clock .min, .mn
{
  width: 100px;
  height: 100px;
}
.clock .sec, .sc
{
  width: 120px;
  height: 120px;
}
.hr, .mn, .sc
{
  display: flex;
  justify-content: center;
  /* align-items: center; */
  position: absolute;
  border-radius: 50%;
}
.hr:before
{
  content: '';
  position: absolute;
  width: 8px;
  height: 50px;
  background: #ff105e;
  z-index: 10;
  border-radius: 6px 6px 0 0;
}
.mn:before
{
  content: '';
  position: absolute;
  width: 4px;
  height: 60px;
  background: #fff;
  z-index: 11;
  border-radius: 6px 6px 0 0;
}
.sc:before
{
  content: '';
  position: absolute;
  width: 2px;
  height: 80px;
  background: #fff;
  z-index: 12;
  border-radius: 6px 6px 0 0;
}

</style>
