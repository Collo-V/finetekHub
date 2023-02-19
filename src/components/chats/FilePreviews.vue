<template>
  <div class="fixed top-0 bottom-0 w-screen-w left-0 bg-slate-600/50 z-10 flex items-center justify-center"
       @click="CheckClickOutside($event)">
    <div class="w-80% min-h-screen-h-80 bg-slate-600/90 rounded-lg p-4 relative flex justify-center border-1px rounded-sm" ref="contRef">
      <button class="absolute top-0 right-0 h-8 w-8 m-4 text-gray-600 bg-white rounded-full" @click="$emit('HideModal')">
        <i class="fas fa-xmark"></i>
      </button>
      <div class="mx-auto w-full">
        <div v-if="isImage">
          <div v-for="(file,index) in files" class="relative">
            <img :src="file.url" alt="" v-if="index === fileIndex">
            <div class="mt-4 flex justify-between">
              <div class="scaling flex">

              </div>
              <div class="scaling flex">
                <button class="h-8 w-8 text-5 " @click="$emit('Download',file)">
                  <i class="fa-solid fa-cloud-arrow-down"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-for="(file,index) in files" class="relative">
            <div class="relative overflow-hidden min-h-screen-h-80 border-1px mt-2 w-full">
              <div class="absolute h-full w-5 bg-white top-0 right-0 z-1"></div>
              <div class="absolute -left-10px overflow-hidden bottom-0 -top-56px -right-10px">
                <iframe :src="file.url" alt=""
                        class="w-full min-h-screen-h bg-blue-300"
                ></iframe>
              </div>
            </div>
            <div class="mt-4 flex justify-between">
              <div class="scaling flex">

              </div>
              <div class="scaling flex">
                <button class="h-8 w-8 text-5 " @click="$emit('Download',file)">
                  <i class="fa-solid fa-cloud-arrow-down"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "FilePreviews",
  emits:['HideModal'],
  props:['files','isImage'],
  data(){
    return{
      fileIndex:0
    }
  },
  methods:{
    CheckClickOutside(event){
      let target = event.target
      let isOutside = this.$refs.contRef && !this.$refs.contRef.contains(target) &&
          target.tagName !== 'BUTTON' && target.parentNode.tagName !== 'BUTTON' &&
          target.parentNode.parentNode.tagName !== 'BUTTON'


      if(isOutside){
        this.$emit('HideModal')
      }
    },

  },
}
</script>

<style>
embed #tooltip{
  display: none;
}

</style>
