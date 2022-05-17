<template>
  <div class="h-screen-h bg-primary-purple min-w-200px top-0 left-0 z-8" id="admin-nav">
   <div class="fixed top-0 left-0 w-full h-16 shadow-md flex justify-between bg-grey-light">
     <div class="h-full w-200px bg-primary-purple"></div>
     <div class="flex flex-row-reverse h-full items-center pr-3 bg-grey-light">
       <div class="relative dropdown-cont">
         <img :src="$store.getters.GetUser.image" class="h-12 w-12 rounded-full" v-if="$store.getters.GetUser">
         <div class="dropdown absolute top-full right-0 w-150px h-150px shadow-md bg-white  tooltip z-10">
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
    <div class="mt-16 full">
      <router-link v-for="nav in tabs" :to="{name:nav.linkName}" @click="currentTab = nav.title"
                   class="block h-10 flex items-center text-white pl-3 hover:pl-4" >
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

</template>

<script>
import {getAuth,signOut} from 'firebase/auth'
export default {
  name: "Nav",
  data(){
    return{
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