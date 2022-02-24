<template>
    <div class="relative text-14px">
        <Nav/>
        <Slide/>
        <div class="mt-10 w-full">
            <div class="w-1/4 max-w-400px text-center mx-auto leading-10">
              We are a digital transformation consultancy and software development company that provides cutting edge engineering solutions,
              helping Fortune 500 companies and enterprise clients untangle complex issues that always emerge during their digital evolution journey.
              Since 2007 we have been a visionary and a reliable software engineering partner for world-class brands.
            </div>
        </div>
        <div class="mt-10 bg-secondary">
            <div class="w-3/4 flex mx-auto">
          <div class="flex flex-col">
            <img src="assets/images/clientLogos/universal.svg" class = "bg-white">
            <img src="assets/images/clientLogos/griffins.svg" class = "bg-white">
            <img src="assets/images/clientLogos/hoosbaa.svg" class = "bg-white">
            <img src="assets/images/clientLogos/nestle.svg" class = "bg-white">
          </div>
          <div class="flex flex-col">
            <img src="assets/images/clientLogos/nhs.svg" class = "bg-white">
            <img src="assets/images/clientLogos/land-rover.svg" class = "bg-white">
            <img src="assets/images/clientLogos/af-gruppen.svg" class = "bg-white">
            <img src="assets/images/clientLogos/clinique.svg" class = "bg-white">
          </div>
          <div class="flex flex-col">
            <img src="assets/images/clientLogos/guinness.svg" class = "bg-white">
            <img src="assets/images/clientLogos/jaguar-talk.svg" class = "bg-white">
            <img src="assets/images/clientLogos/wynn.svg" class = "bg-white">
            <img src="assets/images/clientLogos/harley-davidson.svg" class = "bg-white">
          </div>
          <div class="flex flex-col">
            <img src="assets/images/clientLogos/eurostar.svg" class = "bg-white">
            <img src="assets/images/clientLogos/walt-disney.svg" class = "bg-white">
            <img src="assets/images/clientLogos/melco.svg" class = "bg-white">
            <img src="assets/images/clientLogos/gulls.svg" class = "bg-white">
          </div>
          <div class="flex flex-col">
            <img src="assets/images/clientLogos/ey.svg" class = "bg-white">
            <img src="assets/images/clientLogos/guest-services.svg" class = "bg-white">
            <img src="assets/images/clientLogos/eurostar.svg" class = "bg-white">
            <img src="assets/images/clientLogos/audi.svg" class = "bg-white">
          </div>
        </div>
        </div>
        <div class="mt-10">
            <Clients/>
        </div>

    </div>
</template>

<script>
import Slide from './components/Slide.vue'
import Clients from './components/Clients.vue'
import Nav from "@/components/Nav";

export default {
  name: 'App',
  components: {
      Nav,
    Clients,
    Slide
  }
}
</script>

<style>
    button{color: inherit}
* {
  font-family: 'Montserrat', sans-serif;box-sizing: border-box;
}
a{color: inherit;text-decoration: none}
/**top and right**/
.top-0{top: 0px}
.top-10{top:10%}
.top-quarter{top: 25%}
.top-half{top: 50%}
.top-3\/4{bottom:100%}
.top-full{top:100%}

.btm-0{bottom: 0px}
.btm-1\/4{bottom: 25%}
.btm-1\/10{bottom: 10%}
.btm-1\/5{bottom: 20%}
.btm-half{bottom: 50%}
.btm-full{bottom:100%}
.btm-3\/4{bottom:75%}
.btm-90{bottom: 90%}
.btm-1\/10{bottom:10%}
.btm-3\/4{bottom:75%}
.btm-90{bottom: 90%}
.-btm-20px{}

.left-0{left:0px}
.left-10{left:10%}
.left-full{left:100%}


.right-0{right:0px}
.right-10{right:10%}
.right-full{right:100%}


.opacity-25{opacity: .25}
.opacity-50{opacity: .5}
.opacity-75{opacity: .75}

.whitespace-nowrap{white-space: nowrap}
.whitespace-wrap{white-space: normal}

  .leading-10{line-height: 30px}
.alice{background: linear-gradient(to right, #1f1d1da9,#1f1d1da9), url(assets/images/slide/family.jpg) no-repeat center/cover;}

</style>
