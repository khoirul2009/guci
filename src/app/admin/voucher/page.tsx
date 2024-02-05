"use client";
import Link from "next/link";
import VoucherTable from "./components/table";
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setToastState } from "@/globalRedux/features/toast/toastSlice";

export default function Voucher() {
  const toast = useSelector((state: any) => state.toast);
  const dispatch = useDispatch();
  return (
    <div className="bg-white m-10 p-10 rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-lg font-medium mb-5">Voucher Page - Admin</h2>
      <div className="overflow-x-auto">
        <VoucherTable />
      </div>
      <Link
        href="/admin/voucher/add"
        title="Contact Sale"
        className="fixed z-90  bottom-10 right-8 bg-blue-600 w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700"
      >
        <IoAdd />
      </Link>

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
    </div>
  );
}
