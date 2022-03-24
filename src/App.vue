<template>
    <div class="relative text-14px">
        <Nav/>
      <router-view></router-view>

      <Footer/>



    </div>
</template>

<script>
import Slide from './components/Slide.vue'
import Clients from './components/Clients'
import Other from './components/Other.vue'
import Nav from "@/components/Nav";
import Offers from './components/Offers'
import ClientSuccess from "@/components/ClientsSuccess";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";
import News from "@/components/News";
import Offices from "@/components/Offices";
import Footer from "@/components/Footer";
import Team from "@/views/Team";

export default {
  name: 'App',
  components: {
    Team,
    Footer,
    Offices,
    Contact,
    Awards,
    ClientSuccess,
      Nav,
    Clients,Other,Slide,Offers,
    News
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
/**top and right**/
.top-0{top: 0px}
.top-10{top:10%}
.top-quarter{top: 25%}
.top-1\/2{top: 50%}
.top-3\/4{bottom:100%}
.top-full{top:100%}

.btm-0{bottom: 0px}
.btm-1\/4{bottom: 25%}
.btm-1\/10{bottom: 10%}
.btm-1\/5{bottom: 20%}
.btm-1\/2{bottom: 50%}
.btm-full{bottom:100%}
.btm-3\/4{bottom:75%}
.btm-90{bottom: 90%}
.btm-1\/10{bottom:10%}
.btm-3\/4{bottom:75%}
.btm-90{bottom: 90%}
.-btm-20px{}

.left-0{left:0px}
    .left-1\/10{left: 10%}
    .left-1\/5{left: 20%}
    .left-1\/4{left: 25%}
    .left-1\/3{left: 33.3%}
    .left-1\/2{left: 50%}
    .left-2\/3{left: 66.6%}
    .left-full{left:100%}
    .left-3\/4{left:75%}
    .left-90{left: 90%}
    .left-1\/10{left:10%}
    .left-3\/4{left:75%}
    .left-90{bottom: 90%}
    .-btm-20px{}


.right-0{right:0px}
.right-10{right:10%}
.right-full{right:100%}


.opacity-25{opacity: .25}
.opacity-50{opacity: .5}
.opacity-75{opacity: .75}

.whitespace-nowrap{white-space: nowrap}
.whitespace-wrap{white-space: normal}

  .leading-10{line-height: 30px}
  .list-none{list-style: none;}
</style>
