<template>
  <div class="w-full min-h-screen-h">
    <h1>Login page</h1>
    <div class="w-full min-h-screen-h flex justify-center items-center">
      <div class="w-1/2 min-w-400px max-w-450px rounded-md shadow-md h-400px p-5 flex flex-col items-center">
        <h3 class="text-center text-8">Welcome back!</h3>
        <form action="" id="login-form" class="w-full flex flex-col justify-center items-center">
          <fieldset class="outline-none mt-4 w-4/5">
            <label>Username</label>
            <input type="text" class="border-grey border-1px rounded-sm h-8 w-full">
          </fieldset>
          <fieldset class="outline-none mt-4 w-4/5">
            <label>Password</label>
            <input type="text" class="border-grey border-1px rounded-sm h-8 w-full">
          </fieldset>
          <fieldset class="outline-none mt-4 w-4/5">
            <button class="h-8 w-full bg-primary text-white rounded-sm">Log In</button>
          </fieldset>

        </form>


      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Auth",
  data(){
    return{

    }
  },
  methods:{

  },
  mounted() {
    document.getElementById('nav-bar').classList.add('hidden')
    document.getElementById('footer-bar').classList.add('hidden')
  },
  beforeUnmount() {
    document.getElementById('nav-bar').classList.remove('hidden')
    document.getElementById('footer-bar').classList.remove('hidden')
  }
}

</script>

<style scoped>

</style>