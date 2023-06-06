<template>
  <button class="z-5 fixed top-0 right-0 h-10 w-10 rounded-full focus:outline-none mt-4
   border-1px bg-primary-purple text-white mr-4 " id="nav-button"
          @click="expanded=true" v-if="!expanded">
    <i class="fa-solid fa-bars"></i>
  </button>
  <div class="fixed top-0 right-0 z-10 mob-nav" v-if="expanded" >
      <div class="w-screen-w h-screen-h bg-grey absolute top-0 w-0 opacity-50"></div>
      <div>
        <div class="h-screen-h w-screen-h min-w-screen-w min-h-screen-w rounded-full bg-primary-purple animate__animated animate__fadeInDown
          -mr-screen-h-50 -mt-screen-h-50 relative z-2 mb-10">
          <div class="absolute top-full h-10 w-screen-w flex justify-center p-18 z-10">
            <button class="h-10 w-10 rounded-full focus:outline-none shadow-md bg-primary-purple text-white "
                    @click="expanded=false">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="nav-cont absolute top-1/2 left-0 w-50% pt-3 pr-3">
            <router-link v-for="nav in GetNavs" :to="{name:nav.linkName}" @click="[currentTab = nav.title,expanded = false]"
                         class="block h-10 flex items-center text-white pl-3 justify-end text-right">
              <span v-if="currentTab!=nav.title">{{nav.title}}</span>
              <span v-else class="text-primary-yellow">{{nav.title}}</span>
<!--              <div v-if="nav.linkName=='chats'" class="ml-3">-->
<!--&lt;!&ndash;                <div class="h-6 w-6 flex justify-center items-center bg-primary rounded-md"&ndash;&gt;-->
<!--&lt;!&ndash;                     v-if="newChats>0">&ndash;&gt;-->
<!--&lt;!&ndash;                  {{newChats}}&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--              </div>-->
            </router-link>
          </div>
        </div>
        <div class="absolute left-full top-25% h-screen-h w-screen-h rounded-full bg-primary-purple
          opacity-50  z-1 vh-center">
        </div>
      </div>
  </div>
  <div class="h-screen-h fixed left-0 top-0 left-0 z-10 w-full hidden" id="" v-show="expanded==true">
    <div class="sidenav full w-full bg-primary-purple h-full text-white">
      <div class="h-10 w-full bg-primary-purple flex items-center flex-row-reverse">
        <button class="h-full w-10 focus:outline-none border-1px bg-primary" @click="expanded= false">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

   </div>
  </div>

</template>

<script>
import {getAuth,signOut} from 'firebase/auth'
import {mapState} from "vuex";
import {dateFormatter} from "@/commons";
export default {
  name: "Nav",
  data(){
    return{
      expanded:false,
      mainNavs:[
        {title:"Blogs",linkName:'blogs',icon:'blog'},
        {title:"Chats",linkName:'chats',icon:'comment-dots'},
        {title:"Projects",linkName:'projects',icon:'folder'},
        {title:"My Tasks",linkName:'my-tasks',icon:"clipboard-list"},
        {title:"Settings",linkName:'settings',icon:'gear'},
      ],
      currentTab:'Blogs',
      user:'',
      newChats:this.$store.getters.GetNewChats
    }
  },
  methods:{
    Logout(){
      signOut(getAuth())
    },
    CheckNewMsg(){
      return this.$store.state.newChats
    }


  },
  computed: mapState({
    Time(state){
      return dateFormatter(state.time,'long-slash')
    },
    GetNavs({user}){
      if(!user.username)return []
      if(user.isAdmin){
        return [
          {title:"Team",linkName:'team'},
          {title:"Blogs",linkName:'blogs'},
            ...this.mainNavs
        ]
      }else {
        return this.mainNavs
      }

    }

  }),
  mounted() {
    // this.user = this.$router.getters.GetUser
  }
}
</script>

<style scoped>
/*.tooltip ::after {*/
/*  content: " ";*/
/*  position: absolute;*/
/*  bottom: 100%; !* At the top of the tooltip *!*/
/*  left: 50%;*/
/*  margin-left: -5px;*/
/*  border-width: 5px;*/
/*  border-style: solid;*/
/*  !*border-color: transparent transparent black transparent;*!*/
/*  box-shadow: 5px 5px transparent, 10px 10px transparent, 15px 15px green,10px 10px transparent*/
/*}*/


</style>
