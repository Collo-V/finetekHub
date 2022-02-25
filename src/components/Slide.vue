<template>
  <div class="relative">
    <div class="absolute top-0 h-full w-full flex items-center justify-between z-1">
      <span class="opacity-100 hover:opacity-25 px-2 py-4" @click="SlideNav(-1)">
        <img src="../assets/images/icons/arrow-left-dark.svg" alt="">
      </span>
      <span class="hover:opacity-25 px-2 py-4" @click="SlideNav(1)">
        <img src="../assets/images/icons/arrow-right-light.svg" alt="">
      </span>
      <div class="absolute btm-1/10 w-full text-white flex justify-center">
        <div v-for="n in 6" class="h-2 w-2 mr-2" @click="CurrentSlide(n)">
          <div class="h-full w-full bg-white" v-if="n==carIndx+1"></div>
          <div class="h-full w-full bg-grey-dark hover:bg-white" v-else></div>
        </div>
      </div>

    </div>
    <div>
      <div class=" slide slide1 h-700px w-full  animate__animated ">
        <div class="h-full w-full flex items-center text-white justify-center" >
          <div>
            <h1 class="font-extrabold mb-10">ENTERPRISE SOFTWARE DEVELOPMENT</h1>
            <p class="mb-10">
              Leverage our ten-year expertise to create a solid software foundation for your business.
            </p>
            <a href="#" class="border-1px border-white text-white hover:bg-white hover:text-blue h-45px w-210px px-10px flex items-center justify-center font-bold no-underline">
              READ MORE
            </a>
          </div>
        </div>

      </div>

      <div class="slide slide2 h-700px w-full  animate__animated ">
        <div class="h-full w-full flex items-center text-white justify-center" >
          <div>
            <h1 class="font-extrabold mb-10">DEDICATED DEVELOPMENT TEAMS</h1>
            <p class="mb-10">
              Hire top tech talent and quickly scale your delivery capacity. Our engineers have the necessary niche skills, deep expertise, and are highly loyal.
            </p>
            <a href="#" class="border-1px border-white text-white hover:bg-white hover:text-blue h-45px w-210px px-10px flex items-center justify-center font-bold no-underline">
              READ MORE
            </a>
          </div>
        </div>

      </div>
      <div class="slide slide3 h-700px w-full  animate__animated ">
        <div class="h-full w-full flex items-center text-white justify-center" >
          <div>
            <h1 class="font-extrabold mb-10">MOBILE APP DEVELOPMENT</h1>
            <p class="mb-10">
              Delivering on-demand mobile app experiences for startups and enterprise clients by leveraging the latest technologies.
            </p>
            <a href="#" class="border-1px border-white text-white hover:bg-white hover:text-blue h-45px w-210px px-10px flex items-center justify-center font-bold no-underline">
              READ MORE
            </a>
          </div>
        </div>

      </div>
      <div class="slide slide4 h-700px w-full  animate__animated ">
        <div class="h-full w-full flex items-center text-white justify-center" >
          <div>
            <h1 class="font-extrabold mb-10">DRIVE DIGITAL DISRUPTION IN HOSPITALITY</h1>
            <p class="mb-10">

              Check out the potential of digital transformation in the hospitality industry as well as ways
              Intellectsoft takes guest experience to the next level.
            </p>
            <a href="#" class="border-1px border-white text-white hover:bg-white hover:text-blue h-45px w-210px px-10px flex items-center justify-center font-bold no-underline">
              READ MORE
            </a>
          </div>
        </div>

      </div>
      <div class="slide slide5 h-700px w-full  animate__animated ">
        <div class="h-full w-full flex items-center text-white justify-center" >
          <div>
            <h1 class="font-extrabold mb-10">SMART HEALTHCARE SOLUTIONS</h1>
            <p class="mb-10">
              Leverage the power of digital solutions to provide more effective treatments and care.
            </p>
            <a href="#" class="border-1px border-white text-white hover:bg-white hover:text-blue h-45px w-210px px-10px flex items-center justify-center font-bold no-underline">
              READ MORE
            </a>
          </div>
        </div>

      </div>
      <div class="slide slide6 h-700px w-full  animate__animated ">
        <div class="h-full w-full flex items-center text-white justify-center" >
          <div>
            <h1 class="font-extrabold mb-10">INTELLIGENT INSURANCE</h1>
            <p class="mb-10">
              A strategic roadmap for insurers to enhance revenue streams, time-to-market, and profitability.
            </p>
            <a href="#" class="border-1px border-white text-white hover:bg-white hover:text-blue h-45px w-210px px-10px flex items-center justify-center font-bold no-underline">
              READ MORE
            </a>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      myTimer:'',
      carIndx:0
    }
  },
  methods:{
    Carousel:function () {
      let n = this.carIndx
      var slide=document.getElementsByClassName("slide");
      for(var i=0;i<slide.length;i++){
        try{
          slide[i].classList.add('hidden')
          slide[i].classList.remove("animate__fslideInLeft1fsdfaf")
        }
        catch{}
      }
      if(n>slide.length){this.carIndx=1;}
      if(n<=0){this.carIndx=slide.length;}
      try{
        slide[this.carIndx-1].classList.remove('hidden');
        slide[this.carIndx-1].classList.add("animate__erslideIntLeft1dfsf")

      }
      catch{}
    },
    CurrentSlide(n){
      this.SlideNav(n-this.carIndx)
    },
    SlideNav:function (n) {
      clearInterval(this.myTimer);
      this.carIndx += n
      this.Carousel()
      this.myTimer=setInterval(()=>{
        this.SlideNav(1)
      },6000)

    },
    async StartSlide(){
      this.Carousel(this.carIndx);
      this.myTimer=setInterval(()=>{
        this.SlideNav(1)
      },6000)
      return
    }

  },
  mounted(){
    setTimeout(this.StartSlide(),300)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .slide1{background: linear-gradient(to right, #1f1d1da9,#1f1d1da9), url(../assets/images/slide/planning2.jpg) no-repeat center/cover;}
.slide2{background: linear-gradient(to right, #1f1d1da9,#1f1d1da9), url(../assets/images/slide/slide_3-1x.jpg) no-repeat center/cover;}
.slide3{background: linear-gradient(to right, #1f1d1da9,#1f1d1da9), url(../assets/images/slide/slide_2-2x.jpg) no-repeat center/cover;}
.slide4{background: linear-gradient(to right, #1f1d1da9,#1f1d1da9), url(../assets/images/slide/hotel-in-smartphone.jpg) no-repeat center/cover;}
.slide5{background: linear-gradient(to right, #1f1d1da9,#1f1d1da9), url(../assets/images/slide/doctors.jpg) no-repeat center/cover;}
.slide6{background: linear-gradient(to right, #1f1d1da9,#1f1d1da9), url(../assets/images/slide/family.jpg) no-repeat center/cover;} */

</style>
