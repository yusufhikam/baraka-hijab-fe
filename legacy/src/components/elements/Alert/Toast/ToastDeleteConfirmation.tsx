import Swal, { SweetAlertIcon } from 'sweetalert2'

type ToastProps = {
    title: string
    text: string
    icon: SweetAlertIcon
    confirmedButtonText: string
    deleteSuccessText: string
    deleteFn: () => void
}

const ToastDeleteConfirmation = ({
    title,
    text,
    icon,
    confirmedButtonText,
    deleteSuccessText,
    deleteFn,
}: ToastProps) => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#06C5FF',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmedButtonText,
    }).then((result) => {
        if (result.isConfirmed) {
            deleteFn()
            Swal.fire({
                title: 'Deleted!',
                text: deleteSuccessText,
                icon: 'success',
            })
        }
    })
}

export default ToastDeleteConfirmation
