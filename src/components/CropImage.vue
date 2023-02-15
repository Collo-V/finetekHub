<template>
  <div class="flex justify-center items-center gap-4">
    <div class="w-200px h-200px border-1px rounded-full flex justify-center items-center relative  overflow-hidden">
      <button class="block text-6 absolute top-50% left-50% vh-center z-2" @click="CreateFile" v-show="prevImage === ''"><i class="fas fa-camera"></i></button>

      <img :src="require('../assets/images/pngIcons/user.png')" alt="" class="w-full h-full z-1" v-show="prevImage ===''" v-if="croppedPrev==''">
      <img :src="croppedPrev" alt="" class="w-full h-full" v-if="croppedPrev!==''" ref="imgRef">
    </div>

  </div>
  <div class="fixed h-screen-h w-screen-w top-0 left-0 flex justify-center items-center bg-gray-500/75 z-10" v-show="prevImage!==''" >
    <div class="bg-white p-8 max-w-800px">
      <div class="flex gap-4">
        <img :src="prevImage" alt="" class="max-h-400px" ref="cropImageRef">
        <div class="min-h-200px min-w-200px w-200px h-200px border-1px border-primary img-preview overflow-hidden" id="image-preview"></div>
      </div>
      <div class="mt-4 flex gap-4 justify-end">
        <button class="w-150px h-8 border-1px rounded-md" @click="[prevImage='',image='']">
          Cancel
        </button>
        <button class="w-150px h-8 bg-primary text-white rounded-md" @click="SetCropped">
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/src/index.css'
import {base64StringtoFile} from "@/commons/ImageHandling";
export default {
  name: "CropImage",
  props:['profilePic'],
  data(){
    return{
      prevImage:'',
      image:'',
      added:false ,
      cropper:null,
      cropped:'',
      croppedPrev:''
    }
  },
  watch:{
    prevImage(val,old){
      if(val !== ''){
        // console.log(this.$refs.cropImageRef)
        this.$refs.cropImageRef.src = this.prevImage
        this.cropper = new Cropper( this.$refs.cropImageRef,{
          // aspectRatio:1,
          // initialAspectRatio:1,
          // viewMode:3,
          preview:'#image-preview',
          // crop(event) {
          //   // console.log(event)
          // }
        } )
        // this.cropper.setDragMode('crop')
      }else {
        this.cropper.destroy()
        this.cropper = null
      }
    }
  },
  methods:{
    CreateFile(){
      let input=document.createElement("input");
      input.type="file";
      input.accept=".png,.jpg"
      let files=[]
      let all = this
      input.onchange = e=>{
        files=e.target.files;
        all.image = files[0]
        let reader=new FileReader();
        reader.onload=function(e){
          // console.log(e)
          all.prevImage = e.target.result
        }
        reader.readAsDataURL(files[0]);
        return files
      }
      input.click()
    },
    SetCropped(){
      let canvas = this.cropper.getCroppedCanvas({
        height:200,
        width:200
      })
      this.croppedPrev = canvas.toDataURL()
      this.cropped = base64StringtoFile(this.croppedPrev,'user-name-profile')
      this.$emit('SetProfilePic',this.cropped)
      this.prevImage = ''
    },

    DrawCanvas(top,left){
      console.log(top,left)
      let canvas = document.getElementById('my-canvas')
      let context  = canvas.getContext('2d')
      canvas.height = '150'
      canvas.width = '150'
      let img = this.$refs.imgRef
      img.onload = (e)=>{
        console.log(img.height,img.width)
        context.drawImage(img,0,0,200,200)
        try {
          // console.log(img.naturalHeight)
        }catch {}
      }
      img.src = this.prevImage
    }


  },
  mounted() {
    let all = this
    function Drag(){

      function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0,pos4 = 0;
        elmnt.onmousedown = dragMouseDown;
        let parent = elmnt.parentElement
        function dragMouseDown(e) {
          e = e ||window.event; e.preventDefault();
          // get the mouse cursor position at
          startup: pos3 = e.clientX; pos4 = e.clientY; document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }
        function elementDrag(e) { e = e || window.event;
          e.preventDefault();
          // elmnt.classList.add('absolute')
          // calculate the new cursor position:
          pos1 = pos3 -e.clientX; pos2 = pos4 - e.clientY;
          pos3 = e.clientX; pos4 = e.clientY;
          // set the element's new position:
          let top =  elmnt.offsetTop- pos2
          let left =  elmnt.offsetLeft -pos1
          let isInside = top > 0 && top < parent.offsetHeight-elmnt.offsetHeight &&
              left > 0 && left< parent.offsetWidth-elmnt.offsetWidth
          if(isInside){
            elmnt.style.top = top + "px";
            elmnt.style.left = left + "px";
          }
        }
        function closeDragElement() {
          // stop moving when mouse button is released:
          // elmnt.classList.remove('absolute')
          elmnt.style.width = null
          document.onmouseup = null; document.onmousemove = null;
          all.DrawCanvas(elmnt.offsetTop-pos2,elmnt.offsetLeft-pos1)

        }}
      dragElement(document.getElementById("crop-div"))
    }
    // Drag()
  }
}
</script>

<style scoped>
.overlay{
  @apply bg-gray-400/50
}
.overlay::after{
  @apply absolute top-50% left-50% h-100px w-100px rounded-full border-1px bg-transparent;
}
.crop-div{
  transform: translate3d(0, 0, 0);
  box-shadow: 0 0 0 9999em rgb(0 0 0 / 50%);
  border-image-slice: 1;
  border-image-repeat: repeat;
  @apply absolute top-0 left-0 h-150px w-150px rounded-full border-1px cursor-move border-1px
}
img{
  height: 100%;
  width: 100%;
}



</style>
