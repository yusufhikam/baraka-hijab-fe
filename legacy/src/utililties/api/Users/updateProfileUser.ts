import { UserProfileType } from "../../../types/UserProfileType";
import Api from "../Auth/Api";
import { URLBase } from "../urlBase";

type updateProfileUserType = {
    userId: number | null,
    data: UserProfileType
}

export default async function updateProfileUser({ userId, data }: updateProfileUserType): Promise<updateProfileUserType> {
    try {
        const res = await Api.patch(`${URLBase}/user/${userId}`, data)

        return res.data
    } catch (error) {
        console.error(error);
        throw error
    }
}