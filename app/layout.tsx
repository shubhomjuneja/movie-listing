import { Inter } from "next/font/google";
import "./globals.css";

import { AuthContext } from "@/context/AuthContext";
import {Toaster} from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*<link rel="preconnect" href="https://fonts.googleapis.com" />*/}
        {/*<link rel="preconnect" href="https://fonts.gstatic.com" />*/}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <title>Movie-Database</title>
      </head>
      <AuthContext>
          <Toaster richColors />
          <body className={inter.className}>{children}</body>
      </AuthContext>
    </html>
  );
}
