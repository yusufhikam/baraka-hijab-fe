import { useForm } from 'react-hook-form'
import { useAuth } from '../../../utililties/customHook/useAuth'
import useDarkMode from '../../../utililties/customHook/useDarkMode'
import Card from '../../elements/Card/Card'
import Input from '../../elements/FormElement/Input'
import Breadcrumb from '../../fragments/Breadcrumb/Breadcrumb'
import { UserProfileType } from '../../../types/UserProfileType'
import H1 from '../../elements/Title Header/H1'
import Button from '../../elements/Button/Button'
import useUpdateProfileUser from '../../../utililties/customHook/useUpdateProfileUser'

const ProfileLayout = () => {
    const { isDarkMode } = useDarkMode()
    const { user } = useAuth()
    const { mutate, isPending } = useUpdateProfileUser()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserProfileType>({
        defaultValues: {
            name: user?.name || '',
            phone_number: user?.phone_number,
        },
    })

    const onSubmit = (data: UserProfileType) => {
        mutate({ userId: user?.id ?? null, data })
    }

    return (
        <div className={`flex w-full flex-col gap-5`}>
            <div className="mx-auto mt-5">
                <Breadcrumb
                    links_breadcrumb={[
                        {
                            label: 'Home',
                            link: '/',
                            isActive: false,
                            isAllowed: true,
                        },
                        {
                            label: 'Profile',
                            link: '#',
                            isActive: true,
                            isAllowed: true,
                        },
                    ]}
                />
            </div>

            <hr className="block sm:hidden" />
            <Card variant={`p-6 border-none`}>
                <h1 className="mb-4 text-2xl font-bold">Profile Settings</h1>
                <p className="mb-6 text-gray-600">
                    Manage your profile settings here.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex w-full flex-col gap-5 sm:w-1/2 lg:w-1/3"
                >
                    <Input
                        id="email"
                        labelTitle="Email"
                        labelFor="email"
                        autoComplete="off"
                        value={user?.email}
                        readOnly
                        disabled
                    />

                    <Input
                        {...register('name', {
                            required: 'Name is required',
                        })}
                        id="name"
                        labelTitle="Name"
                        labelFor="name"
                        autoComplete="off"
                        errorMessage={errors.name?.message}
                        type="text"
                    />
                    <Input
                        {...register('phone_number', {
                            required: 'Phone number is required',
                        })}
                        variantClass="rounded-l-none h-10"
                        id="phone_number"
                        labelTitle="Phone Number"
                        labelFor="phone_number"
                        autoComplete="off"
                        type="number"
                        htmlElement={
                            <div className="flex h-10 items-center rounded-l-md border px-2">
                                <H1
                                    fontWeight="font-normal"
                                    fontSize="text-base"
                                >
                                    +62
                                </H1>
                            </div>
                        }
                    />

                    <Button
                        type="submit"
                        disabled={isPending}
                        variant={`${
                            isDarkMode
                                ? 'hover:bg-barakaprimary-madder text-barakaprimary-madder hover:text-white bg-white'
                                : 'bg-black text-white hover:bg-barakaprimary-madder hover:text-white'
                        }
                        ${isPending && 'cursor-wait'}
                        w-full rounded-md p-2 font-semibold transition-all duration-300`}
                    >
                        Update
                    </Button>
                </form>
            </Card>
        </div>
    )
}

export default ProfileLayout
