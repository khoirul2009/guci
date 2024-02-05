"use client";
import { setToastState } from "@/globalRedux/features/toast/toastSlice";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface Params {
  productId: string;
  imagePath: string;
  fetchProduct: () => void;
}

export default function ActionOptions({
  productId,
  imagePath,
  fetchProduct,
}: Params) {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  const handleDelete = async () => {
    const isConfirm = confirm("Are you sure to delete the item?");

    setDisabled(true);
    if (isConfirm.valueOf() == true) {
      try {
        const response = await axios.delete(`/api/product/${productId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            imagePath,
          },
        });

        if (response.status == 200) {
          dispatch(
            setToastState({
              isShown: true,
              message: response.data.message,
              type: "success",
            })
          );
        }
        setDisabled(false);
        fetchProduct();
      } catch (error: any) {
        dispatch(
          setToastState({
            isShown: true,
            message: error.message,
            type: "error",
          })
        );
      }
    }
    setDisabled(false);
  };
  return (
    <div className="space-x-2">
      <button
        onClick={handleDelete}
        disabled={disabled}
        className="btn btn-error btn-sm text-white"
      >
        Delete
      </button>
      <Link
        href={`/admin/product/${productId}/edit`}
        className="btn btn-warning btn-sm text-white"
      >
        Edit
      </Link>
    </div>
  );
}
