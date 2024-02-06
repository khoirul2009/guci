"use client";
import { useState, useEffect, FormEvent } from "react";
import Loading from "./loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

type Error = {
  message: string;
};

export default function SignUp() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    image: "default-user-profile.png",
  });
  const [errors, setErrors] = useState<any>(null);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Simulate fetching data with a delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDisabled(true);
    try {
      const response = await axios.post("/api/user", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) router.push("/signin");
    } catch (error: any) {
      if (error.response.status === 403) setErrors(error.response.data);
      if (error.response.status === 409)
        setErrors([{ message: error.response.data.message }]);
      setDisabled(false);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="bg-white min-h-screen w-full items-center justify-center">
          <div className="flex ">
            <div className=" p-7 justify-center w-full lg:w-1/2 min-h-screen flex flex-col  ">
              <h3 className="text-4xl text-center font-semibold my-2">
                Buat akun!
              </h3>
              <p className="text-center mt-5">
                Daftarkan diri Anda mulai gunakan layanan kami segera
              </p>
              {errors ? (
                <div
                  className={`bg-red-200 p-5 text-red-600 space-y-2 rounded-lg`}
                >
                  {errors.map((error: Error, i: number) => (
                    <p key={i}>{error.message}</p>
                  ))}
                </div>
              ) : (
                ""
              )}
              <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                <input
                  name="name"
                  type="text"
                  placeholder="Nama"
                  className="input input-bordered w-full mt-10 bg-base-200"
                  onChange={(e) => handleInputChange(e)}
                />

                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="input input-bordered w-full mt-5 bg-base-200"
                  onChange={(e) => handleInputChange(e)}
                />

                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="input input-bordered w-full mt-5 bg-base-200 "
                  onChange={(e) => handleInputChange(e)}
                />

                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full mt-5 bg-base-200"
                  onChange={(e) => handleInputChange(e)}
                />

                <button
                  type="submit"
                  disabled={disabled}
                  className="btn btn-primary mt-4 w-full text-white "
                >
                  Sign Up
                </button>
              </form>
              <p className="text-center mt-20">
                Sudah memiliki akun?
                <Link href="/signin" className="text-[#FF5732] ms-2">
                  Masuk
                </Link>
              </p>{" "}
            </div>
            <div className="bg-neutral hidden lg:flex items-center w-1/2">
              <img src="/guci.png" className="mx-auto " alt="" />
            </div>
          </div>
        </main>
      )}
    </>
  );
}
