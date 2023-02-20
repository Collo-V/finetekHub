<template>
  <div class="fixed top-0 bottom-0 w-screen-w left-0 bg-slate-600/50 z-10 flex items-center justify-center"
       @click="CheckClickOutside($event)">
    <div class="w-80% h-screen-h-80 rounded-lg relative flex justify-center border-1px rounded-sm"
         :style="`background: url('${files[fileIndex].url}') no-repeat center/cover`"
         ref="contRef">
      <div class=" bg-slate-600/90 top-0 bottom-0 left-0 right-0 absolute rounded-lg"></div>
      <button class="absolute top-0 right-0 h-8 w-8 m-4 text-gray-600 bg-white rounded-full z-2" @click="$emit('HideModal')">
        <i class="fas fa-xmark"></i>
      </button>
      <div class="mx-auto w-full h-full relative z-1 p-4" ref="contRef" id="prev-cont">
        <div v-for="(file,index) in files" class="relative w-full h-full flex items-center justify-between flex-col">
          <div class="h-full w-full flex items-center justify-center overflow-hidden">
            <img :src="selectedFile.url" alt="" v-if="isImage" :class="imageClass"
                 :style="zoomStyle"
            >
            <div v-else class="w-full h-full">
              <iframe :src="selectedFile.url" class="w-full h-full" :style="zoomStyle"/>
            </div>
          </div>
          <div class="mt-4 flex justify-between w-full">
            <div class="scaling flex gap-4 text-white">
              <button class="w-8 h-8 rounded-sm border-1px">
                <i class="fas fa-refresh"></i>
              </button>
              <div class="border-1px w-150px rounded-sm flex gap-2">

                <Tooltip
                    placement="top"
                    overlayClassName=""
                >
                  <template #title>
                    Zoom out
                  </template>
                  <button class="shrink-0 w-8 h-8 rounded-sm rotate-90"  @click="Zoom(-10)">
                    |
                  </button>
                </Tooltip>


                <div class="w-100px">
                  <Slider v-model:value="zoom"
                          class="w-full"
                          style="width: 100px"
                          :min="minZoom"
                          :max="maxZoom"
                  />
                </div>
                <Tooltip
                    placement="top"
                    overlayClassName=""
                >
                  <template #title>
                    Zoom in
                  </template>
                  <button class="shrink-0 w-8 h-8 rounded-sm" @click="Zoom(10)">
                    <i class="fas fa-plus"></i>
                  </button>
                </Tooltip>
              </div>

            </div>
            <div class="scaling flex">
              <button class="h-8 w-8 text-5 text-white " @click="$emit('Download',file)">
                <i class="fa-solid fa-cloud-arrow-down"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="w-full hidden">
          <div v-for="(file,index) in files" class="relative h-full w-full">
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
import {Slider,Tooltip} from "ant-design-vue";

export default {
  name: "FilePreviews",
  emits:['HideModal'],
  props:['files','isImage'],
  components:{
    Slider,Tooltip
  },
  data(){
    return{
      fileIndex:0,
      zoom:50,
      minZoom:30,
      maxZoom:100,
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
    Zoom(n){
      if(this.zoom+n < this.minZoom || this.zoom+n >this.maxZoom) {
        return
      }
      this.zoom +=n
    },
  },
  computed:{
    imageClass(){
      // let renderHeight,renderWidth
      // console.log(document.getElementById('prev-cont'))
      let contWidth = Math.floor(document.body.offsetWidth*(80/100))-32
      // let contHeight = Math.floor(document.body.offsetHeight*(80/100))-32
      let image = new Image()
      image.src = this.files[this.fileIndex].url
      // let ratio = image.naturalWidth/image.naturalHeight
      this.maxZoom = Math.round((contWidth/image.naturalWidth)*100)
      if(this.zoom>this.maxZoom)this.zoom = this.maxZoom
      // if(image.naturalHeight > contHeight){
      //   renderHeight = (80/100)*contHeight
      //   renderWidth = renderHeight*ratio
      // }else {
      //   renderWidth = contWidth
      //   renderHeight = contWidth/ratio
      // }
      return ``
    } ,
    zoomStyle(){
      return{
        transform: `scale(${this.zoom/100})`
      }
    },
    selectedFile(){
      return this.files[this.fileIndex]
    }

  }
}
</script>

<style>
embed #tooltip{
  display: none;
}

</style>
