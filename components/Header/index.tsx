"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import AddIcon from "../../assets/add.svg";
import LogoutIcon from "../../assets/logout.svg";
import { signOut } from "next-auth/react";

type Props = {
  title?: string;
  isHidden?: boolean;
  logoutVisible?: boolean;
};

function Header({ title, isHidden, logoutVisible }: Props) {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/signin");
  };
  return (
    <div
      className={`${
        isHidden ? "hidden" : "flex"
      }  justify-between md:pr-[30px]`}
    >
      <div className="flex justify-center items-center">
        <p className="text-white md:text-[48px] font-[600] mr-[12px] text-[32px]">
          {title}
        </p>
        {logoutVisible && (
          <Link href="/create">
            <Image src={AddIcon} alt="AddIcon" />
          </Link>
        )}
      </div>
      {logoutVisible && (
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={() => {
            signOut();
            localStorage.removeItem("token");
          }}
        >
          <button className="mobileMax:hidden text-white text-[16px] mr-[12px] font-[700]">
            Logout
          </button>
          <Image src={LogoutIcon} alt="LogoutIcon" />
        </div>
      )}
    </div>
  );
}

export default Header;
