<template>
  <div class="relative w-full h-fit">
    <div id="emoji-picker-cont" v-show="showEmoji" class="w-full h-300px mt-8 absolute bottom-full"></div>
    <div class="team-cont absolute bottom-full w-200px -mb-10 bg-white z-1 hidden" ref="mentionsCont">
      <div class="mention-select-div">
        <div class="h-8 pl-2 flex items-center cursor-pointer mention-option"
             v-for="(member,index) in mentionOptions" :key="index"
             :id="'mention-option-'+index"
             @mouseover="tempSelected = member.username"
             @click="PickSelected"
        >
          {{ member.firstName }} {{ member.lastName }}
        </div>
<!--             @mouseleave="RemoveHighlight(member.username)"-->
      </div>

    </div>
    <QuillEditor
        ref="editorRef"
        theme="snow"
        :options="quillOptions"
        toolbar="#my-toolbar"
        @keydown="CheckKey($event)"
        v-model:content="content"
        @create-image="$emit('CreateImage')"
    >
      <template #toolbar>
        <div id="my-toolbar">
          <!-- Add buttons as you would before -->
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-strike"></button>
          <button class="ql-code-block"></button>
          <button class="ql-link"></button>
<!--          <button class="ql-emoji"></button>-->

          <!-- But you can also add your own -->
          <button id="mentions-button" class="ql-mention">
            <i class="fas fa-at"></i>
          </button>
<!--          <button id="issues-button" class="ql-issue">-->
<!--            <i class="fas fa-hashtag"></i>-->
<!--          </button>-->
                <button class="focus:outline-none" id="emoji-attach"
                        @click="showEmoji=true" v-if="!showEmoji">
                  <i class="fa-solid fa-face-smile"></i>
                </button>
                <button class="focus:outline-none" @click="showEmoji = false" v-else>
                  <i class="fa-solid fa-xmark"></i>
                </button>
          <button id="image" class="" @click="$emit('CreateImage')">
            <i class="fas fa-image"></i>
          </button>
          <button id="file" class=""  @click="$emit('CreateFile')">
            <i class="fas fa-file"></i>
          </button>
        </div>
      </template>

    </QuillEditor>
    <button class="text-6 mr-2 focus:outline-none absolute right-0 bottom-0" @click="Send">
      <i class="fa-regular fa-paper-plane"></i>
    </button>

    <div class="fixed h-0 w-0 overflow-hidden z-10" ref="cardCont">
      <div class="absolute bottom-full left-50% h-center pb-4">
        <MemberCard :username="selectedMention"/>
      </div>

    </div>
  </div>
</template>

<script>
import { Quill, QuillEditor,Delta} from "@vueup/vue-quill";
import * as Emoji from "quill-emoji";
Quill.register(Emoji)
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {mapState} from "vuex";
import {Select} from "ant-design-vue";
import MemberCard from "@/components/MemberCard";
import "quill-emoji/dist/quill-emoji.css";
import {ref} from "vue";
import {Picker} from "emoji-picker-element";

