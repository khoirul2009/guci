import Link from "next/link";
import { BiSolidBox, BiSolidDashboard, BiSolidReport } from "react-icons/bi";
import { BsNewspaper, BsTagFill } from "react-icons/bs";

export default function Menu() {
  return (
    <>
      <li>
        <Link
          href="/admin"
          className="flex items-center space-x-2  btn  btn-ghost  justify-start"
        >
          <span>
            <BiSolidDashboard />
          </span>
          <p>Dashboard</p>
        </Link>
      </li>
      <li>
        <Link
          href="/admin/product"
          className="flex items-center space-x-2  btn btn-ghost justify-start"
        >
          <span>
            <BiSolidBox />
          </span>
          <p>Product</p>
        </Link>
      </li>

      <li className="flex items-center space-x-2 ">
        <Link
          href="/admin/blog"
          className="flex items-center space-x-2 w-full btn btn-ghost justify-start"
        >
          <span>
            <BsNewspaper />
          </span>
          <p>Post</p>
        </Link>
      </li>
      <li className="flex items-center space-x-2 ">
        <Link
          href="/admin/transaction"
          className="flex items-center space-x-2 w-full btn btn-ghost justify-start"
        >
          <span>
            <BiSolidReport />
          </span>
          <p>Transaction</p>
        </Link>
      </li>
    </>
  );
}
