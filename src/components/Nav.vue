<template>
    <nav class="nav h-80px absolute top-0 w-full z-2 flex items-center justify-center hover:bg-white text-black justify-center text-white hover:text-black" id="nav">
        <div class="flex w-4/5  h-full items-center">
            <div class="w-full">
                <div class="w-170px h-46px mx-auto logo-div"></div>
            </div>
            <ul class="list-none h-full flex">
                <li class=" menu-item services h-full inline-flex items-center">
                    <button class="w-32 focus:outline-none mr-2 uppercase font-bold hover:text-primary">Services</button>
                    <div class="menu-dropdown shadow-lg hidden absolute w-full right-0 top-full bg-white p-10 h-450px">
                        <div class="4/5 mx-auto flex">
                            <div class="flex">
                                <a href="#" class="w-1/3 block mr-12">
                                    <div class="w-210px">
                                        <div class="h-180px">
                                            <img src="../assets/images/menu/plane.png" alt="" class="h-80px block">
                                            <div>
                                                <h3 class="py-3 whitespace-nowrap">Product Engineering</h3>
                                                <p>Leverage our expertise in full life-cycle application design, integration, and management</p>
                                            </div>
                                        </div>
                                        <span class="mt-5 uppercase text-primary block font-bold">read more <span class="ml-1"><i class="fa-solid fa-angle-right"></i></span></span>

                                    </div>
                                </a>
                                <span  href="#" class="w-1/3 block mr-12 mob-dev-cont">
                                <a href="#fhfd">
                                    <div class="w-210px">
                                        <div class="h-180px">
                                            <img src="../assets/images/menu/engineer.png" alt="" class=" block">
                                            <div>
                                                <h3 class="py-3 whitespace-nowrap">Mobile Development</h3>
                                                <p>Go mobile-first with superior digital products, enabling seamless user experiences across all devices</p>
                                            </div>
                                        </div>
                                        <span class="mt-5 uppercase text-primary block font-bold">read more <span class="ml-1"><i class="fa-solid fa-angle-right"></i></span></span>
                                    </div>
                                </a>
                                <div class="absolute btm-0 h-18 mb-10 w-full left-0 p-10 hidden mob-dev-list">
                                    <div>
                                        <h2 class="opacity-50">Mobile Development</h2>
                                    </div>
                                    <div class="mt-3">
                                        <ul class="list-none font-bold bg-secondary">
                                            <li class="float-left w-32">
                                                <a href="#kfssdsad" class="hover:text-primary">iOS</a>
                                            </li>
                                            <li class="float-left w-32 ">
                                                <a href="#dkfhsadf" class="hover:text-primary">Android</a>
                                            </li>
                                            <li class="float-left w-32">
                                                <a href="#edfsf" class="hover:text-primary">Windows</a>
                                            </li>
                                            <li class="float-left w-32">
                                                <a href="#dsafsdf" class="hover:text-primary">Hybrid</a>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </span>
                                <a href="#" class="w-1/3 block mr-12">
                                    <div class="w-210px">
                                        <div class="h-180px">
                                            <img src="../assets/images/menu/guys.png" alt="" class=" block">
                                            <div>
                                                <h3 class="py-3 whitespace-nowrap">Dedicated Team</h3>
                                                <p>Scale your delivery capacity and build products faster with the help of our top qualified engineers</p>
                                            </div>
                                        </div>
                                        <span class="mt-5 uppercase text-primary block  font-bold">read more <span class="ml-1"><i class="fa-solid fa-angle-right"></i></span></span>
                                    </div>
                                </a>
                            </div>
                            <div class="border-l-1px pl-10 h-fit">
                                <div class="h-180px">
                                    <a href="#" class="hover:text-primary mb-2 block h-5">IT Consulting</a>
                                    <a href="#" class="hover:text-primary mb-2 block h-5">Digital Transformation</a>
                                    <a href="#" class="hover:text-primary mb-2 block h-5">UX / UI Design</a>
                                    <a href="#" class="hover:text-primary mb-2 block h-5">QA & Testing</a>
                                    <a href="#" class="hover:text-primary mb-2 block h-5">DevOps</a>
                                </div>
                                <a href="#" class="hover:text-primary mb-1 block h-5">
                                    <span class="mt-5 uppercase text-primary block font-bold">ALL SERVICES <span class="ml-1"><i class="fa-solid fa-angle-right"></i></span></span>
                                </a>
                            </div>

                        </div>

                    </div>
                </li>
                <li class="menu-item tech h-full inline-flex items-center">
                    <button class="w-32 focus:outline-none mr-2 uppercase font-bold hover:text-primary">Technologies</button>
                    <div class="menu-dropdown shadow-lg hidden absolute w-full right-0 top-full bg-white p-10 h-350px">
                        <div class="mx-auto w-max flex justify-cente">
                            <div class="w-550px h-10 bg-secondary relative block invisible"></div>
                            <div class=" flex h-full items-center ml-8 hidden">
                                <div class="border-l-1px h-fit relative pl-3 w-225px">
                                    <div class="mb-5 ">
                                        <span class="opacity-50">LABS</span>
                                        <div class="menu-img-div absolute right-full top-0 mr-8 h-fit w-max ">
                                            <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                <div class="w-4/5 mx-auto text-white">
                                                    With our five dedicated labs, Intellectsoft helps businesses accelerate
                                                    adoption of new technologies and orchestrate ongoing innovation
                                                </div>
                                            </div>
                                            <img src="../assets/images/menu/tech/type.jpg" alt="" class="w-550px">
                                        </div>

                                    </div>
                                    <div class="mb-5 dropdown-cont">
                                        <a href="#hj" class="hover:text-primary">Internet of Things (IoT) <i class="fa-solid fa-angle-right"></i></a>
                                        <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                            <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                <div class="w-4/5 mx-auto text-white">
                                                    Enterprise Industrial IoT and smart infrastructure solutions
                                                </div>
                                            </div>
                                            <img src="../assets/images/menu/tech/iot.jpg" alt="" class="w-550px">
                                        </div>
                                        <div class="menu-img-div hidden dropdown absolute top-0 left-full mr-8 h-fit w-max">
                                            <div class="h-full border-l-1px ml-8 pl-3 ">
                                                <div class="mb-5">
                                                    <span class="opacity-50">INTERNET OF THINGS (IoT)</span>
                                                </div>
                                                <div class="mb-5 iot-dropdown-cont">
                                                    <a href="#hj" class="hover:text-primary">Industrial IoT</a>
                                                    <div class="menu-img-div hidden iot-dropdown absolute top-0 right-full mr-257px h-fit w-max">
                                                        <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                            <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                            <div class="w-4/5 mx-auto text-white">
                                                                Collect, aggregate, and integrate IoT data to build Machine Learning-driven, end-to-end IoT systems
                                                            </div>
                                                        </div>
                                                        <img src="../assets/images/menu/tech/industrialIot.jpg" alt="" class="w-550px">
                                                    </div>
                                                </div>
                                                <div class="mb-5 iot-dropdown-cont">
                                                    <a href="#hj" class="hover:text-primary">Embedded Software</a>
                                                    <div class="menu-img-div hidden iot-dropdown absolute top-0 right-full  mr-257px h-fit w-max ">
                                                        <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                            <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                            <div class="w-4/5 mx-auto text-white">
                                                                Build secure software and hardware for your operations with our industry-specific embedded software solutions
                                                            </div>
                                                        </div>
                                                        <img src="../assets/images/menu/tech/embedded.jpg" alt="" class="w-550px">
                                                    </div>
                                                </div>
                                                <div class="mb-5 iot-dropdown-cont">
                                                    <a href="#hj" class="hover:text-primary">Android Firmware</a>
                                                    <div class="menu-img-div hidden iot-dropdown absolute top-0 right-full  mr-257px h-fit w-max ">
                                                        <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                            <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                            <div class="w-4/5 mx-auto text-white">
                                                                Our team will help you leverage the vast possibilities of embedded Android OS on custom devices
                                                            </div>
                                                        </div>
                                                        <img src="../assets/images/menu/tech/android.jpg" alt="" class="w-550px">
                                                    </div>
                                                </div>
                                                <div class="mb-5 iot-dropdown-cont">
                                                    <a href="#hj" class="hover:text-primary">Hardware Design</a>
                                                    <div class="menu-img-div hidden iot-dropdown absolute top-0 right-full  mr-257px h-fit w-max ">
                                                        <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                            <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                            <div class="w-4/5 mx-auto text-white">
                                                                Use our unique expertise in building embedded systems with sensors, microcontrollers, and wired and wireless communication
                                                            </div>
                                                        </div>
                                                        <img src="../assets/images/menu/tech/hardware.jpg" alt="" class="w-550px">
                                                    </div>
                                                </div>

                                            </div>






                                        </div>

                                    </div>
                                    <div class="mb-5 dropdown-cont">
                                        <a href="#hj" class="hover:text-primary">Blockchain (DLT)</a>
                                        <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                            <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                <div class="w-4/5 mx-auto text-white">
                                                    Blockchain development and consultancy for enterprise, SMBs, and funded startups
                                                </div>
                                            </div>
                                            <img src="../assets/images/menu/tech/blockchain.jpg" alt="" class="w-550px">
                                        </div>

                                    </div>
                                    <div class="mb-5 dropdown-cont">
                                        <a href="#hj" class="hover:text-primary">Customer Experience (UX / UI)</a>
                                        <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                            <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                <div class="w-4/5 mx-auto text-white">
                                                    Create an engaging product on time with a team that designs software products for more than a decade
                                                </div>
                                            </div>
                                            <img src="../assets/images/menu/tech/customer.jpg" alt="" class="w-550px">
                                        </div>

                                    </div>
                                </div>
                                <div class="border-l-1px h-fit relative pl-3 w-225px invisible"></div>


                            </div>
                        </div>

                    </div>
                </li>
                <li class="menu-item industries h-full inline-flex items-center">
                    <button class="w-32 focus:outline-none mr-2 uppercase font-bold hover:text-primary">industries</button>
                    <div class="menu-dropdown shadow-lg hidden absolute w-full right-0 top-full bg-white p-10 h-450px">
                        <div class="mx-auto w-max flex justify-cente">
                            <div class="w-550px h-10 bg-secondary relative block invisible"></div>
                            <div class=" flex h-full items-center ml-8 hidden">
                                <div class=" h-fit relative flex">
                                    <div class="border-l-1px pl-3 w-225px">
                                        <div class="mb-5 ">
                                            <span class="opacity-50 uppercase">Industries</span>
                                            <div class="menu-img-div absolute right-full top-0 mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        With our five dedicated labs, Intellectsoft helps businesses accelerate
                                                        adoption of new technologies and orchestrate ongoing innovation
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/industries/work.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                        <div class="mb-5 dropdown-cont">
                                            <a href="#hj" class="hover:text-primary">Construction</a>
                                            <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        Construction software development
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/industries/constuction.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                        <div class="mb-5 dropdown-cont">
                                            <a href="#hj" class="hover:text-primary">Healthcare</a>
                                            <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        Software for patient, workflow, and asset management, and other solutions
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/industries/health.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                        <div class="mb-5 dropdown-cont">
                                            <a href="#hj" class="hover:text-primary">Dental</a>
                                            <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        Software for dental clinics
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/industries/dental.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                        <div class="mb-5 dropdown-cont">
                                            <a href="#hj" class="hover:text-primary">Insurance</a>
                                            <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        Digital transformation of insurance services with custom software development, Artificial Intelligence, and cloud

                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/industries/insurance.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                        <div class="mb-5 dropdown-cont">
                                            <a href="#hj" class="hover:text-primary">FinTech</a>
                                            <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        Custom software solutions for banks, insurance companies, and financial institutions
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/industries/fintech.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>

                                        <div class="mb-5 dropdown-cont">
                                            <a href="#hj" class="hover:text-primary">Logistics & Automotive</a>
                                            <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        Supply chain management, Big Data solutions, IoT, smart warehousing, and more

                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/industries/logistics.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                    </div>
                                    <div class="border-l-1px pl-3 w-225px h-fit">
                                        <div class="mb-5 dropdown-cont">
                                            <a href="#hj" class="hover:text-primary">Travel & Hospitality</a>
                                            <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        Smart room systems, unified hotel experience, next-generation entertainment, security solutions, and more
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/industries/travel.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                        <div class="mb-5 dropdown-cont">
                                            <a href="#hj" class="hover:text-primary">Retail & E-Commerce</a>
                                            <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        Transform the shopping experience through gamification, big data, and AR / VR solutions
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/industries/retail.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>

                    </div>
                </li>
                <li class="menu-item clients h-full inline-flex items-center">
                    <button class="w-32 focus:outline-none mr-2 uppercase font-bold hover:text-primary">clients</button>
                    <div class="menu-dropdown shadow-lg hidden absolute w-full right-0 top-full bg-white p-10 h-350px">
                        <div class="mx-auto w-max flex justify-cente">
                            <div class="w-550px h-10 bg-secondary relative block invisible"></div>
                            <div class=" flex h-full items-center ml-8 hidden">
                                <div class=" h-fit relative flex">
                                    <div class="border-l-1px pl-3 w-450px">
                                        <div class="mb-5 ">
                                            <span class="opacity-50 uppercase">clients</span>
                                            <div class="menu-img-div absolute right-full top-0 mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        Trusted by world's leading brands and Fortune 500 companiesn
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/clients/clients.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                        <div class="mb-5 dropdown-cont">
                                            <a href="#hj" class="hover:text-primary">Our Clients</a>
                                            <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        Trusted by world's leading brands and Fortune 500 companies
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/clients/clients.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                        <div class="mb-5 dropdown-cont">
                                            <a href="#hj" class="hover:text-primary">Case Studies</a>
                                            <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        Explore our industry-spanning solutions for Fortune 500 clients and top brands
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/clients/study.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>
                </li>
                <li class="menu-item company h-full inline-flex items-center">
                    <button class="w-32 focus:outline-none mr-2 uppercase font-bold hover:text-primary">company</button>
                    <div class="menu-dropdown shadow-lg hidden absolute w-full right-0 top-full bg-white p-10 h-450px">
                        <div class="mx-auto w-max flex justify-cente">
                            <div class="w-550px h-10 bg-secondary relative block invisible"></div>
                            <div class=" flex h-full items-center ml-8 hidden">
                                <div class=" h-fit relative flex">
                                    <div class="border-l-1px pl-3 w-225px">
                                        <div class="mb-5 ">
                                            <span class="opacity-50 uppercase">Company</span>
                                            <div class="menu-img-div absolute right-full top-0 mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        We help enterprises reimagine their business and achieve Digital Transformation more efficiently
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/company/company.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                        <div class="mb-5 dropdown-cont">
                                            <a href="#hj" class="hover:text-primary">About</a>
                                            <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        We help enterprises reimagine their business and achieve Digital Transformation more efficiently
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/company/company.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                        <div class="mb-5 dropdown-cont">
                                            <a href="#hj" class="hover:text-primary">Team</a>
                                            <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        Meet the leadership and talents propelling Intellectsoft’s progress
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/company/team.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                        <div class="mb-5 dropdown-cont">
                                            <a href="#hj" class="hover:text-primary">Careers</a>
                                            <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        Explore our current career opportunities
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/company/careers.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                        <div class="mb-5 dropdown-cont">
                                            <a href="#hj" class="hover:text-primary">Contacts</a>
                                            <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        Get in touch with us around the world
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/company/contact.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>

                                    </div>
                                    <div class="border-l-1px pl-3 w-225px h-fit">
                                        <div class="mb-5 ">
                                            <span class="opacity-50 uppercase">resources</span>
                                        </div>
                                        <div class="mb-5 dropdown-cont">
                                            <a href="#hj" class="hover:text-primary">Blogs</a>
                                            <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        Get the latest industry insights into software engineering and emerging tech
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/company/blog.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                        <div class="mb-5 dropdown-cont">
                                            <a href="#hj" class="hover:text-primary">News</a>
                                            <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        Check out the company's latest activities and updates
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/company/new.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                        <div class="mb-5 dropdown-cont">
                                            <a href="#hj" class="hover:text-primary">Insights</a>
                                            <div class="menu-img-div hidden dropdown absolute top-0 right-full mr-8 h-fit w-max ">
                                                <div class="absolute top-0 right-0 w-full h-full flex items-center justify center">
                                                    <div class=" absolute top-0 right-0 img-div-crop"></div>
                                                    <div class="w-4/5 mx-auto text-white">
                                                        Gain access to videos, ebooks, and other content by our top technology experts
                                                    </div>
                                                </div>
                                                <img src="../assets/images/menu/company/insights.jpg" alt="" class="w-550px">
                                            </div>

                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>

                    </div>
                </li>

                <button class="h-10 w-32 bg-primary uppercase self-center text-white font-bold">Get in touch</button>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Nav",
        mounted() {
            let nav = document.getElementById('nav')
            window.onscroll= function(){
                if (scrollY>150){
                    nav.classList.replace('absolute','fixed')
                    nav.classList.add('animate__animated','animate__slideInDown','bg-white')
                    nav.classList.remove('text-white')
                }
                else{
                    nav.classList.replace('fixed','absolute')
                    nav.classList.remove('animate__animated','animate__slideInDown','bg-white')
                    nav.classList.add('text-white')
                }
            }
        }
    }
</script>

<style scoped>
    .logo-div{background: url(../assets/images/logo-white.svg) no-repeat center/cover}
    nav:hover .logo-div,.nav.fixed .logo-div{background: url(../assets/images/logo-blue.svg) no-repeat center/cover}

    .dropdown-cont:hover .dropdown{display: block}
    .dropdown-cont:hover .dropdown.flex{display: flex}
    .iot-dropdown-cont:hover .iot-dropdown{display: block}
    .iot-dropdown-cont:hover .iot-dropdown.flex{display: flex}
    .img-div-crop{
        width: 0;
        height: 0;
        border-left: 20px solid transparent;
        border-right: 20px solid white;
        border-top: 20px solid white;
        border-bottom:20px solid transparent
    }
    .menu-img-div{vertical-align: center}
    .mob-dev-cont:hover .mob-dev-list{display: block}
    .menu-item:hover .menu-dropdown{display: flex}
    .nav-hovered{background: red}

    .list-none{list-style: none;}
    .nav-hovered{
        background: red;
    }

</style>