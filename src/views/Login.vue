<template>
  <div class="w-full h-screen-h relative">
   <div class="w-full h-screen-h flex justify-center items-center">
     <div class="w-full h-full w3r-dot absolute left-0 top-0"></div>
      <div class="w-full lg:w-1/2 lg:min-w-400px lg:max-w-450px border-t-1px
      rounded-md lg:shadow-md h-400px px-5 py-6 flex flex-col items-center bg-white z-10"
           v-if="!passwordRecovery">
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
            <button @click="Check" type="button" class="w-full text-right block hover:underline text-primary">Forgot password?</button>
          </fieldset>
          <fieldset class="outline-none mt-4 w-4/5">
            <button class="h-10 w-full bg-primary text-white rounded-md focus:outline-none font-bold"
                    @click="Login()">Log In</button>
          </fieldset>
        </form>
      </div>
     <div class="w-full lg:w-1/2 border-t-1px lg:min-w-400px lg:max-w-450px rounded-md lg:shadow-md h-400px px-5 py-6 flex flex-col items-center bg-white z-10"
      v-else-if="!emailSent">
        <h3 class="text-center text-8">Recover your password!</h3>
        <form action="" id="password-recovery" class="w-full flex flex-col justify-center items-center text-3" @submit.prevent="">
          <fieldset class="outline-none mt-4 w-4/5">
            <label class="block mb-2 font-bold">Enter your email</label>
            <input type="text" class="border-grey border-1px rounded-md h-10 w-full outline-none"
                   @blur="Validate($event.target)"
                   v-model="creds.email">
          </fieldset>

         <fieldset class="outline-none mt-4 w-4/5">
            <button class="h-10 w-full bg-primary text-white rounded-md focus:outline-none font-bold"
                    type="button"
                    @click="RecoverPassword">Send instructions</button>
          </fieldset>
        </form>
      </div>
     <div class="w-full lg:w-1/2 border-t-1px lg:min-w-400px lg:max-w-450px rounded-md lg:shadow-md h-400px px-5 py-6 flex flex-col items-center bg-white z-10"
      v-else>
        <h3 class="text-center text-8">Instructions sent</h3>
        <div class="w-full flex flex-col justify-center items-center text-3" @submit.prevent="">
          We have sent an email to the address
          registered with this account containing further
          instructions to recovery your password
        </div>
      </div>
    </div>
    <div class="fixed h-screen-h-50 w-full bottom-0 left-0 z-0 flex flex-col">
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
import {isEmail, validateInp} from "@/commons";
import {db,team} from "@/firebase";
import {query,where,getDocs} from 'firebase/firestore'
import {signInWithEmailAndPassword,getAuth,sendPasswordResetEmail} from 'firebase/auth'
export default {
  name: "Auth",
  data(){
    return{
      creds:{},
      passwordRecovery:false,
      emailSent:false,
    }
  },
  watch:{
    passwordRecovery(val){
      console.log(val)
    }
  },
  methods:{
    Check(){
      console.log('wtf')
      this.passwordRecovery = true
    }  ,
    async Login(){
      // signOut(getAuth())
      // return
      let credError = document.getElementById('invalid-cred-error')
      credError.classList.add('hidden')
      let username = this.creds.username
      let password = this.creds.password
      if(!username||!password){
        //please fill the form
        return
      }
      let email
      if(!isEmail(username)){
        let c = (await getDocs(query(team, where('username', '==', username)))).docs[0]
        console.log(c)
        email = c?c.id:'no-email'
      }else{
        email = username
      }
      if(!isEmail(email)){
        credError.classList.remove('hidden')
        return
      }
      try {
        let user = await signInWithEmailAndPassword(getAuth(), email, password)
        this.$router.replace({name: 'chats'})
      }
      catch (error) {
        if(error.code=='auth/wrong-password' || error.code == 'auth/user-not-found'
            || error.code == 'auth/wrong-email') {
            console.log(error.code)
          credError.classList.remove('hidden')
        }
      }
      // let email = !isEmail(username)?

    },
    async RecoverPassword(){
      if(!isEmail(this.creds.email))return
      await sendPasswordResetEmail(getAuth(),this.creds.email)
      this.emailSent = true
    },
    Validate(target){
      validateInp(target)
    }

  },
  mounted() {
    // document.getElementById('admin-nav').classList.add('hidden')
    // document.getElementById("page-cont").classList.remove('mt-16','ml-200px')
    // document.getElementById('footer-bar').classList.add('hidden')
  },
  beforeUnmount() {
    // document.getElementById('admin-nav').classList.remove('hidden')
    // // document.getElementById('footer-bar').classList.remove('hidden')
    // document.getElementById("page-cont").classList.add('mt-16','ml-200px')
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
