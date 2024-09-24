import React, { useContext } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
} from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa";
import { $api } from "../../utils/api";
import { sweetAlert } from "../../utils/sweetalert";
import { MainLayoutContext } from "../../layouts/MainLayout";

export function DeleteEduTable({ id }) {
    const [open, setOpen] = React.useState(false);
    const { setEduRender } = useContext(MainLayoutContext)

    const handleOpen = () => setOpen(!open);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
          const response = await $api.delete(`/education/delete?educId=${id}`);
          console.log(response);
          if (response.status === 200) {
            setOpen(false);
            sweetAlert("Deleted successfully", 'success');
            setEduRender(prev => prev + 1);
          }
        } catch (error) {
          setOpen(false);
          sweetAlert("Error deleting data", 'error');
          console.log(error);
        }
      };
    

    return (
        <>
            <IconButton onClick={handleOpen} variant="text">
                <FaTrash className="h-4 w-4" />
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
                <DialogBody>
                   <h2 className="text-center text-xl font-bold">Rostdan ham o'chirmoqchimisiz?</h2>
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
                    <Button variant="gradient" color="green" onClick={handleDelete}>
                        <span>Tasdiqlash</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}