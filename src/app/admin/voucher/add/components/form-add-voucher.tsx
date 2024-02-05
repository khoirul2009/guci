"use client";
import { FormEvent, useState } from "react";

import { useDispatch } from "react-redux";
import { setToastState } from "@/globalRedux/features/toast/toastSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import InputText from "@/app/admin/product/add/components/input-text";

export default function FormAddVoucher() {
  const [formData, setFormData] = useState<{
    name: string;
    point: number;
    image: any;
  }>({
    name: "",
    point: 0,
    image: null,
  });
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const form = new FormData();
      form.set("name", formData.name);
      form.set("image", formData.image);
      form.set("point", formData.point.toString());

      const response = await axios.post("/api/voucher", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status == 201) {
        dispatch(
          setToastState({
            isShown: true,
            message: response.data.message,
            type: "success",
          })
        );
        setFormData({ name: "", point: 0, image: null });
      }
      setDisabled(false);
    } catch (error: any) {
      dispatch(
        setToastState({ isShown: true, message: error.message, type: "error" })
      );
      setDisabled(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputText
        type="text"
        label="Name Voucher"
        onChange={handleInputChange}
        name="name"
        value={formData.name}
      />
      <InputText
        type="number"
        label="Point"
        onChange={handleInputChange}
        name="point"
        value={formData.point}
      />

      <label htmlFor="image" className="label font-medium">
        Image Voucher
      </label>
      <input
        type="file"
        name="image"
        required
        onChange={(e) =>
          setFormData({ ...formData, image: e.target.files?.[0] })
        }
        className="file-input file-input-bordered w-full file-input-secondary  block"
      />
      <button
        disabled={disabled}
        type="submit"
        className="btn btn-primary mt-5 text-white"
      >
        Save
      </button>
    </form>
  );
}
