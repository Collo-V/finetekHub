<template>
<section class="offers-section min-h-screen-h-80 p-16">
    <div class="flex-col flex justify-center items-center w-9/10 mx-auto ">
        <h2 class="uppercase text-24px lg:text-8 mb-5 text-center">what we offer</h2>
        <div class="tabs flex mb-10 w-9/10 mx-auto justify-center">
            <div class="w-1/3 max-w-300px" v-for="tab in offerTabs" :key='tab'>
              <div class="w-full h-full flex justify-center border-b-1px border-primary-red" v-if="tab == activeTab && tab=='technologies'">
                <button class="uppercase focus:outline-none font-bold h-10 text-primary-red"
                        @click="activeTab=tab">{{tab}}</button>
              </div>
              <div class="w-full h-full flex justify-center border-b-1px border-primary" v-else-if="tab == activeTab">
                <button class="uppercase focus:outline-none font-bold h-10 text-primary"
                        @click="activeTab=tab">{{tab}}</button>
              </div>
              <div class="w-full h-full flex justify-center border-b-1px" v-else-if="tab != activeTab && tab=='technologies'">
                <button class="uppercase focus:outline-none font-bold h-10 hover:text-primary-red"
                        @click="activeTab=tab">{{tab}}</button>
              </div>
              <div class="w-full h-full flex justify-center border-b-1px" v-else>
                <button class="uppercase focus:outline-none font-bold h-10 hover:text-primary"
                        @click="activeTab=tab">{{tab}}</button>
              </div>

            </div>
        </div>
        <div class="w-full max-w-1200px">
            <div class="flex flex-wrap justify-center w-full overflow-hidden" v-if="activeTab=='services'">
                <div class="svc-item w-4/5 md:w-48% lg:w-30% inline-flex h-190px min-w-300px
                mb-2px mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white rounded-tl-lg rounded-tr-lg md:rounded-tr-none">
                  <div class="mr-4 block"><img src="../assets/images/offers/productEngineering.svg" class="w-120px"></div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">enterprise system development</h3>
                        <p class="mt-3">
                            Create complex enterprise software, ensure reliable software integration, modernise your legacy system.
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-30% md:rounded-tr-lg lg:rounded-none inline-flex h-190px min-w-300px mb-2px mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white">
                    <div class="mr-4 block"><img src="../assets/images/offers/mobileDev.svg" class="w-120px"></div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">mobile app development</h3>
                        <p class="mt-3">
                            Create an impactful mobile app that fits your brand and industry within a shorter time frame
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-30% lg:rounded-tr-lg  m inline-flex h-190px min-w-300px mb-2px mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white">
                  <div class="mr-4 block"><img src="../assets/images/offers/dedicatedTeam.svg" class="w-120px"></div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">dedicated development team</h3>
                        <p class="mt-3">
                            Hire a loyal software development team with niche skills and deep expertise
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-30% inline-flex h-190px min-w-300px mb-2px 
                mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white lg:rounded-bl-lg">
                  <div class="mr-4 block"><img src="../assets/images/offers/itConsulting.svg" class="w-120px"></div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">It consulting</h3>
                        <p class="mt-3">
                            Trust our top minds to eliminate workflow pain points, implement
                          new technology and consolidate app portfolios
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-30%   inline-flex h-190px min-w-300px mb-2px
                 mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white md:rounded-bl-lg lg:rounded-none">
                  <div class="mr-4 block"><img src="../assets/images/offers/uiuxDesign.svg" class="w-120px"></div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">UX/UI Design</h3>
                        <p class="mt-3">
                            Build the product you need on time with an experienced team that uses a clear and effective design process
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-30%  inline-flex h-190px min-w-300px mb-2px
                 mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white rounded-bl-lg md:rounded-bl-none rounded-br-lg">
                  <div class="mr-4 block"><img src="../assets/images/offers/qaTesting_1.svg" class="w-120px"></div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">QA & testing</h3>
                        <p class="mt-3">
                            Turn to our experts to perform comprehensive, multi-stage testing and auditing of your software
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                
                
            </div>
            <div class="flex justify-center flex-wrap " v-else-if="activeTab=='technologies'">
                <div class="svc-item w-4/5 md:w-48% lg:w-49% inline-flex h-190px min-w-300px 
                mb-2px mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white rounded-tl-lg rounded-tr-lg md:rounded-tr-none">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">enterprise system development</h3>
                        <p class="mt-3">
                            Create complex enterprise software, ensure reliable software integration, modernise your legacy system.
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-49% md:rounded-tr-lg inline-flex h-190px min-w-300px  mb-2px mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">enterprise system development</h3>
                        <p class="mt-3">
                            Create complex enterprise software, ensure reliable software integration, modernise your legacy system.
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-49% md:rounded-bl-lg inline-flex h-190px min-w-300px  mb-2px mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">enterprise system development</h3>
                        <p class="mt-3">
                            Create complex enterprise software, ensure reliable software integration, modernise your legacy system.
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-49% inline-flex h-190px min-w-300px  mb-2px 
                mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white rounded-bl-lg md:rounded-bl-none rounded-br-lg">
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
            <div class="flex flex-wrap justify-center" v-else>
                
                <div class="svc-item w-4/5 md:w-48% lg:w-30% inline-flex h-190px min-w-300px
                mb-2px mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white rounded-tl-lg rounded-tr-lg md:rounded-tr-none">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">enterprise system development</h3>
                        <p class="mt-3">
                            Create complex enterprise software, ensure reliable software integration, modernise your legacy system.
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-30% md:rounded-tr-lg lg:rounded-none inline-flex h-190px min-w-300px mb-2px mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">enterprise system development</h3>
                        <p class="mt-3">
                            Create complex enterprise software, ensure reliable software integration, modernise your legacy system.
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-30% lg:rounded-tr-lg  m inline-flex h-190px min-w-300px mb-2px mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">enterprise system development</h3>
                        <p class="mt-3">
                            Create complex enterprise software, ensure reliable software integration, modernise your legacy system.
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-30% inline-flex h-190px min-w-300px max-w-372px mb-2px 
                mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white lg:rounded-bl-lg">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">enterprise system development</h3>
                        <p class="mt-3">
                            Create complex enterprise software, ensure reliable software integration, modernise your legacy system.
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-30%   inline-flex h-190px min-w-300px max-w-372px mb-2px
                 mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white md:rounded-bl-lg lg:rounded-none">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">
                        <h3 class="capitalize text-15px">enterprise system development</h3>
                        <p class="mt-3">
                            Create complex enterprise software, ensure reliable software integration, modernise your legacy system.
                        </p>
                        <a href="#herer" class="offer-more-link hidden mt-3 uppercase svc-dropdown">view more</a>
                    </div>
                </div>
                <div class="svc-item w-4/5 md:w-48% lg:w-30%  inline-flex h-190px min-w-300px max-w-372px mb-2px
                 mr-2px px-4 bg-white justify-between items-center hover:bg-primary hover:text-white rounded-bl-lg md:rounded-bl-none rounded-br-lg">
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
    .offers-section{background:linear-gradient(to right, #1f1d1da9,#1f1d1da9),url(../assets/images/offers/offerBackground.png) no-repeat center/cover}
    .svc-item:hover .offer-more-link{display: block;}

</style>