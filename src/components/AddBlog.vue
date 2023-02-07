<template>
  <div class="min-h-screen-h add-post w-full" >
    <div class="mt-5 flex w-full pl-3 mb-2">
      <button class="w-200px h-10 rounded-sm bg-grey-light focus:outline-none"
              @click="$emit('back')">
        <span class="mr-2"><i class="fas fa-long-arrow-left"></i></span>
        Back
      </button>
    </div>
    <div class="w-full p-4" v-show="!showPrev">
      <h1 class="mb-2">Add a post</h1>
      <form class="lg:min-w-45% w-fit mb-4">
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
                  <button type="button" class="absolute top-0 right-0 focus:outline-none text-red text-3" @click="CheckInput(cat)">
                    <i class="fas fa-xmark"></i>
                  </button>
                </span>,

              </span>
            <input type="text" class="h-full outline-none inline min-w-100px w-full px-0 mr-2"
                   @keyup="CategoryFill($event.target)" aria-autocomplete="none" id="category"
                   @keydown="CheckInput($event)" v-model="catInput" autocomplete="off">
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
          <span class="ml-1 text-green-500" v-if="blogPost.headerImage!=''"><i class="fa-solid fa-check"></i></span>
          <span class="text-primary-red-500 text-3" v-else>*Please add a header image</span>
        </fieldset>
      </form>
      <div id="editor" class="mt-4">
      </div>
      <div class="mt-5 flex justify-end">

      </div>
    </div>
    <div v-show="showPrev" class="blog-prev">
      <div class="header h-48 w-full flex items-center justify-center text-white" :style="`background:url('${imagePrev}')no-repeat center/cover`">
        <h1>{{blogPrev.title}}</h1>
      </div>
      <div class="blog-prev-body flex mt-4">
        <div class="blog-nav hidden lg:block min-w-200px pl-4 mr-5 bg-slate-300">
          <h2>Table of contents</h2>
          <a v-for="nav in blogPrev.table" class=" block hover:text-primary mb-2 text-black no-underline hover:underline"
             :href="'#'+nav.toLowerCase().replaceAll(' ','-')">{{nav}}</a>
        </div>

        <div class="blog-prev-cont w-2/3" v-html="blogPrev.content" id="blog-prev">

        </div>

      </div>
      <hr>

    </div>
    <div class="mt-5 flex items-end flex-row-reverse w-full">
      <button class="w-150px h-10 rounded-sm bg-primary text-white ml-2 focus:outline-none" @click="PostBLog()">Publish</button>
      <button class="w-150px h-10 rounded-sm bg-primary-light text-white ml-2" @click="PostBLog(true)">Save</button>
      <button class="w-150px h-10 rounded-sm bg-slate-300 ml-2" @click="Discard()">Discard</button>
      <button class="w-150px h-10 rounded-sm bg-slate-100 ml-2" @click="showPrev = false" v-if="showPrev">Continue-editing</button>
      <button class="w-150px h-10 rounded-sm bg-slate-100 ml-2" @click="ShowBlogPrev()" v-else>Preview</button>
    </div>
  </div>

</template>

