<template>
  <div class="flex">
    <div class="min-h-screen-h w-full p-4">
      <!--    <div class="blog-header w-full h-500px">-->
      <!--    </div>-->
      <h1 class="mb-2">Add a post</h1>
      <form class="flex">
        <fieldset>
          <label for="post-title" class="block font-bold mb-2">Post title</label>
          <input type="text" id="post-title" class="h-10 w-350px rounded-md outline-none block border-grey border-1px pl-2">

        </fieldset>
        <fieldset class="ml-3">
          <label class="block font-bold mb-2">Category</label>
          <div class="h-10 w-350px rounded-md block border-grey border-1px flex pl-2 relative">
            <input type="text" class="h-full outline-none bg-primary inline min-w-1 px-0"
                   @keyup="CategoryFill($event.target)" aria-autocomplete="none">
            <span class="h-full flex items-center">{{cats[0]}}</span>
            <div class="cat-options-div absolute left-0 top-full w-350px rounded-md z-3 rounded-sm bg-white shadow-md">
              <span class="block w-full h-8 hover:bg-grey-light flex items-center px-2 cursor-pointer"
                    v-for="cat in cats">
                {{cat}}</span>
            </div>
          </div>

        </fieldset>
      </form>

      <div class="mt-8" v-if="!show">
        <ckeditor :editor="editor" editordata="what is there to be seen" v-model="blog.content" class="h-500px"></ckeditor>
        <button class="w-200px h-10 rounded-sm bg-primary" @click="show=true">Try it</button>
      </div>
      <div v-else>
        <div v-html="blog.content"></div>
        <button class="w-200px h-10 rounded-sm bg-primary" @click="show=false">back</button>

      </div>
      <div id="myeditor" class="mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, minima?</div>
    </div>
  </div>

</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Quill from "quill/quill";

let container = document.getElementById('myeditor');
let editor = new Quill(container);




// import AriaAutocomplete from "aria-autocomplete";
export default {
  name: "Blogs",
  components:{
    ckeditor:CKEditor.component
  },
  data(){
    return{
      show:false,
      cats:[],
      categories:['IOT',"AI","Mobile Development",'Blockchain','Healthcare','Fintech','Ecommerce'],
      blog:{
        author:'',
        categories:[],
        pubTime:'',
        content:'',
        picLink:'',
      },
      editor: ClassicEditor
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

  }

}
</script>

<style scoped>
a{color: #1865c7;text-decoration: underline}
.blog-header{background: url(../assets/images/all-min.jpg) no-repeat center/cover}
.cat-options:not(:focus) {display: none}

</style>