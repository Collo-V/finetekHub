<template>
   <div class="w-3/5 mx-auto">-->
       <h1>Client Success</h1>
       <span class="block">All cases</span>
        <div class="w-full overflow-hidden relative h-500px">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, nulla?
            <div class="w-full overflow-x-scroll absolute top-0 left-0 right-0 swipe-cont " @drag.prevent="Swipe">
                <div class="inline-flex w-full" id="swipe-window1">
                    <img src="../assets/images/clients-Success/cirrus-2x.jpg" alt="" class="w-600px">
                    <div class="ml-10">
                        <h3 class="mb-6 text-5">Cirrus Path</h3>
                        <p>Cirruspath was behind the highest-rated app for integrating Salesforce with a user’s email inbox. Cirrus
                            Insight Mobile helps you leverage your sales data to gain valuable insights and uncover new...
                        </p>
                    </div>
                </div>
                <div class="inline-flex w-full" id="swipe1">
                    <img src="../assets/images/clients-Success/cirrus-2x.jpg" alt="" class="w-600px">
                    <div class="ml-10">
                        <h3 class="mb-6 text-5">Aprakumbem</h3>
                        <p>A high-speed railway pioneer gains a series of automated solutions
                            to process passenger information, improve on-board services, and report critical information to passengers.
                        </p>
                    </div>
                </div>
                <div class="inline-flex w-full" id="swipe2">
                    <img src="../assets/images/clients-Success/cirrus-2x.jpg" alt="" class="w-600px">
                    <div class="ml-10">
                        <h3 class="mb-6 text-5">dsfgsdfv</h3>
                        <p>A high-speed railway pioneer gains a series of automated solutions
                            to process passenger information, improve on-board services, and report critical information to passengers.
                        </p>
                    </div>
                </div>
                <div class="inline-flex w-full" id="swipe3">
                    <img src="../assets/images/clients-Success/cirrus-2x.jpg" alt="" class="w-600px">
                    <div class="ml-10">
                        <h3 class="mb-6 text-5">gdfsg</h3>
                        <p>A high-speed railway pioneer gains a series of automated solutions
                            to process passenger information, improve on-board services, and report critical information to passengers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
   </div>
    <div>
        <!-- <swiper
                :slides-per-view="3"
                :space-between="50"
                @swiper="onSwiper"
                @slideChange="onSlideChange"
        >

            <swiper-slide>
                <div class="inline-flex w-full" id="swipe-window1">
                    <img src="../assets/images/clients-Success/cirrus-2x.jpg" alt="" class="w-600px">
                    <div class="ml-10">
                        <h3 class="mb-6 text-5">Cirrus Path</h3>
                        <p>Cirruspath was behind the highest-rated app for integrating Salesforce with a user’s email inbox. Cirrus
                            Insight Mobile helps you leverage your sales data to gain valuable insights and uncover new...
                        </p>
                    </div>
                </div>
            </swiper-slide>


            <swiper-slide>
                <div class="inline-flex w-full" id="swipe1">
                    <img src="../assets/images/clients-Success/cirrus-2x.jpg" alt="" class="w-600px">
                    <div class="ml-10">
                        <h3 class="mb-6 text-5">Aprakumbem</h3>
                        <p>A high-speed railway pioneer gains a series of automated solutions
                            to process passenger information, improve on-board services, and report critical information to passengers.
                        </p>
                    </div>
                </div>
            </swiper-slide>


            <swiper-slide>
                <div class="inline-flex w-full" id="swipe2">
                    <img src="../assets/images/clients-Success/cirrus-2x.jpg" alt="" class="w-600px">
                    <div class="ml-10">
                        <h3 class="mb-6 text-5">dsfgsdfv</h3>
                        <p>A high-speed railway pioneer gains a series of automated solutions
                            to process passenger information, improve on-board services, and report critical information to passengers.
                        </p>
                    </div>
                </div>
            </swiper-slide>

            <swiper-slide>
                <div class="inline-flex w-full" id="swipe3">
                    <img src="../assets/images/clients-Success/cirrus-2x.jpg" alt="" class="w-600px">
                    <div class="ml-10">
                        <h3 class="mb-6 text-5">gdfsg</h3>
                        <p>A high-speed railway pioneer gains a series of automated solutions
                            to process passenger information, improve on-board services, and report critical information to passengers.
                        </p>
                    </div>
                </div>

            </swiper-slide>



        </swiper> -->
    </div>
</template>

<script>
    // import {Swiper} from 'swiper'
    // import {SwiperSlide} from 'swiper/vue'
    export default {
        name: "Clients.vue",
        components:{
            // Swiper
        },
        methods:{
            Swipe(event){
                    document.getElementById('swipe1').scrollIntoView()
                // $(".swipe-cont").on("swipe",function(){
                //     alert()
                //     document.getElementById('swipe1').scrollIntoView()
                // });
                // $(document).ready(function(){
                // });
                // $('.swipe-cont').on("swipe",function () {
                // })

            }
        },
        // setup() {
        //     const onSwiper = (swiper) => {
        //         console.log(swiper);
        //     };
        //     const onSlideChange = () => {
        //         console.log('slide change');
        //     };
        //     return {
        //         onSwiper,
        //         onSlideChange,
        //     };
        // },
    }
</script>

<style scoped>
    .swipe-cont{white-space: nowrap;bottom:-10%}
    .swipe-cont div{white-space: initial}

</style>