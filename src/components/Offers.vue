<template>
<section class="mt-10 offers-section min-h-500px p-16">
    <div class="flex-col flex justify-center w-9/10 mx-auto">
        <h2 class="uppercase text-24px lg:text-8 mb-5 text-center">what we offer</h2>
        <div class="tabs flex mb-10 w-9/10 mx-auto">
            <div class="w-1/3 " v-for="tab in offerTabs" :key='tab'>
               <div class="w-full h-full border-b-1px flex justify-center hover:text-primary" v-if="tab!=activeTab">
                   <button class="uppercase focus:outline-none font-bold h-10" @click="activeTab=tab">{{tab}}</button>
               </div>
               <div class="w-full h-full border-b-1px flex justify-center 
               hover:text-primary border-primary text-primary" v-else>
                   <button class="uppercase focus:outline-none font-bold h-10">{{tab}}</button>
               </div>
            </div>
        </div>
        <div class="w-full">
            <div class="flex flex-wrap justify-center w-full overflow-hidden" v-if="activeTab=='services'">
                <div class="svc-item w-4/5 md:w-48% lg:w-30% inline-flex h-190px min-w-300px max-w-372px
                mb-2px mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white rounded-tl-lg ">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">enterprise system development</h3>
                        <p class="mt-3">
                            Create complex enterprise software, ensure reliable software integration, modernise your legacy system.
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-30% md:rounded-tr-lg inline-flex h-190px min-w-300px max-w-372px mb-2px mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">enterprise system development</h3>
                        <p class="mt-3">
                            Create complex enterprise software, ensure reliable software integration, modernise your legacy system.
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-30% lg:rounded-tr-lg  m inline-flex h-190px min-w-300px max-w-372px mb-2px mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">enterprise system development</h3>
                        <p class="mt-3">
                            Create complex enterprise software, ensure reliable software integration, modernise your legacy system.
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-30% inline-flex h-190px min-w-300px max-w-372px mb-2px mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">enterprise system development</h3>
                        <p class="mt-3">
                            Create complex enterprise software, ensure reliable software integration, modernise your legacy system.
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-30%   inline-flex h-190px min-w-300px max-w-372px mb-2px mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">enterprise system development</h3>
                        <p class="mt-3">
                            Create complex enterprise software, ensure reliable software integration, modernise your legacy system.
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-30%  inline-flex h-190px min-w-300px max-w-372px mb-2px mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">enterprise system development</h3>
                        <p class="mt-3">
                            Create complex enterprise software, ensure reliable software integration, modernise your legacy system.
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                
                
            </div>
            <div class="flex justify-center" v-else-if="activeTab=='technologies'">
                <div class="svc-item w-1/2 h-190px mb-2px  min-px mr-2px ma-w-372px  bg-white flex justify-center items-center">
                    <div class="mr-4">1</div>
                    <div class="max-w-260px">
                      e Development
                      Create complex enterprise software, ensure reliable software integration, modernise your legacy system.
                      view more
                    </div>
                </div>
                <div class="svc-item w-1/2 h-190px mb-2px  min-px mr-2px ma-w-372px x bg-white flex justify-center items-center">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/2 h-190px mb-2px  min-px mr-2px ma-w-372px x bg-white flex justify-center items-center">
                    <div class="mr-4">3</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/2 h-190px mb-2px  min-px mr-2px ma-w-372px x bg-white flex justify-center items-center">
                    <div class="mr-4">4</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/2 h-190px mb-2px  min-px mr-2px ma-w-372px x bg-white flex justify-center items-center">
                    <div class="mr-4">5</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/2 h-190px mb-2px  min-px mr-2px ma-w-372px x bg-white flex justify-center items-center">
                    <div class="mr-4">6</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                
            </div>
            <div class="flex flex-wrap justify-center" v-else>
                <div class="svc-item w-1/3 h-190px w-300px mb-2px  min-px mr-2px max-w-372px x bg-white flex justify-center items-center">
                    <div class="mr-4">1</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 h-190px w-300px mb-2px  min-px mr-2px max-w-372px x bg-white flex justify-center items-center">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 h-190px w-300px mb-2px  min-px mr-2px max-w-372px x bg-white flex justify-center items-center">
                    <div class="mr-4">3</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 h-190px w-300px mb-2px  min-px mr-2px max-w-372px x bg-white flex justify-center items-center">
                    <div class="mr-4">4</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 h-190px w-300px mb-2px  min-px mr-2px max-w-372px x bg-white flex justify-center items-center">
                    <div class="mr-4">5</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 h-190px w-300px mb-2px  min-px mr-2px max-w-372px x bg-white flex justify-center items-center">
                    <div class="mr-4">6</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis,.</div>
                </div>
                
            </div>
        </div>
    </div>

        
</section>
</template>

<script>
    export default {
        name: "Offers",
        data(){
            return{
                activeTab:'services',
                offerTabs:['services','technologies','industries']
            }
        }
    }
</script>

<style scoped>
    .offers-section{background: url(../assets/images/bg-offers.webp) no-repeat center/cover}
    .svc-item:hover .offer-more-link{display: block;}

</style>