<template>
  <section class="contact py-8 lg:py-0 mt-16" id="contacts-section">
    <div class="h-fit lg:h-700px flex flex-col lg:flex-row  items-center justify-center">
      <div class="form px-50px py-33px bg-white w-9/10 max-w-500px shadow-lg lg:rounded-lg">
        <h2 class="text-36px">Contact me</h2>
        <form action="" class="mt-8">
          <fieldset class="h-36px w-full relative mb-3">
            <input class="form-input pl-4 w-full h-full flex items-center rounded-sm focus:outline-none border-1px"
            id="firstName" @blur="Validate($event.target.id)">
            <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
              <label class="bg-white px-1">First Name*</label>
            </div>
            <div class="validity-checker h-0 w-full absolute pr-2 top-1/2 btm-1/2 flex items-center justify-end">
              <span class="hidden valid text-green"><i class="fa-solid fa-check"></i></span>
              <span class="hidden invalid text-red"><i class="fa-solid fa-triangle-exclamation"></i></span>
            </div>
          </fieldset>
          <fieldset class="h-36px w-full relative mb-3">
            <input class="form-input pl-4 w-full h-full flex items-center rounded-sm focus:outline-none border-1px"
            id="lastName" @blur="Validate($event.target.id)">
            <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
              <label class="bg-white px-1">Last Name*</label>
            </div>
            <div class="validity-checker h-0 w-full absolute pr-2 top-1/2 btm-1/2 flex items-center justify-end">
              <span class="hidden valid text-green"><i class="fa-solid fa-check"></i></span>
              <span class="hidden invalid text-red"><i class="fa-solid fa-triangle-exclamation"></i></span>
            </div>
          </fieldset>
          <fieldset class="h-36px w-full relative mb-3">
            <input class="form-input pl-4 w-full h-full flex items-center rounded-sm focus:outline-none border-1px"
            id="email" @blur="Validate($event.target.id)">
            <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
              <label class="bg-white px-1">Email*</label>
            </div>
            <div class="validity-checker h-0 w-full absolute pr-2 top-1/2 btm-1/2 flex items-center justify-end">
              <span class="hidden valid text-green"><i class="fa-solid fa-check"></i></span>
              <span class="hidden invalid text-red"><i class="fa-solid fa-triangle-exclamation"></i></span>
            </div>
          </fieldset>
          <fieldset class="h-36px w-full relative mb-3">
            <input class="form-input pl-4 w-full h-full flex items-center rounded-sm focus:outline-none border-1px"
            id="phone" @blur="Validate($event.target.id)">
            <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
              <label class="bg-white px-1">First Name*</label>
            </div>
            <div class="validity-checker h-0 w-full absolute pr-2 top-1/2 btm-1/2 flex items-center justify-end">
              <span class="hidden valid text-green"><i class="fa-solid fa-check"></i></span>
              <span class="hidden invalid text-red"><i class="fa-solid fa-triangle-exclamation"></i></span>
            </div>
          </fieldset>
          <fieldset class="h-36px w-full relative mb-3">
            <input class="form-input pl-4 w-full h-full flex items-center rounded-sm focus:outline-none border-1px"
            id="company" @blur="Validate($event.target.id)">
            <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
              <label class="bg-white px-1">Company</label>
            </div>
            <div class="validity-checker h-0 w-full absolute pr-2 top-1/2 btm-1/2 flex items-center justify-end">
              <span class="hidden valid text-green"><i class="fa-solid fa-check"></i></span>
              <span class="hidden invalid text-red"><i class="fa-solid fa-triangle-exclamation"></i></span>
            </div>
          </fieldset>
          <fieldset class="w-full relative mb-3">
            <textarea class="form-input pl-4 w-full h-24 flex items-center rounded-sm focus:outline-none border-1px"></textarea>
            <div class="form-label h-0 w-full absolute pl-4 top-1/2 btm-1/2 flex items-center">
              <label class="bg-white px-1">How can we help you?*</label>
            </div>
            <div class="validity-checker h-0 w-full absolute pr-2 top-1/2 btm-1/2 flex items-center justify-end">
              <span class="hidden valid text-green"><i class="fa-solid fa-check"></i></span>
              <span class="hidden invalid text-red"><i class="fa-solid fa-triangle-exclamation"></i></span>
            </div>
          </fieldset>
          <div class="text-grey-dark">
            <p class="mt-3 text-grey-dark">
              By sending this form I confirm that I have read and accept Intellectsoft
              <a href="#privacy-policy" class="underline text-primary">Privacy Policy</a>
            </p>
            <div class="w-full flex items-center mt-3 h-10 justify-between">
              <fieldset class="mb-3 flex items-center">
                <input type="checkbox" class="form-input inline pl-4 h-5 w-5 flex items-center rounded-sm focus:outline-none border-1px border-grey">
                <label class="inline ml-2 px-1">Send NDA</label>

              </fieldset>
              <button type="button" class="block h-36px w-150px text-white rounded-sm bg-green uppercase">Send</button>
            </div>
          </div>

        </form>

      </div>
      <div class="bg-primary w-9/10 max-w-500px lg:w-400px rounded-sm  py-8 lg:py-124px px-10 text-white">
        <div>
          <h2 class="text-center">What happens next</h2>
          <div class="mt-3">
            <div class="flex mb-8">
              <div class="min-w-8 mr-3">
                <div class="next-circle h-8 w-8 flex items-center justify-center rounded-full">1</div>
              </div>
              <div>
                  Our sales manager reaches you out within a few days after
                   analyzing your business requirements
              </div>
            </div>
            <div class="flex mb-8">
              <div class="min-w-8 mr-3">
                <div class="next-circle h-8 w-8 flex items-center justify-center rounded-full">2</div>
              </div>
              <div>
                Meanwhile, we sign an NDA to ensure the highest privacy level
              </div>
            </div>
            <div class="flex mb-8">
              <div class="min-w-8 mr-3">
                <div class="next-circle h-8 w-8 flex items-center justify-center rounded-full">3</div>
              </div>
              <div>
                Our pre-sale manager presents project estimates and approximate timeline
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: "Contact",
  data(){},
  methods:{
    Validate(id){
      console.log(id)
      let inp = document.getElementById(id)
      let val = inp.value
      if(id=='FirstName'){
        if(val=='' || val.length<2){
          inp.classList.add('input-invalid')
          inp.classList.remove('input-valid')
          return
        }
      }  
      else if(id=='lastName'){
        if(val=='' || val.length<2){
          inp.classList.add('input-invalid')
          inp.classList.remove('input-valid')
          return
        }
      }
      else if(id=='email'){
        if(
          !val.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ){
          inp.classList.add('input-invalid')
          inp.classList.remove('input-valid')
          return
        }
      }
      else if(id=='company'){
        if(val=='' || val.length<2){
          inp.classList.add('input-invalid')
          inp.classList.remove('input-valid')
          return
        }
      }
      else if(id=='phone'){
        if(val=='' || val.length<2){
          inp.classList.add('input-invalid')
          inp.classList.remove('input-valid')
          return
        }
      }
      else{
        if(val=='' || val.length<2){
          inp.classList.add('input-invalid')
          inp.classList.remove('input-valid')
          return
        }
      }
      inp.classList.add('input-valid')
      inp.classList.remove('input-invalid')
      function ValidateEmail(mail) {
        console.log("here")
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
          {
            return (true)
          }
        return (false)
      }
    }
  }
}
</script>

<style scoped>
.contact{background: url(~@/assets/images/contact-form-background.jpg) no-repeat top}
@media (max-width: 992px) {
  .contact{background: url(~@/assets/images/contact-form-background.jpg) no-repeat center/cover}

}
.form-label{transform: translateY(-50%)}
.form-input:focus + .form-label,.input-valid + .form-label,
.input-invalid + .form-label{top: 0;color: #1476f2;font-size: smaller}
.next-circle{background: #1865c7;}
.input-invalid~.validity-checker .invalid{display: initial;}
.input-valid~.validity-checker .valid{display: initial;}
</style>