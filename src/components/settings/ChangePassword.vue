<template>
  <div>
    <div class="border-b-1px">
      <h1 class="font-bold text-5">Change password</h1>
      <p>Please enter your current password to change you password</p>
    </div>
    <div class="border-b-1px py-4 flex items-center gap-4">
      <label class="shrink-0 w-full lg:w-200px"> Current password</label>
      <div class="w-full">
        <InputPassword
            v-model:value="currentPassword"
            class="w-full max-w-300px h-10 overflow-hidden flex items-center focus:outline-0 input-invalid"
            id="current-password"
            @blur="Validate('invalid-password')"
        />

      </div>
    </div>
    <div class="border-b-1px py-4 flex items-center gap-4">
      <label class="shrink-0 w-full lg:w-200px"> New password</label>
      <div class="w-full">
        <InputPassword
            v-model:value="newPassword"
            class="w-full max-w-300px h-10 overflow-hidden flex items-center focus:outline-0"
            id="new-password"
        />
        <div class="text-3 text-red-500 hidden" id="same-password-error">
          * try using a different password
        </div>
        <div class="text-3 mb-2">
          * Passwords must be at least 8 characters long containing lowercase, uppercase special character and a number
        </div>
        <div class="h-6px w-200px max-w-full grid grid-cols-3 mb-3 rounded-pill px-3 mt-2" v-if="newPassword !== ''">
          <div class="h-full border-1px rounded-pill bg-red-500" v-if="passwordStatus === 'weak'"></div>
          <div class="h-full border-1px rounded-pill bg-yellow-500"  v-else-if="passwordStatus === 'strong'"></div>
          <div class="h-full border-1px rounded-pill bg-green-500"  v-else-if="passwordStatus === 'very strong'"></div>
          <div class="h-full border-1px rounded-pill" v-if="passwordStatus === 'weak'"></div>
          <div class="h-full border-1px rounded-pill bg-yellow-500"  v-else-if="passwordStatus === 'strong'"></div>
          <div class="h-full border-1px rounded-pill bg-green-500"  v-else-if="passwordStatus === 'very strong'"></div>
          <div class="h-full border-1px rounded-pill"  v-if="passwordStatus !== 'very strong'"></div>
          <div class="h-full border-1px rounded-pill bg-green-500"  v-else></div>
        </div>
      </div>
    </div>
    <div class="border-b-1px py-4 flex items-center gap-4">
      <label class="shrink-0 w-full lg:w-200px"> Renter new password</label>
      <InputPassword
          v-model:value="newPassword2"
          class="w-full max-w-300px h-10 overflow-hidden flex items-center focus:outline-0"
          id="new-password2"
      />
    </div>
    <div class="flex justify-end mt-4">
      <button class="w-120px h-8 bg-primary text-white rounded-md" @click="ChangePassword">
        Reset password
      </button>
    </div>
  </div>

</template>

<script>
import {validateInp} from "@/commons";
import {InputPassword} from "ant-design-vue";
import {mapState} from "vuex";
import {getAuth,updatePassword,signInWithEmailAndPassword} from "firebase/auth";
import {Report} from "@/commons/swal";

export default {
  name: "ChangePassword",
  components:{
    InputPassword,
  },
  data(){
    return{
      currentPassword:'',
      newPassword:'',
      newPassword2:'',
      passwordStatus:'weak'

    }
  },
  methods:{
    Validate(id){
      return
      // console.log(event)
      validateInp(id)
    },
    async ChangePassword(){
      let currentPassInpCont = document.getElementById('current-password').parentNode
      let newPassInpCont = document.getElementById('new-password').parentNode
      let newPassInp2Cont = document.getElementById('new-password2').parentNode
      let samePassErr = document.getElementById('same-password-error')
      samePassErr.classList.add('hidden')
      newPassInpCont.style.borderColor = null
      newPassInp2Cont.style.borderColor = null
      currentPassInpCont.style.borderColor = null
      let invalid = false
      if(this.passwordStatus==='weak'){
        newPassInpCont.style.borderColor = '#EF4444'
        invalid = true
      }
      if(this.newPassword.length>=8 &&this.currentPassword.length>=8 && this.newPassword===this.currentPassword){
        samePassErr.classList.remove('hidden')
        invalid = true
      }
      if(this.newPassword !== this.newPassword2){
        newPassInp2Cont.style.borderColor = '#EF4444'
        invalid = true
      }
      if(this.currentPassword.length<8){
        currentPassInpCont.style.borderColor = '#EF4444'
        invalid = true
      }
      if(invalid)return
      try{
        await signInWithEmailAndPassword(getAuth(),this.user.email,this.currentPassword)
      } catch (e){
        if(e.code && e.code.includes('password')){
          currentPassInpCont.style.borderColor = '#EF4444'
        }
        else {
          Report({title:'Could not not verify credentials',icon:'error'})
        }
        invalid = true
      }
      if(invalid)return
      try {
        let user = getAuth().currentUser
        await updatePassword(user,this.newPassword)
        Report({title:'Password reset',icon:'success'})
        window.location.reload()
      } catch (e) {
        Report({title:'Could not not reset password',icon:'error'})

      }



    },
  },
  computed:mapState({
    user:state => state.user,
  }),
  watch:{
    newPassword(val){
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
  }

}
</script>

<style scoped>
/*.ant-input-affix-wrapper{*/
/*  @apply border-0*/
/*}*/
/*.ant-input-affix-wrapper > input.ant-input{*/
/*  @apply border-1px border-solid*/
/*}*/

</style>
