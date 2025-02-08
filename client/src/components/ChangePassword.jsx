import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";
import ModalWrapper from "./ModalWrapper.jsx";
import {Dialog} from "@headlessui/react";
import Textbox from "./Textbox.jsx";
import Loading from "./Loader.jsx";
import Button from "./Button.jsx";


const ChangePassword = ({ open, setOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

    const handleOnSubmit = async (data) => {
        if (data.password !== data.cpass) {
            toast.warning("Passwords doesn't match");
            return;
        }

        try {
            const res = await changeUserPassword(data).unwrap();
            toast.success("New User added successfully");
            setOpen(false);
        } catch (error) {
            toast.error(errors?.data?.message || error.error);
        }
    }

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)} className="">
                    <Dialog.Title
                        as="h2"
                        className="text-base font-bold leading-6 text-gray-900 mb-4"
                    >
                        Change Password
                    </Dialog.Title>
                    <div className="mt-2 flex flex-col gap-6">
                        <Textbox
                            placeholder="New Password"
                            type="password"
                            name="password"
                            label='New Password'
                            className='w-full rounded'
                            register={register('password', {
                                required: 'New Password is required!'
                            })}
                            error={errors.password ? errors.password.message : ''}
                        />
                        <Textbox
                            placeholder="New Password"
                            type="password"
                            name="cpass"
                            label="Confirm New Password"
                            className="w-full rounded"
                            register={register("cpass", {
                                required: "Confirm New Password is required!"
                            })}
                            error={errors.cpass ? errors.cpass.message : ""}
                        />
                        {isLoading ? (
                            <div className="py-5">
                                <Loading />
                            </div>
                        ) : (
                            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
                                <Button
                                    type="submit"
                                    className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700"
                                    label="Save"
                                />
                                <Button
                                    type="button"
                                    className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                                >
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>
                </form>
            </ModalWrapper>
        </>
    )
}

export default ChangePassword;