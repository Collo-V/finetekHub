<template>
<section class="mt-10 offers-section min-h-500px ">
    <div class="flex-col flex justify-center w-3/4 mx-auto">
        <h2 class="uppercase text-8 mb-5 text-center">what we offer</h2>
        <div class="tabs flex">
            <div class="w-1/3 " v-for="tab in offerTabs" :key='tab'>
               <div class="w-full h-ful border-b-1px flex justify-center hover:text-primary">
                   <button class="uppercase focus:ouline-none font-bold h-10">{{tab}}</button>
               </div>
               <div class="w-full h-ful border-b-1px flex justify-center hover:text-primary">
                   <button class="uppercase focus:ouline-none font-bold h-10">{{tab}}</button>
               </div>
            </div>
            

        </div>
    </div>

        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque corporis delectus et id impedit 
        inventore nobis non numquam, quisquam similique temporibus ullam. Amet aperiam beatae deleniti, 
        dignissimos dolor doloremque eius eligendi, et eum explicabo fuga, impedit incidunt inventore 
        nam neque odio odit perferendis perspiciatis quae quibusdam recusandae tempora voluptatum? Ab
        aspernatur, aut consequuntur culpa cupiditate earum eum hic id, incidunt inventore iste itaque 
        nisi placeat, qui ratione! Beatae commodi consequatur consequuntur dolor dolore doloremque
        excepturi facere laborum, maxime molestias odio, pariatur perspiciatis quas rem sed voluptas 
        voluptatibus? Atque delectus dolorum expedita, fuga illo ipsum praesentium provident, quaerat
        similique sint vel?
</section>
</template>

<script>
    export default {
        name: "Offers",
        data(){
            return{
                offerTabs:['services','techologies','industries']
            }
        }
    }
</script>

<style scoped>
    .offers-section{background: url(../assets/images/bg-offers.webp) no-repeat center/cover}

</style>