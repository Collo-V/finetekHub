<template>

  <section class="client-success w-full p-16">
    <div class="client-success-cont w-4/5 mx-auto">
    <h1 class="uppercase text-center">Latest news and insights</h1>
    <a href="#cases" class="text-primary block my-5 text-18pxhh text-center font-bold uppercase">
      All posts <span class="ml-1"><i class="fa-solid fa-angle-right"></i></span>
    </a>
    <div class="flex">
      <div class="w-1/2 mr-3 shadow-md">
        <div>
          <img src="../assets/images/news/code.jpg" alt="">
        </div>
        <div class="p-3">
          <p class="uppercase mb-5 opacity-25">development</p>
          <h1 class="text-24px font-bold">A Complete Guide to NOde.js: 2022 and beyond</h1>
          <p class="text-grey-dark mt-3">
            Selecting the right languages, tools and platforms have a huge impact on the software’s functioning
            – from the simplicity of its creation to the perfo...
          </p>
          <a href="" class="text-primary uppercase animate__animated slideInUp block mt-5"></a>
        </div>
      </div>
      <div class="w-1/2">
        <div class="flex shadow-md">
          <div class="w-600px">
            <img src="../assets/images/news/Modernizing-legacy-systems-in-banking-Cover-600x252.jpg" class="w-600px">
          </div>
          <div class="p-8">
            <p class="uppercase mb-3 text-grey-dark">development</p>
            <h2 class="pb-3 text-4">How and Why to Modernize Legacy Systems in Banking</h2>
            <p class="text-grey-dark">
              Legacy systems no longer serve their purpose of supporting the market’s rising needs and expectations.
              According to McKinsey, a comprehensive approach...
            </p>
          </div>
        </div>
        <div class="flex mt-3 shadow-md">
          <div class="w-600px relative">
            <img src="../assets/images/news/Improve-Quality-in-Construction-Cover-600x252.jpg"
                 class="absolute top-1/2">
          </div>
          <div class="p-8">
            <p class="uppercase mb-3  text-grey-dark">construction</p>
            <h2 class="pb-3 text-4">Proven Ways to Improve Quality in Construction Projects</h2>
            <p class="text-grey-dark">
              The digital transformation continues, leading to the appearance of more technologies in construction.
              According to Deloitte, by 2022, the engineering...
            </p>
          </div>
        </div>

      </div>
    </div>



    </div>
  </section>

</template>

<script>
// import {Swiper,SwiperSlide} from 'swiper/vue'
export default {
    name:'News',
  mounted() {
    var swiper = new Swiper(".mySwiper", {
      spaceBetween: 10,
      slidesPerView: 6,
      loop:true,
      autoplay: {
        delay:6000
      },
      // auto?
      freeMode: true,
      watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".mySwiper2", {
      spaceBetween: 10,
      loop:true,
      autoplay: {
        delay:6000
      },
      thumbs: {
        swiper: swiper,
      },
    });
  }

}
</script>

<style>
.swiper-slide-thumb-active{
  padding-bottom:0PX;border-bottom: solid 2px blue;
}

</style>