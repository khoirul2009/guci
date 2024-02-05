"use client";

import { setToastState } from "@/globalRedux/features/toast/toastSlice";
import { Voucher } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function VoucherTable() {
  const [voucher, setVoucher] = useState<Voucher[]>();
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getVoucher();
  }, []);

  async function getVoucher() {
    try {
      const response = await axios.get("/api/voucher");

      if (response.status == 200) {
        setVoucher(response.data.data);
      }
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

  return (
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Image</th>
          <th>Point</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {voucher?.map(({ id, imagePath, name, point }, index) => (
          <tr key={index}>
            <th>{index + 1}</th>
            <td>{name}</td>
            <td>
              <img
                className="h-[100px] w-[100px]"
                src={`https://hcnuxswybozwzvullpzu.supabase.co/storage/v1/object/public/upload-images/${imagePath}`}
                alt=""
              />
            </td>
            <td>{point}</td>
            <td>
              <button
                className="btn btn-sm btn-error text-white"
                onClick={async () => {
                  setDisabled(true);
                  const isConfirm = confirm(
                    "Are you sure to delete this item?"
                  );
                  if (isConfirm.valueOf() == true) {
                    try {
                      const response = await axios.delete(`/api/voucher/${id}`);

                      if (response.status === 200) {
                        dispatch(
                          setToastState({
                            isShown: true,
                            message: response.data.message,
                            type: "success",
                          })
                        );
                      }
                      getVoucher();
                      setDisabled(false);
                    } catch (error: any) {
                      dispatch(
                        setToastState({
                          isShown: true,
                          message: error.message,
                          type: "error",
                        })
                      );
                      setDisabled(false);
                    }
                  }
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
