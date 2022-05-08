<template>
  <div class="hidden lg:block">
    <MainChat/>
  </div>
  <div class="lg:hidden">
    <MobChat/>
  </div>

</template>

<script>
import MainChat from "@/components/MainChat";
import MobChat from "@/components/MobChat";
export default {
  name: "Chats",
  components:{
    MainChat,MobChat
  }


}
</script>

<style scoped>
</style>