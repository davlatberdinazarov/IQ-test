import React, { useContext, useState } from "react";
import { sweetAlert } from "../../utils/sweetalert";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    IconButton,
    Textarea,
} from "@material-tailwind/react";
import { $api } from "../../utils/api";
import { MainLayoutContext } from "../../layouts/MainLayout";
import { FaPencilAlt } from "react-icons/fa";

export function EditCollectionDialog({ data }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const { setColRender } = useContext(MainLayoutContext);

    const handleOpen = () => setOpen(!open);

    const handleEdit = async (e) => {
        e.preventDefault();

        const collectionOptions = {
            title,
            description,
        }

        try {
            const response = await $api.put(`/collection/update/${data.id}`, collectionOptions);
            console.log(response);
            if (response.status === 200) {
                setOpen(false);
                sweetAlert("Updated successfully", 'success');
                setColRender(prev => prev + 1);
            }
        } catch (error) {
            setOpen(false);
            sweetAlert("Error updating data", 'error');
            console.log(error);
        }
    };

    return (
        <>
            <IconButton onClick={handleOpen} variant="text">
                <FaPencilAlt className="h-4 w-4" />
            </IconButton>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Muassasa nomini o'zgartirish</DialogHeader>
                <DialogBody>
                    <div className="flex flex-col gap-5">
                        <Input
                            label="Fan nomi"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Textarea
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Bekor qilish</span>
                    </Button>
                    <Button variant="gradient" type="submit" color="green" onClick={handleEdit}>
                        <span>Tasdiqlash</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}