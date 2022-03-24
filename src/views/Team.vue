<template>
 <div class="w-full mb-8">
   <div class="team-header h-400px w-full block flex justify-center items-center text-white">
     <div class="flex flex-col justify-center text-center max-w-600px">
       <h1 class="uppercase mb-5 text-10">leadership</h1>
       <div class="">
         Intellectsoft Executive Leadership and Senior Management bring decades of
         industry experience, a global perspective and a passion for achieving results.
       </div>
     </div>
   </div>
   <div class="mt-24 flex flex-col justify-center items-center">
     <div class="exec mb-10 text-center">
       <h1 class="uppercase text-8">executive board</h1>
     </div>
     <div class="flex justify-between w-1/3 max-w-1000px">
       <div class=" flex flex-col justify-center items-center overflow-center">
         <img src="../assets/images/team/member1.jpg" class="rounded-full block mb-5">
         <div class="member-details w-150px flex flex-col justify-center text-center">
           <h2 class="mb-5">Mikel Arteta</h2>
           <p>Co-founder and CEO</p>
         </div>
       </div>
       <div class=" flex flex-col justify-center items-center overflow-center">
         <img src="../assets/images/team/member2.jpg" class="rounded-full block mb-5">
         <div class="member-details w-150px flex flex-col justify-center text-center">
           <h2 class="mb-5">Smith Rowe</h2>
           <p>Co-founder and board member</p>
         </div>
       </div>

     </div>
   </div>
   <div class="mt-24 flex flex-col justify-center items-center">
     <div class="exec mb-10 text-center">
       <h1 class="uppercase text-8">Team members</h1>
     </div>
     <div class="flex justify-between w-1/3 max-w-1000px">
       <div class=" flex flex-col justify-center items-center overflow-center">
         <img src="../assets/images/team/member3.jpg" class="rounded-full block mb-5">
         <div class="member-details w-150px flex flex-col justify-center text-center">
           <h2 class="mb-5">Martin Odegaard</h2>
           <p>Graphics Designer</p>
         </div>
       </div>
       <div class=" flex flex-col justify-center items-center overflow-center">
         <img src="../assets/images/team/member4.jpg" class="rounded-full block mb-5">
         <div class="member-details w-150px flex flex-col justify-center text-center">
           <h2 class="mb-5">Thomas Partey</h2>
           <p>Software Engineer</p>
         </div>
       </div>

     </div>
   </div>


 </div>
</template>

<script>
export default {
  name: "Team"
}
</script>

<style scoped>
.team-header{background: linear-gradient(to right, #1f1d1da9,#1f1d1da9), url(~@/assets/images/team/team-header.jpg) no-repeat center/cover;}

</style>

