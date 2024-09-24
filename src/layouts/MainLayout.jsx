import React, { createContext, useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { $api } from '../utils/api';
import { AppLayoutContext } from './AppLayout';

export const MainLayoutContext = createContext();

export default function MainLayout() {
  const [eduRender, setEduRender] = useState(0);
  const [subRender, setSubRender] = useState(0);
  const [colRender, setColRender] = useState(0);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('iq-token');

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
      else {
        navigate('/login'); // Redirect to login if not admin
        return;
      }
    } catch (error) {
      console.log(error);
      handleUnauthorizedAccess();
    }
  };


  useEffect(() => {
    if (!accessToken) {
      navigate('/login'); // Redirect to login if no token exists
      return;
    }
    fetchProfile(); // Fetch user profile when token exists and user is admin
  }, [accessToken, navigate]); // Add dependencies to re-run the effect if needed

  const handleLogOut = () => {
    localStorage.removeItem("iq-token");
    navigate("/login");
  };

  return (
    <MainLayoutContext.Provider value={{ handleLogOut, eduRender, setEduRender, subRender, setSubRender, colRender, setColRender }}>
      <div className='flex '>
        <Sidebar />
        <div className="w-full max-h-[100vh] overflow-scroll bg-gray-200 max-w-[83vw]">
          <Navbar />
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </MainLayoutContext.Provider>
  );
}
