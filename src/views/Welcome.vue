<template>
  <div class="min-h-screen-h flex items-center justify-center">
    <div v-if="checked" class="w-full min-h-screen-h flex items-center justify-center">
      <div v-if="!name" class="w-full min-h-screen-h flex items-center justify-center">
        <div v-if="!allSet"  class="w-full min-h-screen-h flex items-center justify-center">
          <div class="min-h-250px w-500px shadow-md border-t-1px p-8" v-if="view === 'set-password'">
            <h1 class="mb-3 text-5">First, lets create a strong password</h1>
            <form action="" class="w-full" id="password-form" @submit.prevent>
              <fieldset class="h-10 w-full relative mb-3">
                <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                       id="password1"  type="password"
                       @blur="Validate($event.target.id)" v-model="password" @keyup="CheckPassword">
                <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
                  <label class="bg-white cursor-text px-1">Enter password*</label>
                </div>
                <div class="validity-checker h-0 w-fit absolute mr-4 top-1/2 btm-1/2 right-0 flex items-center justify-end">
                  <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
                  <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
                </div>
                <div class="h-0 w-fit absolute mr-4 top-1/2 right-10 flex items-center justify-end">
                  <button type="button" class="" v-if="passwordHidden" @click="ShowPassword(true)"><i class="fa-solid fa-eye"></i></button>
                  <button type="button" class="" v-else @click="ShowPassword(false)"><i class="fa-solid fa-eye-slash"></i></button>
                </div>
              </fieldset>
              <div class="h-6px w-200px max-w-full grid grid-cols-3 mb-3 rounded-pill px-3" v-if="password !== ''">
                <div class="h-full border-1px rounded-pill bg-red-500" v-if="passwordStatus === 'weak'"></div>
                <div class="h-full border-1px rounded-pill bg-yellow-500"  v-else-if="passwordStatus === 'strong'"></div>
                <div class="h-full border-1px rounded-pill bg-green-500"  v-else-if="passwordStatus === 'very strong'"></div>
                <div class="h-full border-1px rounded-pill" v-if="passwordStatus === 'weak'"></div>
                <div class="h-full border-1px rounded-pill bg-yellow-500"  v-else-if="passwordStatus === 'strong'"></div>
                <div class="h-full border-1px rounded-pill bg-green-500"  v-else-if="passwordStatus === 'very strong'"></div>
                <div class="h-full border-1px rounded-pill"  v-if="passwordStatus !== 'very strong'"></div>
                <div class="h-full border-1px rounded-pill bg-green-500"  v-else></div>
              </div>
              <div class="text-2 mb-2">
                * Passwords must be at least 8 characters long containing lowercase, uppercase special character and a number
              </div>
              <fieldset class="h-10 w-full relative">
                <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                       id="password2" type="password"
                       @blur="Validate($event.target.id)" v-model="password2">
                <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
                  <label class="bg-white cursor-text px-1">Confirm password*</label>
                </div>
                <div class="validity-checker h-0 w-fit absolute mr-4 right-0 top-1/2 btm-1/2 flex items-center justify-end">
                  <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
                  <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
                </div>
              </fieldset>
              <div class="flex flex-col gap-3 mb-3">
              </div>

              <div class=" text-red-500 text-12px hidden" id="password-alert">Please correct the mistake(s) before proceeding</div>
            </form>
            <div class="flex justify-end mt-10">
              <button class="w-150px h-8 bg-primary text-white rounded-md" @click="SetPassword">
                Set password
              </button>
            </div>
          </div>
          <div class="min-h-250px w-500px shadow-md border-t-1px p-8" v-else-if="view === 'set-profile'">
            <h1 class="text-5 mb-3">
              Confirm your details and create username
            </h1>
            <form action="" class="w-full" id="member-form">
              <div class="flex flex-col lg:flex-row gap-3 mb-3">
                <fieldset class="h-10 w-full relative">
                  <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                         id="firstName" @blur="Validate($event.target.id)" v-model="user.firstName">
                  <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
                    <label class="bg-white cursor-text px-1">First Name*</label>
                  </div>
                  <div class="validity-checker h-0 w-fit absolute mr-4 top-1/2 btm-1/2 right-0 flex items-center justify-end">
                    <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
                    <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
                  </div>
                </fieldset>
                <fieldset class="h-10 w-full relative">
                  <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                         id="lastName" @blur="Validate($event.target.id)" v-model="user.lastName">
                  <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
                    <label class="bg-white cursor-text px-1">Last Name*</label>
                  </div>
                  <div class="validity-checker h-0 w-fit absolute mr-4 right-0 top-1/2 btm-1/2 flex items-center justify-end">
                    <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
                    <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
                  </div>
                </fieldset>
              </div>
              <div>
                <fieldset class="h-10 w-full relative">
                  <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                         id="username" v-model="user.username">
                  <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
                    <label class="bg-white cursor-text px-1">Username*</label>
                  </div>
                  <div class="validity-checker h-0 w-fit absolute mr-4 right-0 top-1/2 btm-1/2 flex items-center justify-end">
                    <div class=" bg-white absolute v-center mt-1 hidden top-0 right-0" id="username-check-loader">
                      <div class="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
                    <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
                  </div>
                </fieldset>
                <p id="username-error" class="mt-1 text-red-500 text-3 hidden">
                  A colleague with the same username already exists
                </p>
                <p class="mt-2 text-3">
                  Note that once you pick a username, you cannot change it
                </p>
              </div>
              <div class="">
                <fieldset class="h-10 w-full relative">
                  <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                         id="phone" @blur="Validate($event.target.id)" v-model="user.phone">
                  <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
                    <label class="bg-white cursor-text px-1">Phone*</label>
                  </div>
                  <div class="validity-checker h-0 w-fit absolute mr-4 right-0 top-1/2 btm-1/2 flex items-center justify-end">
                    <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
                    <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
                  </div>
                </fieldset>
              </div>

              <div class=" text-red-500 text-12px hidden" id="error-alert">Please correct the mistake(s) before proceeding</div>
            </form>
            <div class="flex justify-end mt-10">
              <button class="w-150px h-8 bg-primary text-white rounded-md" @click="SetProfile">
                Set profile
              </button>
            </div>
          </div>
          <div class="w-50% shadow-md border-t-1px relative" v-else-if="view === 'set-profile-pic'">
            <div class="bg-white p-8 ">
              <div class="flex">
                <h1 class="text-5">
                  Almost there, let's create you a profile picture
                </h1>
              </div>
              <p>
                You can skip this part and create your profile photo letter in settings
              </p>
              <!--      <div class="flex justify-center items-center gap-4">-->
              <!--        <div class="w-200px h-200px rounded-full border-1px flex justify-center items-center">-->
              <!--          <button class="text-6"><i class="fas fa-camera"></i></button>-->
              <!--        </div>-->
              <!--&lt;!&ndash;            :img="require('../assets/images/team/member1.jpg')"&ndash;&gt;-->

              <!--      </div>-->
              <CropImage :profile-pic="profilePic" @set-profile-pic="(image)=>profilePic = image"/>
              <div class="flex justify-end gap-4">
                <button class="w-150px h-8 border-1px rounded-md" @click="allSet = true">
                  Skip for now
                </button>
                <button class="w-150px h-8 bg-primary/25 text-white rounded-md" v-if="profilePic === ''" disabled>
                  Set profile picture
                </button>
                <button class="w-150px h-8 bg-primary text-white rounded-md" v-else @click="SetProfilePic">
                  Set profile picture
                </button>
              </div>
            </div>
          </div>
          <div class="h-200px w-50% shadow-md border-t-1px p-8 " v-else>
            <div class="flex">
              <h1 class="text-5">
                Welcome on board, {{ GetName }}
              </h1>
              <span class="relative">
        <div class="absolute top-0 left-0 w-150px h-fit v-center mb-4">
          <img :src="require('../assets/images/pngIcons/confetti.png')" alt="" class="w-150px mb-4 -rotate-30">
        </div>
      </span>
            </div>
            <p>Let's start by setting up your profile</p>
            <div class="flex justify-end">
              <button class="w-150px h-8 bg-primary text-white rounded-md" @click="view = 'set-password'">
                Let's go
              </button>
            </div>
          </div>
        </div>
        <div v-else class="h-200px w-50% shadow-md border-t-1px p-8">
          <div class="w-full" >
            <div class="flex">
              <h1 class="text-5">
                Congratulations, All set now
              </h1>
            </div>
            <p>Your awesome journey with Finetek starts here</p>
            <div class="flex justify-end">
              <button class="w-150px h-8 bg-primary text-white rounded-md" @click="$router.push('/')">
                Go to home page
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-50% shadow-md border-t-1px p-8 " v-else>
        <div class="flex">
          <h1 class="text-5">
            Hello, {{name}}. Your profile is already set up
          </h1>
        </div>
        <div class="flex justify-end">
          <button class="w-150px h-8 bg-primary text-white rounded-md" @click="$router.push({name:'login'})">
            Go to login
          </button>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center text-5">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      Checking your invitation details...
    </div>
  </div>
