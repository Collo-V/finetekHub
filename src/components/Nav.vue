<template>
  <div class="h-screen-h bg-primary-purple min-w-200px top-0 left-0 z-10" id="admin-nav">
   <div class="fixed top-0 left-0 w-full h-16 shadow-md flex justify-between bg-grey-light z-10">
     <div class="h-full w-200px bg-primary-purple"></div>
     <div class="flex flex-row-reverse h-full items-center pr-3 bg-grey-light">
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
      <router-link to="/team"
          class="block h-10 flex items-center text-white pl-3 hover:pl-4 rounded-sm mb-2" >
        Team
      </router-link>
      <router-link to="/blogs"
          class="block h-10 flex items-center text-white pl-3 hover:pl-4 rounded-sm mb-2" >
        Blogs
      </router-link>
      <router-link to="/chats"
          class="block h-10 flex items-center text-white pl-3 hover:pl-4 rounded-sm mb-2" >
        Chats
        <span class="ml-2 h-5 w-5 rounded-full flex items-center justify-center bg-primary text-white" v-if="$store.state.newChats>0">{{$store.state.newChats}}</span>
      </router-link>
      <router-link to="/client-messages"
          class="block h-10 flex items-center text-white pl-3 hover:pl-4 rounded-sm mb-2" >
        Messages
      </router-link>
      <router-link to="/settings"
          class="block h-10 flex items-center text-white pl-3 hover:pl-4 rounded-sm mb-2" >
        Settings
      </router-link>
   </div>
  </div>

</template>

<script>
import {getAuth,signOut} from 'firebase/auth'
import {ref,set} from 'firebase/database'
import {realDb} from "@/firebase";
export default {
  name: "Nav",
  data(){
    return{
      tabs:{
        team:{title:"Team",linkName:'team'},
        blogs:{title:"Blogs",linkName:'blogs'},
        // clients:{title:"Clients",linkName:''},
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
    },


  },
  computed:{

  },
  mounted() {
    // this.user = this.$router.getters.GetUser
  }
}
</script>

<style scoped>
.router-link-active{
  @apply text-primary-yellow bg-primary-purple-light
}

</style>
