"use client";
import { setToastState } from "@/globalRedux/features/toast/toastSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import FormEditPost from "./components/form-edit-post";

export default function EditPost() {
  const dispatch = useDispatch();
  const toast = useSelector((state: any) => state.toast);
  return (
    <div className="bg-white max-w-5xl mx-auto mt-10 p-10 rounded-lg shadow-md">
      <Link
        href={"/admin/blog"}
        className="mb-5 space-x-3 flex hover:opacity-70 "
      >
        <img src="/back.png" alt="" width={24} />
        <span>Back</span>
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
      <h2 className="text-lg font-medium mb-5">Edit Post Page</h2>
      <FormEditPost />
    </div>
  );
}
