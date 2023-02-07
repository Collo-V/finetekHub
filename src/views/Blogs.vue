<template>
  <div class="flex overflow-y-auto h-full custom-scroll px-10">
    <AddBlog v-if="addPost" :selected="selected" @back="[addPost = false,selected=undefined]"/>
    <div class="w-full px-10"  v-else>
      <div class="w-full grid grid-cols-3 items-center mt-5">
        <div class="w-full"></div>
        <div class="w-full flex">
          <div v-for="cat in cats" class="mr-2">
            <button class="w-150px h-10 rounded-sm bg-slate-100 border-0 border-b-2px border-primary focus:outline-none"
                     v-if="cat === selectedCat">{{ cat }}</button>
          <button class="w-150px h-10 rounded-sm bg-slate-100 focus:outline-none"
                  @click="selectedCat = cat" v-else> {{ cat }} </button>
          </div>
        </div>
        <div class="flex  w-full justify-end">
          <button class="w-150px h-10 rounded-sm bg-primary text-white focus:outline-none"
                  @click="addPost = true">+ Add Post</button>
        </div>
      </div>
      <div class="mt-4">
        <div class="flex flex-wrap">
          <div class="w-full lg:w-45% min-w-300px max-w-400px rounded-md shadow-lg relative dropdown-cont ml-2 mb-2"
               v-for="blog in filteredBlogs">
            <div class="dropdown absolute left-full shadow-md z-2 w-10 mr-2px h-80px bg-white">
              <button class="block focus:outline-none h-10 w-10 hover:bg-grey" @click="DeleteBlog(blog.id)">
                <i class="fas fa-trash"></i>
              </button>
              <button class="block focus:outline-none h-10 w-10 hover:bg-grey" @click="FillEditable(blog)">
                <i class="fas fa-pencil"></i>
              </button>
              <button class="block focus:outline-none h-10 w-10 hover:bg-grey" @click="Publish(blog)" v-if="!blog.isPublished">
                <i class="fas fa-upload"></i>
              </button>
              <button class="block focus:outline-none h-10 w-10 hover:bg-grey" @click="Save(blog)" v-else>
                <i class="fas fa-download"></i>
              </button>
            </div>
            <div  :style="`background:url('${blog.headerImage}') no-repeat center/cover`" class="w-full h-32">
            </div>
            <div class="p-3">
              <div class="mb-2 h-5">{{DateFormat(blog.time)}}</div>
              <router-link :to="{name:'blogs',params:{title: blog.title.
              toLowerCase().replaceAll(' ','-').replaceAll('?','')}}" class="hover:text-primary">
                <div class="mb-2 h-24 text-20px font-bold">{{blog.title}}</div>
              </router-link>
              <div class="border-t-1px h-16 mr-2 p-2">
               <span  v-for="cat in blog.categories"> #{{cat}}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
  <span class="hidden">{{FindBlog}}{{GetCategory}}</span>

</template>

<script>
import {getDoc, onSnapshot, setDoc, doc, query, where, getDocs, deleteDoc, updateDoc, addDoc} from 'firebase/firestore'
import {TextAreaAdjust, RemoveFromArray, ReverseArray, isEmail, CodeGenerator} from "@/commons";
import {confirmAction, Report} from "@/commons/swal";
import {getDownloadURL, getStorage, ref, uploadBytes,uploadBytesResumable} from "firebase/storage";



import {blogs,db} from "@/firebase";
import AddBlog from "@/components/AddBlog";
import {filterData} from "@/commons/data";



export default {
  name: "Blogs",
  props:['title'],
  components:{
    AddBlog,
  },
  data(){
    return{
      blogs:'',
      filteredBlogs:'',
      addPost:false,
      selected:undefined,
      cats:['Published','Saved'],
      selectedCat:'Published',
    }
  },
  methods:{
    async Publish({id}){
      await updateDoc(doc(db,'blogs',id),{isPublished:true})
      Report({icon:'success',title:'blog published'})
    },
    async Save({id}){
      await updateDoc(doc(db,'blogs',id),{isPublished:false})
      Report({icon:'success',title:'blog unpublished'})
    },
    EditClass(){
      let c = document.getElementsByClassName('blog-content')[0].getElementsByTagName('img')
      for (let i = 0; i < c.length; i++) {
        let img = c[i]
        img.removeAttribute('sizes')
        img.removeAttribute('width')
        img.style.width = '300px'
      }
    },
    GetBlogs(){
      onSnapshot(blogs,(snap)=>{
        let tempTeam = {}
        for (let i = 0; i < snap.docs.length; i++) {
          let doc = snap.docs[i]
          if(doc.id === 'blog-categories'){
            this.categories = doc.data().cats

          }else {
            tempTeam[doc.id] = {...doc.data(), id: doc.id}
          }
        }
        this.blogs = JSON.parse(JSON.stringify(tempTeam))
      })
    },
    DateFormat(date){
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      date = parseInt(date)
      let d = new Date(date)
      return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
    },
    FillEditable(blog){
      this.selected = blog,
      this.addPost = true
    },
    async DeleteBlog(id){
      if(!await confirmAction()){return}
      try {
        await deleteDoc(doc(db,'blogs',id))
      }catch (e) {
        await Report({
          title:'Could not delete',
          icon:'error',
          position:'top'
        })
      }
    }


  },
  computed:{
    FindBlog(){
      if(this.title && this.blogs!==''){
        let keys  = Object.keys(this.blogs)
        for (let i = 0; i < keys.length; i++) {
          let blog = this.blogs[keys[i]]
          if(blog.title.toLowerCase().replaceAll(' ','-').
          replaceAll('?','')==this.title){
            this.blogPrev = blog
            this.imagePrev  = blog.headerImage
            this.addPost = true
            this.showPrev = true
          }
        }
      }
    },
    GetCategory(){
      if(this.blogs === '')return
      if(this.selectedCat==='Published'){
        this.filteredBlogs = filterData(this.blogs,['isPublished','==',true])
      }else{
        this.filteredBlogs = filterData(this.blogs,['isPublished','==',false])
      }

    }

  },
  mounted() {
    this.GetBlogs()
  }

}
</script>

<style scoped>
/*a{color: #1865c7;text-decoration: underline}*/
.blog-header{background: url(../assets/images/all-min.jpg) no-repeat center/cover}
.cat-options:not(:focus) {display: none}
.blog-content figure img{transform: scale(50%);display: none}

</style>
