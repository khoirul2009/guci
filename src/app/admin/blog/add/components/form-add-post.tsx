"use client";
import { FormEvent, useState } from "react";

import { useDispatch } from "react-redux";
import { setToastState } from "@/globalRedux/features/toast/toastSlice";
import axios from "axios";
import InputText from "@/app/admin/product/add/components/input-text";
import Tiptap from "@/app/admin/components/tiptap";

export default function FormAddPost() {
  const [formData, setFormData] = useState<{
    title: string;
    author: string;
    image: any;
    description: string;
    category: string;
  }>({
    title: "",
    author: "",
    image: null,
    description: "",
    category: "",
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
      form.set("title", formData.title);
      form.set("image", formData.image);
      form.set("description", formData.description);
      form.set("author", formData.author);
      form.set("category", formData.category);

      const response = await axios.post("/api/post", form, {
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
          title: "",
          author: "",
          image: null,
          description: "",
          category: "",
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
        label="Title"
        onChange={handleInputChange}
        name="title"
        value={formData.title}
      />
      <InputText
        type="text"
        label="Author"
        onChange={handleInputChange}
        name="author"
        value={formData.author}
      />

      <label htmlFor="" className="label font-medium">
        Category
      </label>

      <select
        className="select select-bordered w-full "
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        <option disabled selected>
          Select category post
        </option>
        <option value="Tourism">Tourism</option>
        <option value="Blog">Blog</option>
      </select>

      <label htmlFor="image" className="label font-medium">
        Thumbnail
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
