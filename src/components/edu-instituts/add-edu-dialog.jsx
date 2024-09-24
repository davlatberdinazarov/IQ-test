import React, { useContext, useState } from "react";
import { sweetAlert } from "../../utils/sweetalert";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { $api } from "../../utils/api";
import { MainLayoutContext } from "../../layouts/MainLayout";
 
export function AddEduTable() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const { setEduRender } = useContext(MainLayoutContext)

  const handleOpen = () => setOpen(!open);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
        const response = await $api.post(`/education/create?name=${name}`);
        console.log(response);
        if (response.status === 200) {
            setOpen(false);
            sweetAlert("Saved successfully", 'success');
            setEduRender(prev => prev + 1);
        } 
    } catch (error) {
        setOpen(false);
        sweetAlert("Error adding data", 'error');
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
        <DialogHeader>Ta'lim muassasi qo'shish</DialogHeader>
        <DialogBody>
         <Input label="education" type="text" onChange={({ target }) => setName(target.value)}/>
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
          <Button variant="gradient" type="submit" color="green" onClick={handleAdd}>
            <span>Tasdiqlash</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}