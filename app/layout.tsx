import { Inter } from "next/font/google";
import "./globals.css";
import { MovieProvider } from "../context/MovieContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { getServerSession } from "next-auth";
import SessionProvider from "./pages";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <title>Movie-Database</title>
      </head>
      <SessionProvider>
        <MovieProvider>
          <ToastContainer theme="colored" />
          <body className={inter.className}>{children}</body>
        </MovieProvider>
      </SessionProvider>
    </html>
  );
}
