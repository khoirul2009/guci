"use client";

import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";

export default function Logout() {
  return (
    <a onClick={() => signOut()}>
      <BiLogOut /> Logout
    </a>
  );
}
