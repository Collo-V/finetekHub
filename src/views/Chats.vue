<template>
  <div class="hidden lg:block h-full w-full">
    <MainChat/>
  </div>
  <div class="lg:hidden w-full h-full">
    <MobChat/>
  </div>

</template>

<script>
import MainChat from "@/components/MainChat";
import MobChat from "@/components/MobChat";
import Test from "@/components/Test";
export default {
  name: "Chats",
  components:{
    MainChat,MobChat,
    // Test
  }


}
</script>

<style scoped>
</style>
