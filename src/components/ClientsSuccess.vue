<template>
  <div
      style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff"
      class="swiper mySwiper2"
  >
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
      </div>
      <div class="swiper-slide">
        <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
      </div>
      <div class="swiper-slide">
        <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
      </div>
      <div class="swiper-slide">
        <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
      </div>
      <div class="swiper-slide">
        <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
      </div>
      <div class="swiper-slide">
        <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
      </div>

    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
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
      // auto?
      freeMode: true,
      watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".mySwiper2", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
    });
  }

}
</script>

<style>

</style>