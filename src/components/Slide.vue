<template>
  <div class="carousel-swiper swiper w-full">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide animate_animated">
        <div class=" slide1 h-700px w-full inline-block w-full  animate__animated w">
          <div class="h-full w-full flex items-center text-white justify-center" >
            <div class="w-4/5 lg:w-1/2">
              <h1 class="font-extrabold text-primary mb-10 text-6 lg:text-10">ENTERPRISE SOFTWARE DEVELOPMENT</h1>
              <p class="mb-10">
                Leverage our ten-year expertise to create a solid software foundation for your business.
              </p>
              <a href="#" class="border-1px border-white text-white hover:bg-white hover:text-blue h-45px w-210px px-10px flex items-center justify-center font-bold no-underline">
                READ MORE
              </a>
            </div>
          </div>

        </div>
      </div>

      <div class="swiper-slide animate_animated">
        <div class="slide2 h-700px w-full inline-block animate__animated ">
          <div class="h-full w-full flex items-center text-white justify-center" >
            <div class="w-4/5 lg:w-1/2">
              <h1 class="font-extrabold text-primary mb-10 text-6 lg:text-10">DEDICATED DEVELOPMENT TEAMS</h1>
              <p class="mb-10">
                Hire top tech talent and quickly scale your delivery capacity. Our engineers have the necessary niche skills, deep expertise, and are highly loyal.
              </p>
              <a href="#s" class="border-1px border-white text-white hover:bg-white hover:text-blue h-45px w-210px px-10px flex items-center justify-center font-bold no-underline">
                READ MORE
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="swiper-slide animate_animated">
        <div class="slide3 h-700px w-full inline-block animate__animated ">
          <div class="h-full w-full flex items-center text-white justify-center" >
            <div class="w-4/5 lg:w-1/2">
              <h1 class="font-extrabold text-primary mb-10 text-6 lg:text-10">MOBILE APP DEVELOPMENT</h1>
              <p class="mb-10">
                Delivering on-demand mobile app experiences for startups and enterprise clients by leveraging the latest technologies.
              </p>
              <a href="#" class="border-1px border-white text-white hover:bg-white hover:text-blue h-45px w-210px px-10px flex items-center justify-center font-bold no-underline">
                READ MORE
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="swiper-slide animate_animated">
        <div class="slide4 h-700px w-full inline-block animate__animated ">
          <div class="h-full w-full flex items-center text-white justify-center" >
            <div class="w-4/5 lg:w-1/2">
              <h1 class="font-extrabold text-primary mb-10 text-6 lg:text-10">DRIVE DIGITAL DISRUPTION IN HOSPITALITY</h1>
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
      </div>

      <div class="swiper-slide animate_animated">
        <div class="slide5 h-700px w-full inline-block animate__animated ">
          <div class="h-full w-full flex items-center text-white justify-center" >
            <div class="w-4/5 lg:w-1/2">
              <h1 class="font-extrabold text-primary mb-10 text-6 lg:text-10">INTELLIGENT HEALTHCARE SOLUTIONS</h1>
              <p class="mb-10">
                Leverage the power of digital solutions to provide more effective treatments and care.
              </p>
              <a href="#" class="border-1px border-white text-white hover:bg-white hover:text-blue h-45px w-210px px-10px flex items-center justify-center font-bold no-underline">
                READ MORE
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="swiper-slide animate_animated">
        <div class="slide6 h-700px w-full inline-block animate__animated ">
          <div class="h-full w-full flex items-center text-white justify-center" >
            <div class="w-4/5 lg:w-1/2">
              <h1 class="font-extrabold text-primary mb-10 text-6 lg:text-10">INTELLIGENT INSURANCE</h1>
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

    <div class="swiper-pagination flex justify-center items-center mb-20px w-1/2 mx-auto float-right">

    </div>
<!--FOR NAVIGATION-->
<!--    <div class="swiper-button-prev h-16">-->
<!--    </div>-->
<!--    <div class="swiper-button-next h-16">-->
<!--    </div>-->

    <div class="swiper-scrollbar"></div>
  </div>
</template>
<script>

  export default {
    components: {
    },
    data(){
      return{
        colors:['primary','primary-purple','primary-red','primary-yellow']
      }
    },
    computed:{
      Pagination(){
        let colors = this.colors
        let a  = document.getElementsByClassName('page-bullet')
        let start = Math.floor(Math.random()*colors.length)
        for (let i = 0; i <a.length; i++) {
          let next = start+i
          let indx= next<=colors.length-1? next:
              next<=colors.length*2-1?next-colors.length:next-colors.length*2
          a[i].classList.add(`bg-${colors[indx]}`)
          // console.log(`bg-${colors[indx]}`)
        }
      }
    },
    mounted() {
      const swiper = new Swiper('.carousel-swiper', {
        loop: true,
        spaceBetween:10,
        slidePrevClass:'swiper-slide-duplicate-prev slide animate__slideOutLeft',
        slideActiveClass:'swiper-slide-active animate__slideInRight',
        speed:1000,


        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          clickable:true,
          bulletClass:'page-bullet',
          bulletActiveClass:'page-bullet-active',

        },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
        autoplay:{
          delay:6000
        }
      });
      this.Pagination
    },
  };
</script>

<style>
  /*.carousel-swiper{display: none}*/
  .swiper:active{cursor: grab;}
  .slide1{background: linear-gradient(to right, #1f1d1da9,#1f1d1da9), url(~@/assets/images/slide/planning2.jpg) no-repeat center/cover;}
  .slide2{background: linear-gradient(to right, #1f1d1da9,#1f1d1da9), url(~@/assets/images/slide/slide_3-1x.jpg) no-repeat center/cover}
  .slide3{background: linear-gradient(to right, #1f1d1da9,#1f1d1da9), url(~@/assets/images/slide/slide_2-2x.jpg) no-repeat center/cover;}
  .slide4{background: linear-gradient(to right, #1f1d1da9,#1f1d1da9), url(~@/assets/images/slide/hotel-in-smartphone.jpg) no-repeat center/cover;}
  .slide5{background: linear-gradient(to right, #1f1d1da9,#1f1d1da9), url(~@/assets/images/slide/doctors.jpg) no-repeat center/cover;}
  .slide6{background: linear-gradient(to right, #1f1d1da9,#1f1d1da9), url(~@/assets/images/slide/family.jpg) no-repeat center/cover;}


  .page-bullet{height: 8px;width: 8px;border-radius: unset;display: inline-block;margin-right: 28px;}
  .page-bullet-active,.page-bullet:hover{height: 12px;width: 12px;}
  .swiper-horizontal>.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal{width: 100%;justify-content: flex-end;padding-right: 100px}

  .swiper-button-prev::after,.swiper-button-next::after{content:unset}

  .swiper-button-prev{background:url(~@/assets/images/icons/arrow-right-light.svg) no-repeat center;transform: rotate(180deg)}
  .swiper-button-prev:hover{background:linear-gradient(to right, #5250503a,#5250503a), url(~@/assets/images/icons/arrow-left-dark.svg) no-repeat center;transform: none;}
  .swiper-button-next{background:url(~@/assets/images/icons/arrow-right-light.svg) no-repeat center}
  .swiper-button-next:hover{background:linear-gradient(to right, #5250503a,#5250503a), url(~@/assets/images/icons/arrow-left-dark.svg) no-repeat center;transform: rotate(180deg);}
  
</style>