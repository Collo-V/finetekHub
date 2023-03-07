<template>
  <div class="profile-cont">
    <div class="profile h-300px " :style="backgroundClass">

    </div>
    <div class="h-150px flex items-center justify-between -mt-50px relative px-10">
      <div class="h-100px w-100px rounded-full border-1px border-primary relative">
        <img :src="user.image" alt="" v-if="user.image" class="h-full w-full rounded-full">
        <div class="h-full w-full rounded-full flex items-center justify-center" v-else-if="user.firstName">
          {{user.firstName[0]}}
        </div>
      </div>
      <button class="w-120px h-8 border-1px rounded-md" @click="CreateFile">Edit photo</button>
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
import {mapState} from "vuex";
import {CreateFile} from "@/components/CropImage";
import Cropper from "cropperjs";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "@/firebase";
import {base64StringtoFile} from "@/commons/ImageHandling";
import {Report} from "@/commons/swal";

export default {
  name: "Profile",
  data(){
    return{
      profilePic:'',
      prevImage:'',
      image:'',
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
    CreateFile,
    async SetCropped(){
      let canvas = this.cropper.getCroppedCanvas({
        height:200,
        width:200
      })
      this.croppedPrev = canvas.toDataURL()
      let cropped = base64StringtoFile(this.croppedPrev,'user-name-profile')
      let imgRef = ref(getStorage(), 'team/' + this.user.username)
      try{
        await uploadBytes(imgRef, cropped)
        let imgPath = await getDownloadURL(imgRef)
        await updateDoc(doc(db,'team',this.user.email),{
          image:imgPath
        })
        this.prevImage = ''
        Report({icon:'success',title:'Profile picture updated'})
      }catch (e){
        console.log(e)
        Report({icon:'error',title:'Could not update profile picture'})
      }
    },
  },
  computed:mapState({
    user:state => state.user,
    backgroundClass(){
      return this.user.image?
          `background: url(${this.user.image}) no-repeat center/cover`
          :'background:gray'
    }
  }),
}
</script>

<style scoped>

</style>
