<template>
  <div class="slide">
    <div class="slide slide1 h-500px w-ful">
      Lorem ipsum.
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.slide1{background: linear-gradient(to right, #0e0d0da9,#0e0d0da9), url(../assets/Images/Slide/planning2.jpg) no-repeat center/cover;};

</style>
