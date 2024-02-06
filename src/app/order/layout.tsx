import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../global.css";
import Navbar from "../components/navbar";
import { Providers } from "@/globalRedux/provider";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gu-Tix - Order ",
  description: "Website Resmi Gu Tix",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" data-theme="mytheme">
      <Providers>
        <body className={inter.className}>
          <Navbar />
          <br />
          {children}
        </body>
      </Providers>
    </html>
  );
}
