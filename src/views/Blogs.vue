<template>
  <div class="flex overflow-y-auto h-full custom-scroll">
    <div class="add-post w-full" v-if="addPost">
      <div class="mt-5 flex w-full pl-3">
        <button class="w-200px h-10 rounded-sm bg-grey-light focus:outline-none"
                @click="[$router.push({name:'blogs'}),addPost = false]">
          <span class="mr-2"><i class="fas fa-long-arrow-left"></i></span>
          Back
        </button>
      </div>
      <div class="min-h-screen-h w-full p-4" v-if="!showPrev">
        <h1 class="mb-2">Add a post</h1>
        <form class="lg:min-w-45% w-fit">
          <fieldset class="mb-2 w-full">
            <label for="post-title" class="block font-bold mb-2">Post title</label>
            <input type="text" id="post-title" class="h-10 rounded-md outline-none block border-grey border-1px pl-2 w-full" v-model="blogPost.title">

          </fieldset>
          <fieldset class="w-full mb-2">
            <label class="block font-bold mb-2">Category</label>
            <div class="h-10 rounded-md block border-grey border-1px flex pl-2 relative items-center ">
              <span v-for="cat in blogPost.categories" class="mr-1">
                <span class="relative pr-2 text-ellipsis">
                   {{cat}}
                  <button type="button" class="absolute top-0 right-0 focus:outline-none text-red text-3" @click="RemoveCat(cat)">
                    <i class="fas fa-xmark"></i>
                  </button>
                </span>,

              </span>
              <input type="text" class="h-full outline-none inline min-w-100px w-full px-0 mr-2"
                     @keyup="CategoryFill($event.target)" aria-autocomplete="none" id="category"
                     @keydown="RemoveCat($event)" v-model="catInput">
<!--              <span class="h-full flex items-center">{{cats[0]}}</span>-->
              <div class="cat-options-div absolute left-0 top-full w-350px rounded-md z-3 rounded-sm bg-white shadow-md">
                <span class="block w-full h-8 hover:bg-grey-light flex items-center px-2 cursor-pointer"
                      v-for="cat in cats"
                      @click="PickCat(cat)">
                  {{cat}}</span>
              </div>
            </div>

          </fieldset>
          <fieldset>
            <button class="w-200px h-10 rounded-sm bg-primary text-white focus:outline-none" type="button"  @click="CreateImage()">
              Header image
            </button>
            <span class="ml-1 text-green" v-if="blogPost.headerImage!=''"><i class="fa-solid fa-check"></i></span>
            <span class="text-primary-red text-3">*Please add a header image</span>
          </fieldset>
        </form>
        <div class="mt-8" >
          <ckeditor :editor="editor" v-model="blogPost.content" class="h-500px" :config="config"></ckeditor>
        </div>
        <div class="mt-5 flex justify-end">
          <button class="w-200px h-10 rounded-sm bg-primary text-white" @click="ShowBlogPrev()">Show preview</button>
        </div>
      </div>
      <div v-else>
        <div class="header h-48 w-full flex items-center justify-center text-white" :style="`background:url('${imagePrev}')no-repeat center/cover`">
          <h1>{{blogPrev.title}}</h1>
        </div>
        <div class="blog-prev-body flex mt-4">
          <div class="blog-nav hidden lg:block min-w-200px pl-4 mr-5">
            <h2>Table of contents</h2>
            <a v-for="nav in blogPrev.table" class=" block hover:text-primary mb-2 text-black no-underline hover:underline"
               :href="'#'+nav.toLowerCase().replaceAll(' ','-')">{{nav}}</a>
          </div>

          <div class="blog-prev-cont w-2/3" v-html="blogPrev.content">

          </div>

        </div>
        <hr>
        <div class="mt-5 flex items-end flex-row-reverse w-full">
          <button class="w-200px h-10 rounded-sm bg-primary text-white ml-2 focus:outline-none" @click="PostBLog()">Post</button>
          <button class="w-200px h-10 rounded-sm bg-grey-light ml-2" @click="showPrev = false">Continue-editing</button>
          <button class="w-200px h-10 rounded-sm bg-grey-dark ml-2" >Discard</button>
        </div>
      </div>
    </div>
    <div class="w-full"  v-else>
      <div class="mt-5 flex justify-end w-full pr-3">
        <button class="w-200px h-10 rounded-sm bg-primary text-white focus:outline-none"
                     @click="[$router.push({name:'blogs'}),addPost = true]">+ Add Post</button>
      </div>
      <div class="p-3">
        <div class="flex flex-wrap">
          <div class="w-full lg:w-45% min-w-300px max-w-400px rounded-md shadow-lg relative dropdown-cont ml-2 mb-2"
               v-for="blog in blogs">
            <div class="dropdown absolute left-full shadow-md z-2 w-10 mr-2px h-80px bg-white">
              <button class="block focus:outline-none h-10 w-10 hover:bg-grey">
                <i class="fas fa-trash"></i>
              </button>
              <button class="block focus:outline-none h-10 w-10 hover:bg-grey" @click="FillEditable(blog)">
                <i class="fas fa-pencil"></i>
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
  <span class="hidden">{{}}</span>

