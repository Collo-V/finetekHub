<template>
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
<!--    <gb-flag code="fr" size="small"/>-->
  </fieldset>

</template>

<script>

export default {
  name: "Phone",
  components:{

  }
}
</script>
<style scoped>
.form-label{transform: translateY(-50%)}
.form-input:focus + .form-label,.input-valid + .form-label,
.input-invalid + .form-label{top: 0;color: #1476f2;font-size: smaller}
.next-circle{background: #1865c7;}
.input-invalid~.validity-checker .invalid{display: initial;}
.input-valid~.validity-checker .valid{display: initial;}

</style>