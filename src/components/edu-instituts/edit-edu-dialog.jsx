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
} from "@material-tailwind/react";
import { $api } from "../../utils/api";
import { MainLayoutContext } from "../../layouts/MainLayout";
import { FaPencilAlt } from "react-icons/fa";

export function EditEduTable({ data }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(data.name);
  const { setEduRender } = useContext(MainLayoutContext)

  const handleOpen = () => setOpen(!open);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await $api.put(`/education/update/${data.id}?name=${name}`);
      console.log(response);
      if (response.status === 200) {
        setOpen(false);
        sweetAlert("Updated successfully", 'success');
        setEduRender(prev => prev + 1);
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
          <Input label="education" value={name} type="text" onChange={({ target }) => setName(target.value)} />
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