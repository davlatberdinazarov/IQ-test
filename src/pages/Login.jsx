import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { $axios } from "../utils";
import { useNavigate } from "react-router-dom";
import { sweetAlert } from "../utils/sweetalert";
import { $api } from "../utils/api";
import { AppLayoutContext } from "../layouts/AppLayout";

export default function Login() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { setRoleName, setUserName, setAvatar } = useContext(AppLayoutContext);

    const fetchProfile = async () => {
        try {
            const response = await $api.get('/user/getCurrenInformation/13');
            console.log(response); // Bu yerda response'ni to'liq ko'rsatib turibmiz
            if (response.data.roleName === 'ADMIN') {
                setUserName(response.data.name);
                setRoleName(response.data.roleName);
                setAvatar(response.data.avaName);
                sweetAlert("Welcome to admin dashboard", "success");
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            handleUnauthorizedAccess();
        }
    };


    const handleLogOut = () => {
        localStorage.removeItem("iq-token");
        navigate("/login");
    };

    const handleUnauthorizedAccess = () => {
        sweetAlert("You have no access", "error")
        handleLogOut();
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginOptions = {
            phoneNumber: phone.trim(),
            password: password.trim(),
        };

        try {
            const { data } = await $axios.post('/user/login', loginOptions);
            if (data.message === 'ok') {
                const token = data.object;
                window.localStorage.setItem('iq-token', token);

                // Update the authorization header for future requests
                $api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                fetchProfile();
            } else {
                sweetAlert("Something went wrong", "error")
            }
        } catch (error) {
            console.error('Error logging in:', error);
            sweetAlert("Something went wrong", "error")
        }
    };

    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <Card className="w-96">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Login
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input
                        label="Phone"
                        type="tel"
                        onChange={({ target }) => setPhone(target.value)}
                        size="lg"
                    />
                    <Input
                        label="Password"
                        // type="password"
                        size="lg"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <div className="-ml-2.5">
                        <Checkbox label="Remember Me" />
                    </div>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button onClick={handleSubmit} variant="gradient" fullWidth>
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
