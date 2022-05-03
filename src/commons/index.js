import Swal from "sweetalert2";

function Validate(id){
    let inp = document.getElementById(id)
    let val = inp.value
    if(id=='firstName'){
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
    else if(id=='phones'){
        if(val=='' || val.length<10){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id=='password1'){
        let specialChar,uppercase,number,lowercase,specials
        specials = [ "+", "-", "&&", "||", "!", "(", ")", "{", "}", "[", "]", "^",
            "~", "*", "?", ":","\"","\\",'.',',']
        specialChar=uppercase=number=lowercase=false
        for (let i = 0; i < val.length; i++) {
            if (specials.includes(val[i])){
                specialChar = true
            }
            else if (!isNaN(val[i])){
                number = true
            }
            else if (val[i]==val[i].toUpperCase()){
                uppercase=true
            }
            else if (val[i]==val[i].toLowerCase()){
                lowercase=true
           }
        }
        if(lowercase==false || uppercase==false || specialChar==false || number==false || val.length<8){
            inp.classList.add('input-invalid')
            inp.classList.remove('input-valid')
            return
        }
    }
    else if(id=='password2'){
        if(document.getElementById('password1').value!==val){
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
    }
async function Alert() {
    let c = await Swal.fire({
        title: 'Confirm delete',
        text: 'Do you want to continue',
        // icon: 'error',
        confirmButtonText: 'Delete',
        showCancelButton:true,
        cancelButtonText:'cancel'
    })
    if (c.isConfirmed){
        return true
    }
    if (c.isDenied){
        return false
    }

}

async function Report(){
    const Toast = Swal.mixin({
        toast: true,
        timer:3000,
        position: 'top',
        showConfirmButton: false,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Success'
    })
}

export {
    Validate,Alert,Report
}