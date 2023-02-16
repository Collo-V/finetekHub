import Swal from "sweetalert2";

export async function confirmAction({title,text,btnText}) {
    let c = await Swal.fire({
        title,
        text,
        // icon: 'error',
        confirmButtonText: btnText,
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

export async function Report({icon,title}){
    const Toast = Swal.mixin({
        toast: true,
        timer:3000,
        position: 'top',
        showConfirmButton: false,
        showClass: {
            popup: 'animate__animated animate__fadeInUP'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown'
        }
    })

    await Toast.fire({
        icon,
        title
    })
}

