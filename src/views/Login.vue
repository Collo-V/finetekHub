<template>
  <div class="w-full h-screen-h relative overflow-hidden">
   <div class="w-full h-screen-h flex justify-center items-center">
     <div class="w-full h-full w3r-dot absolute left-0 top-0"></div>
      <div class="w-full lg:w-1/2 lg:min-w-400px lg:max-w-450px rounded-md lg:shadow-md h-400px px-5 py-6 flex flex-col items-center bg-white z-10">
        <h3 class="text-center text-8">Welcome back!</h3>
        <form action="" id="login-form" class="w-full flex flex-col justify-center items-center text-3" @submit.prevent="">
          <fieldset class="outline-none mt-4 w-4/5">
            <label class="block mb-2 font-bold">Username or email</label>
            <input type="text" class="border-grey border-1px rounded-md h-10 w-full outline-none"
                   v-model="creds.username">
          </fieldset>
          <fieldset class="outline-none mt-4 w-4/5">
            <label class="block mb-2 font-bold">Password</label>
            <input type="password" class="border-grey border-1px rounded-md h-10 w-full outline-none"
                   v-model="creds.password">
          </fieldset>
          <div class="text-red text-3 hidden mt-2" id="invalid-cred-error">*Invalid credentials</div>
          <fieldset class="outline-none mt-4 w-4/5">
            <router-link to="/" class="w-full text-right block hover:underline text-primary">Forgot password?</router-link>
          </fieldset>
          <fieldset class="outline-none mt-4 w-4/5">
            <button class="h-10 w-full bg-primary text-white rounded-md focus:outline-none font-bold"
                    @click="Login()">Log In</button>
          </fieldset>
        </form>
      </div>
    </div>
    <div class="absolute h-screen-h-50 w-full btm-0 left-0 z-0 flex flex-col pt-150px">
      <div class="custom-shape-divider-bottom-1650528987 z-0">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
        </svg>
      </div>
      <div class="btm-purple h-400px bg-primary-purple w-full absolute btm-0" style="top:260px"></div>
    </div>
  </div>

</template>

<script>
import {isEmail} from "@/commons";
import {db,team} from "@/firebase";
import {getDoc,onSnapshot,setDoc,doc,query,where,getDocs,deleteDoc,updateDoc,collection} from 'firebase/firestore'
import {signInWithEmailAndPassword,getAuth,signOut} from 'firebase/auth'
export default {
  name: "Auth",
  data(){
    return{
      creds:{}
    }
  },
  methods:{
    async Login(){
      // signOut(getAuth())
      // return
      document.getElementById('invalid-cred-error').classList.add('hidden')
      let username = this.creds.username
      let password = this.creds.password
      if(!username||!password){
        //please fill the form
        return
      }
      let email
      if(!isEmail(username)){
        let c = (await getDocs(query(team, where('username', '==', username)))).docs[0]
        email = c?c.id:'no-email'
      }else{
        email = username
      }
      try {
        let user = await signInWithEmailAndPassword(getAuth(), email, password)
        await this.$router.replace({name: 'home'})
      }
      catch (error) {
        if(error.code=='auth/wrong-password' || error.code == 'auth/user-not-found'
            || error.code == 'auth/wrong-email') {
            console.log(error.code)
          document.getElementById('invalid-cred-error').classList.remove('hidden')
        }
      }
      // let email = !isEmail(username)?

    }

  },
  mounted() {
    document.getElementById('admin-nav').classList.add('hidden')
    document.getElementById("page-cont").classList.remove('mt-16','ml-200px')
    // document.getElementById('footer-bar').classList.add('hidden')
  },
  beforeUnmount() {
    document.getElementById('admin-nav').classList.remove('hidden')
    // document.getElementById('footer-bar').classList.remove('hidden')
    document.getElementById("page-cont").classList.add('mt-16','ml-200px')
  }
}

</script>

<style scoped>
.custom-shape-divider-bottom-1650528987 {
  position:absolute;
  top:150px ;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-bottom-1650528987 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 112px;
  transform: rotateY(180deg);
}

.custom-shape-divider-bottom-1650528987 .shape-fill {
  fill: #262162;
}

.w3r-dot {

}

</style>