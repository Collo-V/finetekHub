<template>
    <div class="btn-cont">
        <button class="classes proj-btn" onclick="ProjectCategory('all')" id="all-btn">
            all
        </button>
        <button class="classes proj-btn" onclick="ProjectCategory('branding')" id="branding-btn">
            branding
        </button>
        <button class="classes  proj-btn" onclick="ProjectCategory('photo')" id="photo-btn">
            photo
        </button>
        <button class="classes proj-btn" onclick="ProjectCategory('logo')" id="logo-btn">
            logo
        </button>

    </div>
    <div class="projects-cont">
        <div id="all-div proj-div" class="proj-div">
<!--            Images-->
        </div>
        <div id="branding-div"  class="proj-div">
<!--            Images-->
        </div>
        <div id="photo-div"  class="proj-div">
<!--            Images-->
        </div>
        <div id="logo-div" class="proj-div">
<!--            Images-->
        </div>
    </div>
</template>

<script>
    function ProjectCategory(id){
        let a = document.getElementsByClassName('proj-div')
        let b = document.getElementsByClassName('proj-btn')
        for (let i = 0; i < a.length; i++) {
            a[i].classList.add('hidden')
        }
        for (let i = 0; i < b.length; i++) {
            b[i].classList.remove('active')
        }
        document.getElementById(id+"-div").classList.remove('hidden')
        document.getElementById(id+"-btn").classList.add('active')
    }
</script>

<style scoped>

</style>