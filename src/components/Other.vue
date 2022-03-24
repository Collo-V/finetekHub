<template>



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