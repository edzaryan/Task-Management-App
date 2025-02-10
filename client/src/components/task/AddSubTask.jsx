import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import { useCreateSubTaskMutation } from "../../redux/slices/api/taskApiSlice.js";
import { toast } from "sonner";
import ModalWrapper from "../ModalWrapper.jsx";
import Textbox from "../Textbox.jsx";
import Button from "../Button.jsx";



const AddSubTask = ({ open, setOpen, id }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [addSbTask] = useCreateSubTaskMutation();

    const handleOnSubmit = async (data) => {
        try {
          const res = await addSbTask({ data, id }).unwrap();
          toast.success(res.message);
          setOpen(false);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
                    <Dialog.Title
                        as='h2'
                        className='text-base font-bold leading-6 text-gray-900 mb-4'
                    >
                        ADD SUB-TASK
                    </Dialog.Title>
                    <div className='mt-2 flex flex-col gap-6'>
                        <Textbox
                            placeholder='Sub-Task title'
                            type='text'
                            name='title'
                            label='Title'
                            className='w-full rounded'
                            register={register}
                            error={errors.title ? errors.title.message : ""}
                        />

                        <div className='flex items-center gap-4'>
                            <Textbox
                                placeholder='Date'
                                type='date'
                                name='date'
                                label='Task Date'
                                className='w-full rounded'
                                register={register}
                                error={errors.date ? errors.date.message : ""}
                            />
                            <Textbox
                                placeholder='Tag'
                                type='text'
                                name='tag'
                                label='Tag'
                                className='w-full rounded'
                                register={register}
                                error={errors.tag ? errors.tag.message : ""}
                            />
                        </div>
                    </div>
                    <div className='py-6 mt-4 flex sm:flex-row-reverse gap-4'>
                        <Button
                            type='submit'
                            className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 rounded'
                            label='Add Task'
                        />

                        <Button
                            type='button'
                            className='bg-gray-100 hover:bg-gray-200 text-sm px-5 font-semibold text-gray-900 rounded'
                            onClick={() => setOpen(false)}
                            label='Cancel'
                        />
                    </div>
                </form>
            </ModalWrapper>
        </>
    );
};

export default AddSubTask;