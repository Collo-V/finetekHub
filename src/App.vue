<template>
  <div class="fixed h-screen-h w-full text-14px flex" v-if="$store.state.checkedUser">
    <div class="hidden lg:block">
      <Nav/>
    </div>
    <div class="lg:hidden">
      <MobNav/>
    </div>
    <div class="page-cont w-full mt-16" id="page-cont">
      <router-view></router-view>

    </div>
  </div>
  <Loader v-else/>

</template>

<script>
import Nav from "@/components/Nav";
import MobNav from "@/components/MobNav";
import Loader from "@/components/Loader";
import {Report} from "@/commons/swal";



export default {
  name: 'App',
  components:{
    Nav,Loader,MobNav
  },
  methods:{
    OnlineStatus(online){
      let obj={
        position:'bottom-left',
        title:online?'Back online':'You are offline',
        icon:online?'success':'error'
      }
      Report(obj)
      console.log('sent')
      return
    }
  },
  mounted() {
    if (window.performance) {
      // console.info("window.performance works fine on this browser");
    }
    // console.info(performance.navigation.type);
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      // logout
    } else {
      // console.info( "This page is not reloaded");
    }
    window.addEventListener('offline',this.OnlineStatus(false))
    window.addEventListener('online',this.OnlineStatus(true))

  },
  beforeMount() {
    this.$store.dispatch('CheckUser')
    this.$store.commit('GetClientMessages')
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
    .left-90{left: 90%}
    .-btm-20px{}


.right-0{right:0px}
.right-10{right:10%}
.right-full{right:100%}
.right-1\/2{right:50%}


.opacity-25{opacity: .25}
.opacity-50{opacity: .5}
.opacity-75{opacity: .75}

.whitespace-nowrap{white-space: nowrap}
.whitespace-wrap{white-space: normal}

.text-ellipsis{text-overflow: ellipsis;overflow: hidden;white-space: nowrap}

  .leading-10{line-height: 30px}
  .list-none{list-style: none;}



    .custom-scroll::-webkit-scrollbar {
      width: 5px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: gray;
      border-radius: 10px;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #98CB00;
    }







    /*Dropdown*/
    .dropdown-cont:hover >.dropdown{
      display: initial;
    }
    .dropdown{display: none}

    .form-label{transform: translateY(-50%)}
    .form-input:focus + .form-label,.prefilled-form .form-input+.form-label,.input-valid + .form-label,
    .input-invalid + .form-label{top: 0;color: #1476f2;font-size: smaller}
    .next-circle{background: #1865c7;}
    .input-invalid~.validity-checker .invalid{display: initial;}
    .input-valid~.validity-checker .valid{display: initial;}
    /*.font-bold *{font-weight: bold}*/
</style>
