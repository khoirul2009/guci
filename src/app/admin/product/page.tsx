"use client";
import Link from "next/link";
import ProductTable from "./components/table";
import { IoAdd } from "react-icons/io5";
import { setToastState } from "@/globalRedux/features/toast/toastSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Product() {
  const toast = useSelector((state: any) => state.toast);
  const dispatch = useDispatch();
  return (
    <div className="bg-white m-10 p-10 rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-lg font-medium mb-5">Product Page - Admin</h2>

      <ProductTable />

      {toast.isShown !== false ? (
        <div className="toast toast-bottom toast-center">
          <div
            className={`alert ${
              toast.type == "error" ? "alert-error" : "alert-success"
            } `}
          >
            <span>{toast.message}</span>
            <span
              className="text-lg hover:opacity-75 cursor-pointer"
              onClick={() =>
                dispatch(
                  setToastState({ isShown: false, message: "", type: "" })
                )
              }
            >
              x
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      <Link
        href="/admin/product/add"
        title="Contact Sale"
        className="fixed z-90  bottom-10 right-8 bg-blue-600 w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700"
      >
        <IoAdd />
      </Link>
    </div>
  );
}