<script>
import {addDoc, deleteDoc, doc, onSnapshot, updateDoc} from "firebase/firestore";
import {blogs, db} from "@/firebase";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {confirmAction, Report} from "@/commons/swal";
import {RemoveFromArray} from "@/commons";
export default {
  name: "AddBlog",
  emits:['back'],
  props:['selected'],
  components:{
  },
  data(){
    return {
      quill:undefined,
      catInput: '',
      document: document,
      showPrev: false,
      imagePrev: '',
      cats: [],
      categories: [],
      blogPost: {
        headerImage: '',
        author: '',
        categories: [],
        time: '',
        content: 'Start writing your blog',
      },
      blogPrev: {},
    }

  },
  methods:{
    async Discard(){
      if(await confirmAction('discard'))this.quill.setContents('')
    },
    CategoryFill(el){
      if (el.value===',' || el.value ===' ' || el.value ==='.'){
        this.catInput = ''
        return
      }
      el.style.width=el.value.length+'ch'
      let options = []
      let cats = this.categories
      cats.forEach(cat=>{

        if (cat.toLowerCase().includes(this.catInput.toLowerCase()) && this.catInput!=''
            && !this.blogPost.categories.includes(cat)){
          options.push(cat)
        }

      })
      this.cats=options

    },
    async PostBLog(save){
      let action = save?'save':'publish'
      if(!await confirmAction(action))return
      let user  = this.$store.getters.GetUser
      let time = new Date().getTime()
      try{
        let tempCats =[]
            this.categories.concat(this.blogPost.categories).forEach(item=>{
              if (!tempCats.includes(item))tempCats.push(item)
        })
          await updateDoc(doc(db,'blogs','blog-categories'),
              {cats:tempCats})

        if (!this.blogPost.id){
          this.blogPost.author = `${user.firstName} ${user.lastName}`
          let imgRef = ref(getStorage(), 'blogs/' + user.username + time)
          await uploadBytes(imgRef, this.blogPost.headerImage)
          let imgPath = await getDownloadURL(imgRef)
          await addDoc(blogs, {
            title:this.blogPost.title,
            content: this.quill.getContents().ops,
            preview: this.quill.getText().slice(0,200),
            headerImage: imgPath,
            time: time,
            author:this.blogPost.author,
            categories:this.blogPost.categories,
            isPublished:!save?true:false
          })
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
          let id = this.blogPost.id
          delete this.blogPost.id
          delete this.blogPost.table
          await updateDoc(doc(db,'blogs',id),
              {...this.blogPrev, headerImage: imgPath})

          await Report({
            title: 'blog updated',
            icon: 'success',
            position: 'top'
          })
        }
        this.blogPost = {
          author: '', categories: [], time: '', content: '',
        }
        this.showPrev = this.addPost = false
        this.blogPrev = {}

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
      input.accept=".png,.jpg,.jpeg"
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
      let blog
      blog = this.quill.getText()
      blog = this.quill.getContents().ops
      blog.time = new Date().getTime()
      let quill = new Quill('#blog-prev',{})
      quill.setContents(this.quill.getContents())
      this.showPrev = true
    },
    CheckInput(cat){
      let inputEl = document.getElementById('category')
      if (typeof (cat)==='string'){
        this.blogPost.categories = RemoveFromArray(this.blogPost.categories,cat)
      }
      else if(this.catInput=='' && cat.key=='Backspace'){
        this.blogPost.categories.pop()
      }
      else if(this.catInput.replaceAll(' ','').length && cat.key===','){
        this.blogPost.categories.push(this.catInput)
        this.catInput = ''
      }
      else if(cat.key==='Tab' && this.cats.length>0){
        cat.preventDefault()
        this.blogPost.categories.push(this.cats[0])
        this.catInput = ''
        inputEl.focus()

      }

    },
    PickCat(cat){
      let input = document.getElementById('category')
      this.blogPost.categories.push(cat)
      this.catInput = this.cats = ''
      input.focus()

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
    GetCategories(){
      onSnapshot(doc(db,'blogs','blog-categories'),snap=>{
        if(snap){
          this.categories = ['All',...snap.data().cats]
        }
      })
    }


  },
  mounted() {
    this.GetCategories()
      const toolbarOptions = [
        ['bold', 'italic', 'underline'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        ['link', 'image'],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
      ];
      const options = {
        placeholder: 'Start writing your code',
        theme: 'snow',
        modules:{
          toolbar:toolbarOptions
        }
      };
      this.quill = new Quill('#editor',options);
    if(this.selected){
      let content = this.selected.content
      let index = 0
      for (let i = 0; i < content.length; i++) {
        let text = content[i]
        this.quill.insertText(index,text.insert,text.attributes)
        index+= text.insert.length
      }
      this.blogPost = {...this.selected}
    }

  }
}
</script>

<style lang="postcss" scoped>

</style>
