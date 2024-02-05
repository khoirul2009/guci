"use client";
import { FormEvent, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setToastState } from "@/globalRedux/features/toast/toastSlice";
import axios from "axios";
import InputText from "../../../add/components/input-text";
import InputSwitch from "../../../add/components/input-switch";
import Loading from "../loading";
import Tiptap from "@/app/admin/components/tiptap";

export default function FormEditProduct() {
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<{
    name: string | any;
    price: number | any;
    available: boolean | any;
    image: any;
    id: string | any;
    description: string;
  }>({
    id: "",
    name: "",
    price: "",
    available: "",
    image: null,
    description: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    setLoading(true);
    try {
      const url = window.location.href;
      const productId = url.split("/")[5];
      const response = await axios.get(`/api/product/${productId}`);

      if (response.status == 200) {
        const product = await response.data.data;
        setFormData({
          available: product.available,
          id: product.id,
          image: null,
          name: product.name,
          price: product.price,
          description: product.description,
        });
      }
      setLoading(false);
    } catch (error: any) {
      dispatch(
        setToastState({
          isShow: true,
          message: error.message,
          type: "error",
        })
      );
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const url = window.location.href;
    const productId = await url.split("/")[5];
    e.preventDefault();
    setDisabled(true);
    try {
      const form = new FormData();
      form.set("name", formData.name);
      form.set("image", formData.image);
      form.set("available", formData.available.toString());
      form.set("price", formData.price.toString());
      form.set("description", formData.description);

      const response = await axios.patch("/api/product/" + productId, form, {
        headers: {
          "Content-Type": "multipart/form-data",
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
    } catch (error: any) {
      dispatch(
        setToastState({
          isShown: true,
          message: error.response.data.message ?? error.message,
          type: "error",
        })
      );
      setDisabled(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
}
