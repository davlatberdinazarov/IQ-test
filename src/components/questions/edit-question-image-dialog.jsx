import React, { useContext, useState } from "react";
import { sweetAlert } from "../../utils/sweetalert";
import {
    Button,
    Dialog,
    Input,
    Tabs,
    TabsHeader,
    Tab,
    TabsBody,
    TabPanel,
    IconButton,
} from "@material-tailwind/react";
import { $api } from "../../utils/api";
import { MainLayoutContext } from "../../layouts/MainLayout";
import { FaPlus, FaMinus, FaPencilAlt } from "react-icons/fa";

export function EditQuestionImageDialog({ data }) {
    console.log(data);
    const [open, setOpen] = useState(false);
    const [questionValue, setQuestionValue] = useState(data.questionValue); // Savol texti
    const [correctAnswer, setCorrectAnswer] = useState(data.correctAnswer); // To'g'ri javob
    const { setColRender } = useContext(MainLayoutContext);
    const [file, setFile] = useState(null);

    const tabData = [
        {
            label: "Image",
            value: "image"
        }
    ];

    const handleOpen = () => setOpen(!open);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAddImage = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        // formData.append('questionValue', questionValue);
        // formData.append('correctAnswer', correctAnswer);
        formData.append('file', file);

        try {
            const response = await $api.put(`/question/update/${data.id}?correctAnswer=${correctAnswer}&questionType=IMAGE&questionValue=${questionValue}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                setOpen(false);
                sweetAlert("Ma'lumot muvaffaqiyatli saqlandi", 'success');
                setColRender(prev => prev + 1);

                // clear fields
                // setQuestionValue('');
                // setCorrectAnswer('');
                // setFile(null);
            }
        } catch (error) {
            setOpen(false);
            sweetAlert("Ma'lumot qo'shishda xato", 'error');
            console.error(error);
        }
    };

    return (
        <>
            <IconButton onClick={handleOpen} variant="text">
                <FaPencilAlt className="h-4 w-4 text-red-500" />
            </IconButton>
            <Dialog
                size="sm"
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <div className="bg-white p-4 rounded-lg max-h-[700px] overflow-y-auto">
                    <Tabs value='image'>
                        <TabsHeader className="gap-4 min-w-48">
                            {tabData.map(({ label, value }) => (
                                <Tab className="text-left" key={value} value={value}>
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody>
                            <TabPanel value='image'>
                                <form className="flex flex-col gap-3" onSubmit={handleAddImage}>
                                    <h2 className="font-bold text-center text-red-600">Rasmli savol qo'shish</h2>
                                    <Input
                                        label="Savol"
                                        type="text"
                                        placeholder="Savolni kiriting"
                                        value={questionValue}
                                        onChange={(e) => setQuestionValue(e.target.value)}
                                    />
                                    <div>
                                        <div
                                            className="flex items-center rounded-sm my-2 w-64 h-32 gap-3"
                                        >
                                            <img
                                                className="w-full h-full object-cover rounded shadow-md"
                                                src={`http://158.220.111.34:8086/api/v1/user/getFiles/${data.imgUrl}`}
                                                alt={data.name}
                                            />
                                        </div>
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
                                                    value={file}
                                                    className=" sr-only"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <Input
                                        label="To'g'ri javob"
                                        type="text"
                                        placeholder="To'g'ri javobni kiriting"
                                        value={correctAnswer}
                                        onChange={(e) => setCorrectAnswer(e.target.value)}
                                    />
                                    <Button type="submit" className="bg-blue-500 mt-4">
                                        Saqlash
                                    </Button>
                                </form>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </div>
            </Dialog>
        </>
    );
}
