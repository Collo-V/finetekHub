import Swal from "sweetalert2";

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

async function Report(obj){
    const Toast = Swal.mixin({
        toast: true,
        timer:3000,
        position: obj.position,
        showConfirmButton: false,
        showClass: {
            popup: 'animate__animated animate__fadeInUP'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown'
        }
    })

    await Toast.fire({
        icon: obj.icon,
        title: obj.title
    })
}

export {
    Alert,Report
}