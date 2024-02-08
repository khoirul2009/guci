"use client";

import axios from "axios";
import { FormEvent, useState } from "react";

export default function FormContact() {
  const [data, setData] = useState<{
    name: string;
    email: string;
    comment: string;
  }>({
    comment: "",
    email: "",
    name: "",
  });

  const [disable, setDisable] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDisable(true);
    try {
      const response = await axios.post("/api/contact", data);

      if (response.status == 200) {
        alert(response.data.message);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setDisable(false);
      setData({
        comment: "",
        email: "",
        name: "",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md w-full space-y-3">
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setData({ ...data, name: e.target.value })}
        className="input   input-bordered w-full "
      />
      <input
        type="email"
        placeholder="Email"
        className="input   input-bordered w-full "
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <textarea
        name="Komentar"
        className="input input-bordered w-full h-[200px]"
        id=""
        placeholder="Komentar"
        onChange={(e) => setData({ ...data, comment: e.target.value })}
        cols={30}
        rows={10}
      ></textarea>
      <button disabled={disable} className="btn btn-primary">
        Send
      </button>
    </form>
  );
}
