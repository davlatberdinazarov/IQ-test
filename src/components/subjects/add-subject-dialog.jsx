import React, { useContext, useEffect, useState } from "react";
import { sweetAlert } from "../../utils/sweetalert";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { $api } from "../../utils/api";
import { MainLayoutContext } from "../../layouts/MainLayout";

export function AddSubjectTable() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [educations, setEducations] = useState([]);
    const [eduId, setEduId] = useState('');
    const { setSubRender } = useContext(MainLayoutContext);
    const [file, setFile] = useState(null);

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        const getAllEducations = async () => {
            try {
                const response = await $api.get('/education/getAll');
                console.log(response.data);
                setEducations(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getAllEducations();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await $api.post(`subject/create/${eduId}?name=${name}`, formData);
            console.log(response);
            if (response.status === 200) {
                setOpen(false);
                sweetAlert("Ma'lumot muvaffaqiyatli saqlandi", 'success');
                setSubRender(prev => prev + 1); // Rerender qilish uchun
            }
        } catch (error) {
            setOpen(false);
            sweetAlert("Ma'lumot qo'shishda xato", 'error');
            console.log(error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    console.log(eduId); // Hozirgi tanlangan education ID sini tekshirish uchun

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
                <DialogHeader>Fan qo'shish</DialogHeader>
                <DialogBody>
                    <div className="flex flex-col gap-5">
                        <Input
                            label="Fan nomi"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Select
                            label="Ta'lim muassasasini tanlang"
                            onChange={(value) => setEduId(value)}
                        >
                            {educations.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>

                        <div>
                            <div className="my-2">
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer max-w-[150px] flex items-center justify-center px-2 py-1 bg-gray-100 mt-4 hover:bg-gray-300 rounded-md shadow-md text-gray-700"
                                >
                                    {" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    <span>Rasm tanlang</span>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className=" sr-only"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>
                        </div>
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
