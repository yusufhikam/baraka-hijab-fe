import { useMutation } from "@tanstack/react-query"
import updateProfileUser from "../api/Users/updateProfileUser"
import { UserProfileType } from "../../types/UserProfileType"
import ToastSweetAlert from "../../components/elements/Alert/Toast/ToastSweetAlert";

const useUpdateProfileUser = () => {

    const { mutate, isPending } = useMutation({
        mutationFn: ({ userId, data }: { userId: number | null, data: UserProfileType }) => updateProfileUser({ userId, data }),
        onSuccess: () => {
            ToastSweetAlert({
                iconToast: 'success',
                titleToast: 'Profile Successfully Updated',
            })
        }
    })

    return { mutate, isPending }
}


export default useUpdateProfileUser;