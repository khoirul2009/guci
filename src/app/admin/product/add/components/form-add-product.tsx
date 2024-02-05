"use client";
import { FormEvent, useState } from "react";
import InputText from "./input-text";
import InputSwitch from "./input-switch";
import { useDispatch } from "react-redux";
import { setToastState } from "@/globalRedux/features/toast/toastSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import Tiptap from "@/app/admin/components/tiptap";

export default function FormAddProduct() {
  const [formData, setFormData] = useState<{
    name: string;
    price: number;
    available: boolean;
    image: any;
    description: string;
  }>({
    name: "",
    price: 0,
    available: false,
    image: null,
    description: "",
  });
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const form = new FormData();
      form.set("name", formData.name);
      form.set("image", formData.image);
      form.set("available", formData.available.toString());
      form.set("price", formData.price.toString());
      form.set("description", formData.description);

      const response = await axios.post("/api/product", form, {
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
        setFormData({
          name: "",
          price: 0,
          available: false,
          image: null,
          description: "",
        });
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
        label="Name Product"
        onChange={handleInputChange}
        name="name"
        value={formData.name}
      />
      <InputText
        type="number"
        label="Price"
        onChange={handleInputChange}
        name="price"
        value={formData.price}
      />
      <InputSwitch
        checked={formData.available}
        label="Available"
        name="available"
        onChange={() =>
          setFormData({ ...formData, available: !formData.available })
        }
      />
      <div className="my-5">
        <label htmlFor="" className="label font-medium">
          Description
        </label>
        <Tiptap
          title=""
          description={formData.description}
          onChange={(rT) => {
            setFormData({ ...formData, description: rT });
          }}
        />
      </div>
      <label htmlFor="image" className="label font-medium">
        Image Product
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
