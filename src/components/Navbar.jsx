import React from 'react'
import { AvatarProfile } from './nav/AvatarProfile'
import { HiOutlineBadgeCheck } from "react-icons/hi";

export default function Navbar() {
  return (
    <section className="px-4 shadow-lg flex justify-between bg-white w-full py-2">
      <div className="flex items-center gap-2">
        <HiOutlineBadgeCheck className="text-2xl" />
        <h3 className=" font-semibold text-lg">Admin</h3>
      </div>

      <div className="flex gap-4 items-center">
        <div>
          <AvatarProfile />
        </div>
      </div>
    </section>
  )
}
