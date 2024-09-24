import React, { useContext, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { sweetAlert } from '../utils/sweetalert';
import { $api } from '../utils/api';
import { AppLayoutContext } from '../layouts/AppLayout';

export default function Profile() {
    const UserInfo = useContext(AppLayoutContext)
    const [avatar, setAvatar] = useState();
    const [preview, setPreview] = useState();
    console.log(preview)

    // Handle avatar upload
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setAvatar(file);

        // Show preview of selected image
        if (file) {
            const filePreview = URL.createObjectURL(file);
            setPreview(filePreview);
        }
    };

    // Handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!avatar) {
            sweetAlert('Please choose an image!', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('file', avatar);

        try {
            const response = await $api.put('/user/updateAvatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            sweetAlert('Avatar updated successfully!', 'success');
        } catch (error) {
            sweetAlert('Failed to update avatar.', 'error');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 py-6">
            <h1 className="text-3xl font-bold text-gray-700 mb-6">Update Your Avatar</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
                <div className="flex justify-center mb-6">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Avatar Preview"
                            className="rounded-full w-32 h-32 object-cover border-2 border-gray-200"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full text-gray-500">
                            No Avatar
                        </div>
                    )}
                </div>

                <div className="my-4">
                    <label
                        htmlFor="avatar"
                        className="cursor-pointer max-w-[150px] mx-auto flex items-center justify-center px-2 py-1 bg-gray-800 mt-4 hover:bg-gray-900 rounded-md shadow-md text-gray-100"
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
                            id="avatar"
                            accept="image/*"
                            type="file"
                            className=" sr-only"
                            onChange={handleAvatarChange}
                        />
                    </label>
                </div>

                <Button type="submit" color="green" size="lg" fullWidth ripple={true}>
                    Upload Avatar
                </Button>
            </form>
        </div>
    );
}
