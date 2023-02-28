<template>
  <span :class="GetClass()">
    <i class="fas fa-flag"></i>
  </span>

</template>

<script>
export default {
  name: "PriorityFlag",
  props:['priority','class'],
  methods:{
    GetClass(){
      let p = parseInt(this.priority)
      let myClass = this.class?this.class:''
      myClass+=' '
      myClass+= p === 1?'text-red-500':p === 2?'text-orange-500':
          p === 3?'text-primary':'text-slate-500'
      return myClass
    }
  }
}
</script>

<style scoped>

</style>