</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic/'
import {getDoc, onSnapshot, setDoc, doc, query, where, getDocs, deleteDoc, updateDoc, addDoc} from 'firebase/firestore'
import {TextAreaAdjust, RemoveFromArray, ReverseArray, isEmail, CodeGenerator} from "@/commons";
import {Alert, Report} from "@/commons/swal";
import {getDownloadURL, getStorage, ref, uploadBytes,uploadBytesResumable} from "firebase/storage";



import 'vue-html-editor'
import {blogs,db} from "@/firebase";



// import AriaAutocomplete from "aria-autocomplete";
export default {
  name: "Blogs",
  props:['title'],
  components:{
    ckeditor:CKEditor.component,
    'vue-html-editor':require('vue-html-editor')
  },
  data(){
    return{
      blogs:'',
      addPost:false,
      catInput:'',
      document:document,
      showPrev:false,
      imagePrev:'',
      cats:[],
      categories:['IOT',"AI","Mobile Development",'Web Development','Front-end','Healthcare','Fintech','Ecommerce'],
      blogPost:{
        headerImage:'',
        author:'',
        categories:[],
        time:'',
        content:'',
      },
      blogPrev:{},
      editor: ClassicEditor,
      config:{
        cloudServices:{
          tokenUrl:'https://88978.cke-cs.com/token/dev/1159b5974c1756a0' +
              '1752ca32a1df5e961b3629a4e800bd5741223c3aaa0a?limit=10',
          uploadUrl: 'https://88978.cke-cs.com/easyimage/upload/'
        }}

    }
  },
  methods:{
    CategoryFill(el){
      el.style.width=el.value.length+'ch'
      let options = []
      let cats = this.categories
      for (let i = 0; i < cats.length; i++) {
        if(cats[i].toLowerCase().includes(el.value.toLowerCase()) && el.value!=''){
          options.push(cats[i])
        }
      }
      this.cats=options
      // console.log(options)

    },
    async StartEditor(){
      let editor  = document.getElementById('html-editor')
      console.log(editor)
      try{
        let c = await ClassicEditor.create(editor, {
          cloudServices: {
            tokenUrl: 'https://88978.cke-cs.com/token/dev/1159b5974c1756a01752ca32a1df5e961b3629a4e800bd5741223c3aaa0a?limit=100',
            uploadUrl: 'https://88978.cke-cs.com/easyimage/upload/'

          }
        })
        console.log(c)
      }catch (e) {
        console.log(e)
      }

    },
    EditClass(){
      let c = document.getElementsByClassName('blog-content')[0].getElementsByTagName('img')
      for (let i = 0; i < c.length; i++) {
        let img = c[i]
        img.removeAttribute('sizes')
        img.removeAttribute('width')
        img.style.width = '300px'
        console.log(img,img.attributes)
      }
    },
    async PostBLog(){
      let user  = this.$store.getters.GetUser
      let time = new Date().getTime()
      try{
        if (!this.blogPost.id){
          this.blogPost.author = `${user.firstName} ${user.lastName}`
          let imgRef = ref(getStorage(), 'blogs/' + user.username + time)
          await uploadBytes(imgRef, this.blogPost.headerImage)
          let imgPath = await getDownloadURL(imgRef)
          await addDoc(blogs, {...this.blogPrev, headerImage: imgPath, time: time})
          this.blogPost = {
            author: '', categories: [], time: '', content: '',
          }
          await Report({
            title: 'blog successfully added',
            icon: 'success',
            position: 'top'
          })
        }
        else{
          let imgPath
          if (typeof(this.blogPost.headerImage)=='string'){
            imgPath = this.blogPost.headerImage
          }else{
            let imgRef = ref(getStorage(), 'blogs/' + this.blogPost.author + this.blogPost.time)
            await uploadBytes(imgRef, this.blogPost.headerImage)
            imgPath = await getDownloadURL(imgRef)
          }
          delete this.blogPost.id
          delete this.blogPost.table
          delete this.blogPost
          await updateDoc(doc(db,'blogs',this.blogPost.id),
              {...this.blogPrev, headerImage: imgPath})
          this.blogPost = {
            author: '', categories: [], time: '', content: '',
          }
          await Report({
            title: 'blog successfully added',
            icon: 'success',
            position: 'top'
          })
        }

      }catch (e){
        await Report({
          title:'Error occurred during posting',
          icon:'error',
          position:'top'
        })
        console.log(e)
      }

    },
    CreateImage:function (){
      let input=document.createElement("input");
      input.type="file";
      input.accept=".png,.jpg"
      let files=[]
      let all  = this
      input.onchange = e=>{
        files=e.target.files;
        let reader=new FileReader();
        reader.onload=function(){
          all.imagePrev = reader.result
        }
        reader.readAsDataURL(files[0]);
        this.blogPost.headerImage = files[0]
      }
      input.click()
    },
    ShowBlogPrev(){
      let blog = this.blogPost
      blog.content = this.blogPost.content.replaceAll('sizes="','height="auto" bla="').
      replaceAll('width="','style = width:100% display:block width="')
      blog.time = new Date().getTime()
      this.blogPrev = {...this.GetTable(blog.content),categories:blog.categories, title:blog.title}
      this.showPrev = true
    },
    GetTable(content){
      let c = content.split(`<h2>`)
      let tempCont=``
      let table = []
      for (let i = 0; i < c.length; i++){
        let line = c[i]
        if(!line.includes(`</h2>`)){continue}
        let index = line.indexOf(`</h2>`)
        let nav = line.slice(0,index)
        table.push(nav)
        line = line.replace(nav,'')
        tempCont+=line.replace(`</h2>`,`<h2 id="${nav.toLowerCase().replaceAll(' ','-')}">${nav}</h2>`)
      }
      return {table:table,content:tempCont}
    },
    RemoveCat(cat){
      if (typeof (cat)==='string'){
        this.blogPost.categories = RemoveFromArray(this.blogPost.categories,cat)
        return
      }
      if(this.catInput=='' && cat.key=='Backspace'){
        this.blogPost.categories.pop()
      }

    },
    PickCat(cat){
      let input = document.getElementById('category')
      this.blogPost.categories.push(cat)
      this.catInput = this.cats = ''
      input.focus()

    },
    GetBlogs(){
      onSnapshot(blogs,(snap)=>{
        let tempTeam = {}
        for (let i = 0; i < snap.docs.length; i++) {
          let doc = snap.docs[i]
          tempTeam[doc.id] = {...doc.data(),id:doc.id}
        }
        this.blogs = JSON.parse(JSON.stringify(tempTeam))
        console.log(this.blogs)
      })
    },
    DateFormat(date){
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
      date = parseInt(date)
      let d = new Date(date)
      return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
    },
    FillEditable(blog){
      this.blogPost = blog
      this.imagePrev = blog.headerImage
      this.addPost = true
    },


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