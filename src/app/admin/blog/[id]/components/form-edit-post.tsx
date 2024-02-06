"use client";
import { FormEvent, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setToastState } from "@/globalRedux/features/toast/toastSlice";
import axios from "axios";
import InputText from "@/app/admin/product/add/components/input-text";
import Tiptap from "@/app/admin/components/tiptap";

export default function FormEditPost() {
  const [formData, setFormData] = useState<{
    title: string;
    author: string;
    thumbnail: any;
    description: string;
    category: string;
  }>({
    title: "",
    author: "",
    thumbnail: null,
    description: "",
    category: "",
  });
  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    getPost();
  }, []);

  async function getPost() {
    try {
      const url = window.location.href;
      const postId = url.split("/")[5];
      const response = await axios.get(`/api/post/${postId}`);

      if (response.status == 200) {
        setFormData({
          title: response.data.data.title,
          author: response.data.data.author,
          description: response.data.data.description,
          thumbnail: null,
          category: response.data.category,
        });
      }
    } catch (error: any) {
      dispatch(
        setToastState({ isShown: true, message: error.message, type: "error" })
      );
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = window.location.href;
    const postId = url.split("/")[5];
    setDisabled(true);
    try {
      const form = new FormData();
      form.set("title", formData.title);
      form.set("thumbnail", formData.thumbnail ?? null);
      form.set("description", formData.description);
      form.set("author", formData.author);

      const response = await axios.patch(`/api/post/${postId}`, form, {
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
      console.log(error);
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
        defaultValue={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        <option disabled selected>
          Select category post
        </option>

        <option value="Tourism">Tourism</option>
        <option value="Blog">Blog</option>
      </select>
      <label htmlFor="thumbnail" className="label font-medium">
        Thumbnail
      </label>
      <input
        type="file"
        name="thumbnail"
        onChange={(e) =>
          setFormData({ ...formData, thumbnail: e.target.files?.[0] })
        }
        className="file-input file-input-bordered w-full file-input-secondary  block"
      />
      <div className="my-5">
        <label htmlFor="" className="label font-medium">
          Description
        </label>
        <Tiptap
          title={formData.title}
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
