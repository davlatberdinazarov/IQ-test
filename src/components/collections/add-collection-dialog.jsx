import React, { useContext, useState } from "react";
import { sweetAlert } from "../../utils/sweetalert";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
} from "@material-tailwind/react";
import { $api } from "../../utils/api";
import { MainLayoutContext } from "../../layouts/MainLayout";
import { useParams } from "react-router-dom";

export function AddCollectionDialog() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { setColRender } = useContext(MainLayoutContext);

    const { subjectId } = useParams();
    console.log(subjectId);

    const handleOpen = () => setOpen(!open);

    const handleAdd = async (e) => {
        e.preventDefault();

        const collectionOptions = {
            title,
            description,
            subjectId
        }

        try {
            const response = await $api.post(`/collection/create`, collectionOptions);
            console.log(response);
            if (response.status === 200) {
                setOpen(false);
                sweetAlert("Ma'lumot muvaffaqiyatli saqlandi", 'success');
                setColRender(prev => prev + 1); // Rerender qilish uchun
            }
        } catch (error) {
            setOpen(false);
            sweetAlert("Ma'lumot qo'shishda xato", 'error');
            console.log(error);
        }
    };

    return (
        <>
            <Button className="bg-indigo-500" onClick={handleOpen}>
                Qo'shish
            </Button>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Collection qo'shish</DialogHeader>
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
                    <Button
                        variant="gradient"
                        type="submit"
                        color="green"
                        onClick={handleAdd}
                    >
                        <span>Tasdiqlash</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
