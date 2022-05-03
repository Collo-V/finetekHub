<template>
  <div class="h-screen-h bg-primary-purple w-200px fixed top-0 left-0 z-2" id="admin-nav">
   <div class="fixed top-0 left-0 w-full h-16 shadow-md bg-white">
     <div class="h-full w-200px bg-primary-purple"></div>
   </div>
    <div class="mt-16 full">
      <router-link v-for="nav in tabs" :to="{name:nav.linkName}"
                   class="block h-10 flex items-center text-white pl-3 hover:pl-4">
        {{nav.title}}
      </router-link>
    </div>
  </div>

</template>

<script>
export default {
  name: "Nav",
  data(){
    return{
      tabs:{
        team:{title:"Team",linkName:'team'},
        blogs:{title:"Blogs",linkName:'blogs'},
        clients:{title:"Clients",linkName:''},
        messages:{title:"Messages",linkName:''},
      }
    }
  }
}
</script>

<style scoped>

</style>