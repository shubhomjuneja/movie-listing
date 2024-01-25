"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import AddIcon from "../../assets/add.svg";
import LogoutIcon from "@/assets/logout.svg";
import ConfirmationModal from "@/components/ConfirmationModal";
import { signOut } from "next-auth/react";

type Props = {
  title?: string;
  isHidden?: boolean;
  logoutVisible?: boolean;
};

function Header({ title, isHidden, logoutVisible }: Props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
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
          <button
            onClick={() => setShowModal(!showModal)}
            className="mobileMax:hidden text-white text-[16px] mr-[12px] font-[700] flex justify-center items-center cursor-pointer"
          >
            Logout
            <Image src={LogoutIcon} alt="LogoutIcon" className="ml-2" />
          </button>
        )}
      </div>
      {showModal && (
        <ConfirmationModal
          modalTitle="Logout?"
          modalSubTitle="Are you sure you want to logout?"
          setShowModal={() => {
            setShowModal(!showModal);
          }}
          handleConfirmation={() => signOut()}
        />
      )}
    </>
  );
}

export default Header;