</template>

<script>
import {formIsValid, validateInp} from "@/commons";
import CropImage from "@/components/CropImage";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {doc, getDoc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db, team} from "@/firebase";
import {createUserWithEmailAndPassword as createUser, getAuth} from 'firebase/auth'
import {getDatabase} from "firebase/database";

export default {
  name: "Welcome",
  components: {CropImage},
  data(){
    return{
      user: {},
      allSet:false,
      passwordHidden:true,
      passwordStatus:'weak',
      password:'',
      password2:'',
      profilePic:'',
      view:'',
      checked:false,
      name:undefined,
      option : {
      }
    }
  },
  watch:{
    password(val){
      if(val !== ''){
        if(val.length <8){
          this.passwordStatus = 'weak'
        }else {
          let specialChar,uppercase,number,lowercase,specials
          specials = [ "+", "-", "&&", "||", "!", "(", ")", "{", "}", "[", "]", "^",
            "~", "*", "?", ":","\"","\\",'.',',','@']
          specialChar=uppercase=number=lowercase=false
          for (let i = 0; i < val.length; i++) {
            if (specials.includes(val[i])){
              specialChar = true
            }
            else if (!isNaN(val[i])){
              number = true
            }
            else if (val[i]===val[i].toUpperCase()){
              uppercase=true
            }
            else if (val[i]===val[i].toLowerCase()){
              lowercase=true
            }
          }
          if(specialChar && number && lowercase && uppercase){
            this.passwordStatus = 'very strong'
          } else if(
              (specialChar && number && uppercase) || (specialChar && uppercase && lowercase) ||
              (specialChar && lowercase && number) || (number && uppercase && lowercase)
          ){
            this.passwordStatus = 'strong'
          }else {
            this.passwordStatus = 'weak'
          }
        }

      }else {
        this.passwordStatus = 'weak'
      }
    },
    "$store.state.user"(user){
      if(user.email && this.view === '')this.GetUser()
    },
    view(val){
      if(val === 'set-profile'){
        validateInp('firstName')
        validateInp('lastName')
      }
    },
    'user.username'(username){
      let inp = document.getElementById('username')
      if(username){
        if(username.length<4 ){
          inp.classList.add('input-invalid')
          inp.classList.remove('input-valid')
        }else{
          this.CheckUsername(username)
        }
      }
    }

  },
  computed:{
    GetName(){
      let user = this.$store.getters.GetUser
      if(user.email){
        this.user = user
      }
      return user.firstName
    },
  },
  methods:{
    async CheckUsername(username){
      let q = query(team,where('username','==', username))
      let inp = document.getElementById('username')
      let errorDiv = document.getElementById('username-error')
      let loader = document.getElementById('username-check-loader')
      loader.classList.remove('hidden')
      try {
        let users = (await getDocs(q)).docs
        if(users.length>0){
          inp.classList.remove('input-valid')
          inp.classList.add('input-invalid')
          errorDiv.classList.remove('hidden')
        }else{
          inp.classList.add('input-valid')
          inp.classList.remove('input-invalid')
          errorDiv.classList.add('hidden')
        }

      } catch {

      }
      loader.classList.add('hidden')
    },
    async GetUser(){
      let user =  this.$store.getters.GetUser
      if(!user.email)return
      try {
        let {username,firstName}  = (await getDoc(doc(db, 'team',user.email))) .data()
        if(username) {
          this.name = firstName
        }
      } catch (e) {
        console.log(e)
      }
      this.checked = true
    },
    ShowPassword(show){
      if(show){
        document.getElementById('password1').type = 'text'
        document.getElementById('password2').type = 'text'
        this.passwordHidden = false
      }else{
        document.getElementById('password1').type = 'password'
        document.getElementById('password2').type = 'password'
        this.passwordHidden = true
      }
    } ,
    Validate(id){
      validateInp(id)
    },
    async SetProfile(){
      let validForm = formIsValid('member-form')
      let usernameErr = document.getElementById('username-error')
      console.log(usernameErr.classList)
      if (!usernameErr.classList.contains('hidden')){
        document.getElementById('username')
            .classList.replace('input-valid','input-invalid')
        return
      }
      if(!validForm)return
      try{
        await updateDoc(doc(db, 'team', this.user.email), this.user)
        let database = getDatabase()
        this.$store.dispatch('WriteOnlineStatus')
        this.view = 'set-profile-pic'
      }catch {}
    },
    async SetPassword(){
      if(!formIsValid('password-form'))return
      try{
        await createUser(getAuth(), this.user.email, this.password)
      } catch {

      }
      this.view = 'set-profile'

    },
    async SetProfilePic(){
      console.log(this.profilePic)
      let imgRef = ref(getStorage(), 'team/' + this.user.username)
      try{
        await uploadBytes(imgRef, this.profilePic)
        let imgPath = await getDownloadURL(imgRef)
        await updateDoc(doc(db,'team',this.user.email),{
          image:imgPath
        })
        this.allSet = true
      }catch (e){
        console.log(e)
      }
    },
  },
}
</script>

<style scoped>


</style>