export default {
  name: "TextArea",
  emits:['Send','CreateFile','CreateImage'],
  components:{
    Select,MemberCard,QuillEditor
  },
  data(){
    return{
      tempMention:'',
      tempSelected:'',
      cursorPosition:'',
      selectedMention:undefined,
      showMentions:false,
      quillOptions:{
        placeholder: 'Enter your message',
        theme: 'snow',
        modules:{
          // toolbar:toolbarOptions
          "emoji-toolbar": true,
          "emoji-textarea": true,
          "emoji-shortname": true,
        }
      },
      content:'',
      showEmoji:false,
    }
  },
  watch:{
    tempSelected(username){

      if(username === '')return
      let options = document.getElementsByClassName('mention-option')
      for (let i = 0; i < options.length; i++) {
        options[i].classList.remove('bg-slate-200')
      }
      let option = document.getElementById('mention-option-'+username)
      option.classList.add('bg-slate-200')
    },
    content(val){
      console.log(val)
      let mentions = document.getElementsByClassName('mentions')
      for (let i = 0; i < mentions.length; i++) {
        let mention = mentions[i]
        let username = mention.innerText
        let all = this
        mention.addEventListener('mouseover',(event)=>{
          all.ShowCard(event,username)
        })
        mention.addEventListener('mouseleave',(event)=>{
          all.ShowCard(event,username,true)
        })

      }
    }
  },
  methods:{
    Send(){
      let content = ''
      if(this.content.ops){
        let ops = this.content.ops
        console.log(ops)
        let last = ops[ops.length-1]
        let insert = last.insert
        while (true){
          let index = insert.indexOf('\n\n',)
          if(index === -1)break
          insert = insert.replace('\n\n','\n')
        }
        last.insert = insert
        ops[ops.length-1] = last
        content = [...ops]
      }
      console.log(content)
      this.$emit('Send',content)
      this.showEmoji = false
      let quill = this.$refs.editorRef.getQuill()
      quill.setContents([{ insert: '\n' }]);
    },
    ShowCard(event,username,hide){
      if(!hide){
        this.selectedMention = username.replace('@','')
        let rect = event.target.getBoundingClientRect()
        let {x,y,width} = rect
        console.log(username)
        const cardHolder = this.$refs.cardCont;
        cardHolder.classList.remove('h-0','w-0','overflow-hidden')
        cardHolder.style.top = y+'px'
        cardHolder.style.left = x+'px'
        cardHolder.style.width = width+'px'
      }else{
        this.selectedMention = undefined
      }
    },
    GetCursorPosition(){
      this.cursorPosition = this.quill.getSelection()
    } ,
    PickSelected(){
      let quill = this.$refs.editorRef.getQuill()
      let position = quill.getSelection(true)
      if(position.index){
        position = position.index
        // this.quill.deleteText(this.cursorPosition.index,1)
        quill.insertText(position,' ')
        quill.insertText(position,this.tempSelected)
        quill.setSelection(position-1,this.tempSelected.length+1)
        position+=this.tempSelected.length+1
        try{
          // quill.format('mention', true)
          quill.format('mention', true)
        } catch {}
        this.$refs.mentionsCont.classList.add('hidden')
        try{
          setTimeout(() => {
            console.log(position)
            quill.setSelection(position, 0)
          }, 0)
        }catch {}
      }
    },
    CheckKey(event){
      let {key,altKey} = event
      if(key === '@'){
        this.$refs.mentionsCont.classList.remove('hidden')
      }
      if((key === 'Enter' || key === 'Tab') && this.tempSelected !== '' && this.showMentions){
        this.PickSelected()
        return;
      }
      if(key === 'Enter' && !altKey){
        this.Send()
        return;
      }
      if(key === 'Enter' && altKey){
        let quill = this.$refs.editorRef.getQuill()
        let position = quill.getSelection(true)
        if(position.index){
          position = position.index
          quill.insertText(position,'\n')
        }
      }
      if(key !=='ArrowUp' && key !=='ArrowDown')return
      let options = Object.keys(this.mentionOptions)
      let selectedIndex = options.indexOf(this.tempSelected)
      if(key === 'ArrowUp'){
       if(selectedIndex === -1){
         selectedIndex = options.length-1
       }else {
         selectedIndex-=1
       }
      }else{
       if(selectedIndex === -1){
         selectedIndex = 0
       }else {
         selectedIndex+=1
       }
      }
      if(selectedIndex < 0 || selectedIndex > options.length-1)return;
      this.tempSelected = options[selectedIndex]
    }
  },
  computed:mapState({
    user:state => state.user,
    team:state => state.team,
    channel(state){
      return state.channels[this.channelId]
    },
    mentionOptions(state){
      return state.team
    }
  }),
  mounted() {
    const Inline = Quill.import('blots/inline')
    class Mention extends Inline {
      static formats(node) {
        // if(node.classList.contains('mentions')){
        //   node.classList.remove('bg-primary','px-1','mentions');
        //   return node
        // }
        console.log(node)
        node.classList.add('bg-primary','px-1','mentions','cursor-pointer','dropdown-cont');
        return node

      }
    }
    Mention.blotName = 'mention';
    Mention.tagName = 'span';
    Mention.className = 'mentions'
    Quill.register(Mention)

    let picker = new Picker()
    picker.classList.add('w-full','h-full')
    picker.id = 'emoji-picker'
    picker.addEventListener('emoji-click', event => {
      let quill = this.$refs.editorRef.getQuill()
      let position = quill.getSelection(true)
      if(position){
        position = position.index
        let quill = this.$refs.editorRef.getQuill()
        quill.insertText(position,event.detail.emoji.unicode)
      }
      // all.input+=event.detail.emoji.unicode
      // this.InputFocus()
    })
    document.getElementById('emoji-picker-cont').appendChild(picker)
  }
}
</script>

<style>
.mentions {
  @apply relative;
}


</style>
