<template>
  <div class="fixed top-0 bottom-0 w-screen-w left-0 bg-slate-600/50 z-10 flex items-center justify-center"
       @click="CheckClickOutside($event)">
    <div class="w-full max-w-500px max-h-400px bg-white rounded-lg p-4 relative" ref="contRef">
      <button class="float-right h-5 w-5 text-gray-600" @click="$emit('HideModal')">
        <i class="fas fa-xmark"></i>
      </button>
      <div v-if="!created">
        <h1 class="text-5">Create a channel</h1>
        <p class="mt-2">Channels are where you communicate with colleagues</p>
        <form class="mt-4" @submit.prevent id="channel-form">
          <div class="flex flex-col gap-3 mb-3">
            <fieldset class="h-10 w-full relative">
              <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px"
                     id="name" @blur="Validate($event.target.id)" v-model="channel.name">
              <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
                <label class="bg-white cursor-text px-1">Channel name*</label>
              </div>
              <div class="validity-checker h-0 w-fit absolute mr-4 top-1/2 btm-1/2 right-0 flex items-center justify-end">
                <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
                <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
              </div>
            </fieldset>
            <fieldset class="h-10 w-full relative">
              <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px optional"
                     id="lastName" v-model="channel.description">
              <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
                <label class="bg-white cursor-text px-1">Description</label>
              </div>
              <div class="validity-checker h-0 w-fit absolute mr-4 right-0 top-1/2 btm-1/2 flex items-center justify-end">
                <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
                <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
              </div>
            </fieldset>
          </div>
          <div class="mt-4">
            <h1>Make private</h1>
            <div class="flex justify-between items-center">
              <div class="">
                Private channels can only be joined by invitations
              </div>
              <button class="w-80px h-8 rounded-pill bg-primary border-1px relative px-2 flex items-center justify-between"
                      v-if="channel.isPrivate"
                      @click="channel.isPrivate = false"
              >
              <span class="h-5 w-5 inline-block text-white text-5 font-bold ml-2">
                <i class="fas fa-check"></i>
              </span>
                <span class="h-5 w-5 rounded-full bg-white inline-block"></span>
              </button>
              <button class="w-80px h-8 rounded-pill border-1px px-2 flex items-center justify-between"
                      v-else @click="channel.isPrivate = true"
              >
                <span class="h-5 w-5 rounded-full bg-gray-400 inline-block"></span>
              </button>
            </div>
          </div>
          <div class="mt-8 flex justify-end">
            <button class="w-120px h-8 rounded-md bg-primary text-white" @click="CreateChannel">
              Create
            </button>
          </div>
        </form>
      </div>
      <div v-else>
        <h1 class="text-5">Add people to {{channel.name}}</h1>
        <div class="mt-4">
          <fieldset class="h-10 w-full relative">
            <input class="form-input pl-4 w-full h-10 flex items-center rounded-sm focus:outline-none border-1px optional"
                   id="member-list" v-model="channel.name">
            <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
              <label class="bg-white cursor-text px-1">Add members</label>
            </div>
            <div class="validity-checker h-0 w-fit absolute mr-4 top-1/2 btm-1/2 right-0 flex items-center justify-end">
              <span class="hidden valid text-green-500"><i class="fa-solid fa-check"></i></span>
              <span class="hidden invalid text-red-500"><i class="fa-solid fa-triangle-exclamation"></i></span>
            </div>
          </fieldset>
          <div class="mt-8 flex justify-end gap-4">
            <button class="w-120px h-8 rounded-md border-1px" @click="CreateChannel">
              Skip for now
            </button>
            <button class="w-120px h-8 rounded-md bg-primary text-white" @click="CreateChannel">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {formIsValid, Validate} from "@/commons";
import {addDoc} from "firebase/firestore";
import firebase from "firebase/compat";

export default {
  name: "AddChannels",
  data(){
    return{
      channel:{
        isPrivate:false,
        members:[]
      },
      created:true,
      channelId:undefined
    }
  },
  methods:{
    Validate(id){
      Validate(id)
    },
    async CreateChannel(){
      if(!formIsValid('channel-form'))return
      try{
        let c = await addDoc(dbChannels,{
          ...this.channel,
          created:firebase.firestore.FieldValue.serverTimestamp()
        })
        this.channelId = c.id
        this.created = true
      }catch{}

    },
    CheckClickOutside(event){
      if(this.$refs.contRef && !this.$refs.contRef.contains(event.target)){
        // this.$emit('HideModal')
      }
    }
  }
}
</script>

<style scoped>

</style>
