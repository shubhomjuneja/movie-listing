import Image from "next/image";
import LogoutIcon from "@/assets/logout.svg";
import React from "react";
import { signOut } from "next-auth/react";

function Logout() {
  return (
    <button
      onClick={() => signOut()}
      className="mobileMax:hidden text-white text-[16px] mr-[12px] font-[700] flex justify-center items-center cursor-pointer"
    >
      Logout
      <Image src={LogoutIcon} alt="LogoutIcon" className="ml-2" />
    </button>
  );
}

export default Logout;
