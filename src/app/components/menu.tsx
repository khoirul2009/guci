"use client";
import Link from "next/link";

export default function Menu() {
  return (
    <>
      <li>
        <Link href="/product">Wisata</Link>
      </li>
      <li>
        <Link href="/blog">Blog</Link>
      </li>
      <li>
        <Link href="/kontak">Kontak</Link>
      </li>
    </>
  );
}
