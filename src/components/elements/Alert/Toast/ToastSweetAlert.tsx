import Swal, { SweetAlertIcon } from "sweetalert2"

type ToastProps = {
    iconToast: SweetAlertIcon,
    titleToast: string,
    onConfirm?: () => void
}
const ToastSweetAlert = ({ iconToast, titleToast, onConfirm }: ToastProps) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer)
            toast.addEventListener("mouseleave", Swal.resumeTimer)
        },
    });

    Toast.fire({
        icon: iconToast,
        title: titleToast,
    })

    if (onConfirm) onConfirm();


}

export default ToastSweetAlert