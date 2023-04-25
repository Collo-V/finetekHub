<template>
  <div>
    <div class="border-b-1px">
      <h1 class="font-bold text-5">Account details</h1>
    </div>
    <div class="mt-4 max-w-800px">
      <form action="" class="w-full" id="details-form">
        <div class="flex flex-col lg:flex-row gap-3 mb-5">
          <fieldset class="h-10 w-full relative">
            <input class="input-valid form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
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
            <input class="input-valid form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
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
        <div class="mb-5">
          <fieldset class="h-10 w-full relative">
            <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px input-valid"
                   id="email" v-model="user.email" disabled>
            <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
              <label class="bg-white cursor-text px-1">Email*</label>
            </div>
          </fieldset>
        </div>
        <div class="flex flex-col lg:flex-row gap-3 mb-5">
          <fieldset class="h-10 w-full relative">
            <input class="input-valid form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                   id="username" v-model="user.username" disabled>
            <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
              <label class="bg-white cursor-text px-1">Username*</label>
            </div>
          </fieldset>
          <fieldset class="h-10 w-full relative">
            <input class="input-valid form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                   id="phone" @blur="Validate($event.target.id)"
                   v-model="user.phone" @paste.prevent @drop.prevent
                   @keydown.prevent="HandleInput">
            <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
              <label class="bg-white cursor-text px-1">Phone*</label>
            </div>
            <div class="validity-checker h-0 w-fit absolute mr-4 right-0 top-1/2 btm-1/2 flex items-center justify-end">
              <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
              <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
            </div>
          </fieldset>
        </div>
        <div class="flex flex-col lg:flex-row gap-3 mb-5">
          <fieldset class="h-10 w-full relative">
            <input class="input-valid form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                   id="position" v-model="user.position" disabled>
            <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
              <label class="bg-white cursor-text px-1">Position*</label>
            </div>
          </fieldset>
          <fieldset class="h-10 w-full relative">

          </fieldset>
        </div>
      </form>
      <div class="flex justify-end mt-4">
        <button class="w-120px h-8 bg-primary text-white rounded-md" @click="Save">
          Save Changes
        </button>
      </div>
    </div>
    <span class="hidden">{{my}}</span>
  </div>

</template>

<script>
import {mapState} from "vuex";
import {formIsValid, validateInp} from "@/commons";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "@/firebase";
import {Report} from "@/commons/swal";

export default {
  name: "Details",
  data(){
    return{
      user:{}
    }
  },
  methods:{
    Validate(id){
      validateInp(id)
    },
    HandleInput(event){
      let {key} = event
      if(!isNaN(key) && this.user.phone.length<10){
        this.user.phone +=key
      }else if (key === 'Backspace'){
        this.user.phone = this.user.phone.slice(0,this.user.phone.length-1)
      }

    },
    async Save(){
      if(!formIsValid('details-form'))return
      try{
        await updateDoc(doc(db,'team',this.user.email),this.user)
        Report({icon:'success',title:'Profile updated'})
      }catch {
        Report({icon:'error',title:'Could not update'})
      }
    }
  },
  computed:mapState({
    my({user}){
      this.user = JSON.parse(JSON.stringify({...user}))
      return user
    },
  }),
  mounted(){
    this.my
  }
}
</script>

<style scoped>

</style>
