<template>

  <section class="client-success w-full p-16">
    <div class="client-success-cont w-4/5 mx-auto">
    <h1 class="uppercase text-center">client success</h1>
    <a href="#cases" class="text-primary block my-5 text-18pxhh text-center font-bold uppercase">
      All case studies <span class="ml-1"><i class="fa-solid fa-angle-right"></i></span>
    </a>
      <div
          style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff;margin: 0;height: fit-content"
          class="swiper mySwiper2 h-fit m-0"
      >
        <div class="swiper-wrapper ">
          <div class="swiper-slide flex">
            <div>
              <img src="../assets/images/clients-Success/cirrus-2x.jpg" alt="">
            </div>
            <div class="px-8 py-12">
              <h2 class=""> Cirrus path</h2>
              <p class="mt-5">Cirruspath was behind the highest-rated app for integrating Salesforce with a user’s email</p>  
            </div>
          </div>
          <div class="swiper-slide flex">
            <div>
              <img src="../assets/images/clients-Success/eurostar-2x.jpg" alt="">
            </div>
            <div class="px-8 py-12">
              <h2 class="text-24px"> Eurostar</h2>
              <p class="mt-5">
                A high-speed railway pioneer gains a series of automated
                 solutions to process passenger information, improve on-board...
              </p>
              
            </div>
          </div>
          <div class="swiper-slide flex">
            <div>
              <img src="../assets/images/clients-Success/harley-davidson-2x.jpg" alt="">
            </div>
            <div class="px-8 py-12">
              <h2 class="text-24px">Herley-Davidson</h2>
              <p class="mt-5">
                Iconic motorcycle brand finds a fresh way to engage its fans
                 while on the road by creating a mobile app that allows...
              </p>
            </div>
          </div>
          <div class="swiper-slide flex">
            <div>
              <img src="../assets/images/clients-Success/ernst-young-2x.jpg" alt="">
            </div>
            <div class="px-8 py-12">
              <h2 class="text-24px">Ernst & Young</h2>
              <p class="mt-5">
                Forecasts in Focus confirms E&Y 
                as a thought-leader in the eyes of an audience relying on data to drive smarter...
              </p>
            </div>
          </div>
          <div class="swiper-slide flex">
            <div>
              <img src="../assets/images/clients-Success/guinness-2x.jpg" alt="">
            </div>
            <div class="px-8 py-12">
              <h2 class="text-24px">Guinness</h2>
              <p class="mt-5">
                This marketing communications app 
            prepared for Arthur Guinness Day vitalized the conversation between the beloved...
              </p>
            </div>
          </div>
          <div class="swiper-slide flex">
            <div>
              <img src="../assets/images/clients-Success/jaguar-talk-2x.jpg" alt="">
            </div>
            <div class="px-8 py-12">
              <h2 class="text-24px">Jaguar Landrover</h2>
              <p class="mt-5">
                The JRL Talk solution is a multilingual
                 mobile application that lets the company’s representative leap over language...                
              </p>
            </div>
          </div>


        </div>
      </div>
      <div thumbsSlider="" class="swiper mySwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="../assets/images/clientLogos/cirrus.png" />
          </div>
          <div class="swiper-slide">
            <img src="../assets/images/clientLogos/eurostar.png" />
          </div>
          <div class="swiper-slide">
            <img src="../assets/images/clientLogos/harley-davidson.png" />
          </div>
          <div class="swiper-slide">
            <img src="../assets/images/clientLogos/ernst-young.png" />
          </div>
          <div class="swiper-slide">
            <img src="../assets/images/clientLogos/guinness.png" />
          </div>
          <div class="swiper-slide">
            <img src="../assets/images/clientLogos/jaguar-talk.png" />
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
// import {Swiper,SwiperSlide} from 'swiper/vue'
export default {
    name:'ClientSuccess',
  mounted() {
    var swiper = new Swiper(".mySwiper", {
      spaceBetween: 10,
      slidesPerView: 6,
      loop:true,
      autoplay:6000,
      // auto?
      freeMode: true,
      watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".mySwiper2", {
      spaceBetween: 10,
      loop:true,
      autoplay:6000,
      thumbs: {
        swiper: swiper,
      },
    });
  }

}
</script>

<style>
.swiper-slide-thumb-active{
  padding-bottom: 10px;border-bottom: solid 2px blue;
}

</style>