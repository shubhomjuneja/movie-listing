"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddIcon from "../../assets/add.svg";
import Logout from "@/components/Header/logout";

type Props = {
  title?: string;
  isHidden?: boolean;
  logoutVisible?: boolean;
};

function Header({ title, isHidden, logoutVisible }: Props) {
  return (
    <div
      className={`${
        isHidden ? "hidden" : "flex"
      }  justify-between md:pr-[30px] items-center`}
    >
      <div className="flex justify-center items-center">
        <p className="text-white md:text-[48px] font-[600] mr-[12px] text-[32px]">
          {title}
        </p>
        {logoutVisible && (
          <Link href="/movies/create">
            <Image src={AddIcon} alt="AddIcon" />
          </Link>
        )}
      </div>
      {logoutVisible && <Logout />}
    </div>
  );
}

export default Header;
