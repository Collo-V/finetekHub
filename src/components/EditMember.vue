<template>
  <div class="h-screen-h w-full bg-gray-500/75 fixed top-0 left-0 z-10 flex justify-center items-center"
       @click="CheckClickOutside" ref="contRef">
    <div class="bg-white w-90% h-300px lg:w-500px p-4 rounded-md" ref="formRef">
      <h2 class="mb-2 py-2 px-2" v-show="editing==''">
        {{editing==''? 'Add new member':'Edit member'}}
      </h2>
      <form action="" class="w-full" id="member-form">
        <div class="flex flex-col lg:flex-row gap-3 mb-3">
          <fieldset class="h-10 w-full relative">
            <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                   id="firstName" @blur="Validate($event.target.id)" v-model="newMember.firstName">
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
                   id="lastName" @blur="Validate($event.target.id)" v-model="newMember.lastName">
            <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
              <label class="bg-white cursor-text px-1">Last Name*</label>
            </div>
            <div class="validity-checker h-0 w-fit absolute mr-4 right-0 top-1/2 btm-1/2 flex items-center justify-end">
              <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
              <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
            </div>
          </fieldset>
        </div>
        <div class="flex flex-col lg:flex-row gap-3 mb-3">
          <fieldset class="h-10 w-full relative">
            <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                   id="email" @blur="Validate($event.target.id)" v-model="newMember.email">
            <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
              <label class="bg-white cursor-text px-1">Email*</label>
            </div>
            <div class="validity-checker h-0 w-fit absolute mr-4 right-0 top-1/2 btm-1/2 flex items-center justify-end">
              <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
              <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
            </div>
            <div class="text-red-500 text-12px hidden" id="duplicate-email-error">a user with the email already exists</div>
          </fieldset>
        </div>
        <div class="flex flex-col lg:flex-row gap-3 mb-3 items-center">
          <fieldset class="h-10 w-full relative mb-3">
            <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                   id="position" @blur="Validate($event.target.id)" v-model="newMember.position">
            <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
              <label class="bg-white cursor-text px-1">Position*</label>
            </div>
            <div class="validity-checker h-0 w-fit absolute mr-4 right-0 top-1/2 btm-1/2 flex items-center justify-end">
              <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
              <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
            </div>
          </fieldset>
          <fieldset class="h-10 w-full relative mb-3 flex items-center mr-3 items-center">
            <input type="checkbox" v-model="newMember.isAdmin" id="isAdmin" class="mr-2 h-5 w-5">
            <label for="isAdmin">Give admin privileges</label>
          </fieldset>

        </div>
        <div class=" text-red-500 text-12px hidden" id="error-alert">Please correct the mistake(s) before proceeding</div>
        <div class="flex justify-end px-2">
          <button class="h-10 w-150px focus:outline-none bg-grey-light rounded-md mr-2"
                  type="button" @click="ClearForm()">Cancel</button>
          <button class="h-10 w-150px focus:outline-none bg-primary text-white rounded-md"
                  type="button" @click="AddMember()">Add</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import {checkClickOutside} from '@/commons/eventHandlers'
import {mapState} from "vuex";
export default {
  name: "EditMember",
  props:['member'],
  data(){
    return{
      newMember:{

      }
    }
  },
  methods:{
    CheckClickOutside(event){
      checkClickOutside(event,this.$refs.contRef,this.$emit,'HideModal')
    }
  },
  computed:mapState({
    user:state => state.user
  })
}
</script>

<style scoped>

</style>
