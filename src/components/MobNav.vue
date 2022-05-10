<template>
      <button class="z-5 fixed top-0 left-0 h-10 w-10 rounded-full focus:outline-none mt-4
       border-1px bg-primary-purple text-white " id="nav-button"
              @click="expanded=true" v-if="!expanded">
        <i class="fa-solid fa-bars"></i>
      </button>
    <div class="fixed top-0 left-0 z-3" v-if="expanded" >
      <div class="w-screen-w h-screen-h bg-grey absolute top-0 w-0 opacity-50"></div>
      <div>
        <div class="h-screen-h w-screen-h min-w-screen-w min-h-screen-w rounded-full bg-primary-purple animate__animated animate__fadeInDown
      -ml-screen-h-50 -mt-screen-h-50 relative z-2 mb-10">
          <div class="absolute top-0 mt-screen-h left-1/2 h-10 w-screen-w flex justify-center p-18">
            <button class="h-10 w-10 rounded-full focus:outline-none shadow-md bg-primary-purple text-white "
                    @click="expanded=false">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="nav-cont absolute top-1/2 left-1/2 w-10 pt-3 pl-3">
            <router-link v-for="nav in tabs" :to="{name:nav.linkName}" @click="[currentTab = nav.title,expanded = false]"
                         class="block h-10 flex items-center text-white pl-3 hover:pl-4">
              <span v-if="currentTab!=nav.title">{{nav.title}}</span>
              <span v-else class="text-primary-yellow">{{nav.title}}</span>
              <div v-if="nav.linkName=='chats'" class="ml-3">
                <div class="h-6 w-6 flex justify-center items-center bg-primary rounded-md"
                     v-if="newChats>0">
                  {{newChats}}
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="absolute let-0 top-0 h-screen-h w-screen-h rounded-full bg-primary-purple
       opacity-50 -ml-screen-h-45 min-w-screen-w min-h-screen-w -mt-screen-h-45 z-1">
        </div>
      </div>
      </div>
  <div class="h-screen-h fixed left-0 top-0 left-0 z-2 w-full hidden" id="admin-nav" v-show="expanded==true">
<!--   <div class="fixed top-0 left-0 w-full h-16 shadow-md flex  bg-primary-purple flex-row-reverse items-center pr-3">-->
<!--     <div class="relative dropdown-cont">-->
<!--       <img :src="$store.getters.GetUser.image" class="h-12 w-12 rounded-full" v-if="$store.getters.GetUser">-->
<!--       <div class="dropdown absolute top-full right-0 w-150px h-150px shadow-md z-4  tooltip">-->
<!--         <button class="w-full focus:outline-none hover:bg-grey-light h-8">-->
<!--               <span class="w-full pl-8 block text-left">-->
<!--                 <i class="fa-solid fa-user"></i> Edit profile-->
<!--               </span>-->
<!--         </button>-->
<!--         <button class="w-full focus:outline-none hover:bg-grey-light h-8" @click="Logout()">-->
<!--               <span class="w-full pl-8 block text-left">-->
<!--                 <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout-->
<!--               </span>-->
<!--         </button>-->
<!--       </div>-->
<!--     </div>-->
<!--   </div>-->
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
export default {
  name: "Nav",
  data(){
    return{
      expanded:false,
      tabs:{
        team:{title:"Team",linkName:'team'},
        blogs:{title:"Blogs",linkName:'blogs'},
        clients:{title:"Clients",linkName:''},
        messages:{title:"Messages",linkName:'messages'},
        chats:{title:"Chats",linkName:'chats'},
      },
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