<template>
<section class="mt-10 offers-section min-h-500px p-16">
    <div class="flex-col flex justify-center w-3/4 mx-auto">
        <h2 class="uppercase text-8 mb-5 text-center">what we offer</h2>
        <div class="tabs flex mb-10">
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
            <div class="flex flex-wrap rounded-lg w-fit bg-red overflow-hidden" v-if="activeTab=='services'"> 
                <div class="svc-item w-1/3 inline-flex h-190px min-w-300px max-w-372px mb-2px mr-2px px-4 bg-white justify-center items-center">
                    <div class="mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fill-rule="evenodd" filter="url(#a)" transform="translate(-385 -47)">
                                <path stroke="#323232" d="M451.478 110h-46.956c-1.945 0-3.522-1.562-3.522-3.488v-2.326h21.13l1.174 1.163h9.392l1.174-1.163H455v2.326c0 1.926-1.577 3.488-3.522 3.488zm-46.956-5.814v-3.488 3.488zm21.13-31.395h23.478a2.336 2.336 0 0 1 2.348 2.325v29.07"></path>
                                <path stroke="#1476F2" d="M423.304 86.744v9.303a2.336 2.336 0 0 1-2.347 2.325h-17.61A2.336 2.336 0 0 1 401 96.047V62.326A2.336 2.336 0 0 1 403.348 60h17.609a2.336 2.336 0 0 1 2.347 2.326v17.441"></path>
                                <path stroke="#1476F2" stroke-linejoin="round" d="M401 91.395h22.304m0-25.581H401m9.391 29.07h3.522"></path>
                                <path stroke="#1476F2" d="M433.87 83.256h-21.13m3.52 3.488l-3.52-3.488 3.52-3.489m14.088 6.977l3.522-3.488-3.522-3.489"></path>
                            </g>
                            
                        </svg>                     
                    </div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 inline-flex h-190px min-w-300px max-w-372px mb-2px mr-2px px-4 bg-white justify-center items-center">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 inline-flex h-190px min-w-300px max-w-372px mb-2px mr-2px px-4 bg-white justify-center items-center">
                    <div class="mr-4">3</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 inline-flex h-190px min-w-300px max-w-372px mb-2px mr-2px px-4 bg-white justify-center items-center">
                    <div class="mr-4">4</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 inline-flex h-190px min-w-300px max-w-372px mb-2px mr-2px px-4 bg-white justify-center items-center">
                    <div class="mr-4">5</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 inline-flex h-190px min-w-300px max-w-372px mb-2px mr-2px px-4 bg-white justify-center items-center">
                    <div class="mr-4">6</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                
            </div>
            <div class="flex flex-wrap" v-else-if="activeTab=='technologies'">
                <div class="svc-item w-1/3 h-190px w-300px mb-2min-px mr-2pmax-w-372px x bg-white flepx-4 x justify-center items-center">
                    <div class="mr-4">1</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 h-190px w-300px mb-2min-px mr-2pmax-w-372px x bg-white flepx-4 x justify-center items-center">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 h-190px w-300px mb-2min-px mr-2pmax-w-372px x bg-white flepx-4 x justify-center items-center">
                    <div class="mr-4">3</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 h-190px w-300px mb-2min-px mr-2pmax-w-372px x bg-white flepx-4 x justify-center items-center">
                    <div class="mr-4">4</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 h-190px w-300px mb-2min-px mr-2pmax-w-372px x bg-white flepx-4 x justify-center items-center">
                    <div class="mr-4">5</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 h-190px w-300px mb-2min-px mr-2pmax-w-372px x bg-white flepx-4 x justify-center items-center">
                    <div class="mr-4">6</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                
            </div>
            <div class="flex flex-wrap" v-else>
                <div class="svc-item w-1/3 h-190px w-300px mb-2min-px mr-2pmax-w-372px x bg-white flepx-4 x justify-center items-center">
                    <div class="mr-4">1</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 h-190px w-300px mb-2min-px mr-2pmax-w-372px x bg-white flepx-4 x justify-center items-center">
                    <div class="mr-4">2</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 h-190px w-300px mb-2min-px mr-2pmax-w-372px x bg-white flepx-4 x justify-center items-center">
                    <div class="mr-4">3</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 h-190px w-300px mb-2min-px mr-2pmax-w-372px x bg-white flepx-4 x justify-center items-center">
                    <div class="mr-4">4</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 h-190px w-300px mb-2min-px mr-2pmax-w-372px x bg-white flepx-4 x justify-center items-center">
                    <div class="mr-4">5</div>
                    <div class="max-w-260px">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatum.</div>
                </div>
                <div class="svc-item w-1/3 h-190px w-300px mb-2min-px mr-2pmax-w-372px x bg-white flepx-4 x justify-center items-center">
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

</style>