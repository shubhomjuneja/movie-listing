"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";

const AuthProvider = ({ children, session }: any) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;


export async function getServerSideProps() {
    const session = await getServerSession();
    return {
      props: {
        session,
      },
    };
  }