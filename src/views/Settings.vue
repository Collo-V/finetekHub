<template>
  <div>
    <QuillEditor
        ref="editorRef"
        theme="snow"
        :options="options"
        toolbar="#my-toolbar"
        @keydown="CheckKey($event)"
        v-model:content="content"
    >
      <template #toolbar>
        <div id="my-toolbar">
          <!-- Add buttons as you would before -->
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-strike"></button>
          <button class="ql-code-block"></button>
          <button class="ql-link"></button>
          <button class="ql-emoji"></button>

          <!-- But you can also add your own -->
          <button id="mentions-button" class="ql-mention">
            <i class="fas fa-at"></i>
          </button>
          <button id="issues-button" class="ql-issue">
            <i class="fas fa-hashtag"></i>
          </button>
        </div>
      </template>

    </QuillEditor>
  </div>

</template>

<script>
import { Quill, QuillEditor} from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css'
const options = {
  placeholder: 'Enter your message',
  theme: 'snow',
  modules:{
    // toolbar:toolbarOptions
  }
}

export default {
  name: "Settings",
  data(){
    return{
      //
      content:'',
      options
    }
  },
  components:{
    // QuillEditor
    QuillEditor
  },
  methods:{
    CheckKey(){

    }
  },
  mounted() {
    const Inline = Quill.import('blots/inline')
    console.log(Inline)
    class Mention extends Inline {
      static formats(node) {
        // if(node.classList.contains('mentions')){
        //   node.classList.remove('bg-primary','px-1','mentions');
        //   return node
        // }
        node.classList.add('bg-primary','px-1','mentions','cursor-pointer','dropdown-cont');
        return node

      }
    }
    Mention.blotName = 'mention';
    Mention.tagName = 'span';
    Mention.className = 'mentions'
    Quill.register(Mention)
    let mentionBtn = document.getElementsByClassName('ql-mention')[0]
    console.log(mentionBtn)
    mentionBtn.addEventListener('click',()=>{
      console.log(this.$refs.editorRef)
    })
  }
}
</script>

<style scoped>

</style>
