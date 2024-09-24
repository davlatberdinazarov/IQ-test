import React, { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'

export const AppLayoutContext = createContext()

export default function AppLayout() {
  const [userName, setUserName] = useState('');
  const [roleName, setRoleName] = useState('');
  const [avatar, setAvatar] = useState('');
  return (
    <AppLayoutContext.Provider value={{roleName, setRoleName, userName, setUserName, avatar, setAvatar}}>
        <Outlet/>
    </AppLayoutContext.Provider>
  )
}