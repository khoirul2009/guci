import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../global.css";
import { Providers } from "@/globalRedux/provider";
import Navbar from "../components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gu-Tix - Profile ",
  description: "Website Resmi Gu Tix",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="mytheme">
      <body className={inter.className}>
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
