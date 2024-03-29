import React, { ReactNode } from "react";
import bg from "@/assets/mainBg.svg";
type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div
      className={`h-screen px-5 lg:px-[120px] overflow-auto bg-bottom`}
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  );
}

export default Layout;
