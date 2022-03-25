<template>
  <div class="w-full bg-grey-bg">
          <Slide/>
          <Offers/>
          <Clients/>
          <ClientsSuccess/>
          <Awards/>
          <Contact/>
          <News/>
<!--          <Offices/>-->
  </div>
</template>

<script>
import Slide from "@/components/Slide";
import Clients from "@/components/Clients";
import ClientsSuccess from "@/components/ClientsSuccess";
import Contact from "@/components/Contact";
import News from "@/components/News";
import Offices from "@/components/Offices";
import Offers from "@/components/Offers";
import Awards from "@/components/Awards";

export default {
  name: "Home",
  components:{
    Slide,Clients,ClientsSuccess,Contact,News,Offers,Offices,Awards
  }
}
</script>

<style scoped>

</style>