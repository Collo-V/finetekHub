<template>
  <span>
      <img :src="image" :class="GetClass()" v-if="image">
      <div v-else :class="GetClass()">
        {{name[0]}}
      </div>
  </span>

</template>

<script>
export default {
  name: "Avatar",
  props:['image','name','rounded','class','size'],
  data(){
    return{
      avatarClass:'',
      avatarSize:'medium'
    }
  },
  methods:{
    GetClass(){
      let myClass = 'border-1px flex items-center justify-center font-bold shrink-0'
      myClass+= this.size === 'large'?' w-12 h-12 text-6':
          this.size === 'small'?' w-8 h-8 text-5' : ' w-10 h-10 text-5'
      myClass += this.rounded?' rounded-full':''
      return myClass+' '+ this.avatarClass
    }
  },
  mounted() {
    if(this.class) {
      this.avatarClass = this.class
    }
    if(this.size) {
      this.avatarSize = this.size
    }
  }
}
</script>

<style scoped>

</style>
