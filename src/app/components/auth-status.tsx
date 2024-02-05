import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Logout from "./logout";
import { BsList, BsPeople } from "react-icons/bs";
import Image from "next/image";

export default async function AuthStatus() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session?.user ? (
        <div className="dropdown dropdown-end text-black">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                width={80}
                height={80}
                alt=""
                src={
                  session.user.image
                    ? "/" + session.user.image
                    : "/default-user-profile.png"
                }
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/profile"} className="">
                <BsPeople /> Profile
              </Link>
            </li>

            <li>
              <Link href="/order">
                {" "}
                <BsList /> Order
              </Link>
            </li>
            <li>
              <Logout />
            </li>
          </ul>
        </div>
      ) : (
        <Link href="/signin" className="btn btn-primary btn-sm">
          Masuk
        </Link>
      )}
    </>
  );
}
