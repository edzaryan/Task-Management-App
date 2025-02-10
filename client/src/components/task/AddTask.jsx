import React, { useEffect, useState } from "react";
import ModalWrapper from "../ModalWrapper.jsx";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox.jsx";
import { useForm } from "react-hook-form";
import UserList from "../UserList.jsx";
import SelectList from "../SelectList.jsx";
import { BiImages } from "react-icons/bi";
import Button from "../Button";
import { useCreateTaskMutation, useUpdateTaskMutation } from "../../redux/slices/api/taskApiSlice.js";
import { toast } from "sonner";
import { dateFormatter } from "../../utils/index.js";


const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const AddTask = ({ open, setOpen, task }) => {

    console.log(task);

    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            title: task?.title || "",
            date: dateFormatter(task?.date || new Date())
        }
    });

    const [team, setTeam] = useState(task?.team || []);
    const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
    const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORITY[2]);
    const [assets, setAssets] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [createTask, { isLoading }] = useCreateTaskMutation();
    const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

    const handleSelect = (e) => {
        setAssets([...e.target.files]);
    };

    const submitHandler = async (data) => {
        try {
            const newData = { ...data, assets, team, stage, priority };

            const res = task?._id
                ? await updateTask({ ...newData, _id: task._id }).unwrap()
                : await createTask(newData).unwrap();

            toast.success(res.message);
            setOpen(false);
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    };

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <Dialog.Title className="font-bold text-gray mb-4 text-xl">
                        {task ? "UPDATE TASK" : "ADD TASK"}
                    </Dialog.Title>

                    <div className="flex flex-col gap-4">
                        <Textbox
                            placeholder="Title"
                            name="title"
                            label="Task Title"
                            className="w-full rounded"
                            register={register}
                            error={errors.title?.message}
                        />

                        <UserList setTeam={setTeam} team={team} />

                        <div className="flex gap-4">
                            <SelectList
                                label="Task Stage"
                                lists={LISTS}
                                selected={stage}
                                setSelected={setStage}
                            />

                            <Textbox
                                placeholder="Date"
                                type="date"
                                name="date"
                                label="Task Date"
                                className="w-full rounded"
                                register={register}
                                error={errors.date?.message}
                            />
                        </div>

                        <SelectList
                            label="Priority Level"
                            lists={PRIORITY}
                            selected={priority}
                            setSelected={setPriority}
                        />

                        <label className="flex justify-center items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4">
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleSelect}
                                accept=".jpg,.png,.jpeg"
                                multiple
                            />
                            <BiImages />
                            <span>Add Assets</span>
                        </label>

                        <div className="py-6 sm:flex sm:flex-row-reverse gap-4">
                            {uploading ? (
                                <span className="text-sm py-2 text-red-500">Uploading assets...</span>
                            ) : (
                                <Button
                                    label={task ? "Update" : "Create"}
                                    type="submit"
                                    className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 rounded sm:w-auto"
                                />
                            )}

                            <Button
                                type="button"
                                className="bg-gray-100 hover:bg-gray-200 px-5 text-sm font-semibold text-gray-900 sm:w-auto rounded"
                                onClick={() => setOpen(false)}
                                label="Cancel"
                            />
                        </div>
                    </div>
                </form>
            </ModalWrapper>
        </>
    );
};

export default AddTask;
