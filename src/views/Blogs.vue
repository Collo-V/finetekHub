<template>
  <div class="min-h-screen-h w-full">
    <div class="blog-header w-full h-500px">
    </div>

    <div class="h-400px mt-8" v-if="!show">
      <ckeditor :editor="editor" editordata="what is there to be seen" v-model="blog.content"></ckeditor>
      <button class="w-200px h-10 rounded-sm bg-primary" @click="show=true">Try it</button>
    </div>
    <div v-else>
      <div v-html="blog.content"></div>
      <button class="w-200px h-10 rounded-sm bg-primary" @click="show=false">back</button>

    </div>
  </div>


</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  name: "Blogs",
  components:{
    ckeditor:CKEditor.component
  },
  data(){
    return{
      show:false,
      blog:{
        author:'',
        pubTime:'',
        content:'',
        picLink:'',
      },
      editor: ClassicEditor
    }
  },
  methods:{
    Try(){
      // console.log(this.blog.content)
    }
  }

}
</script>

<style scoped>
a{color: #1865c7;text-decoration: underline}
.blog-header{background: url(../assets/images/blogBackground.jpg) no-repeat center/cover}

</style>