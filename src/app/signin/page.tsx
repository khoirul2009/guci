"use client";
import { useState, useEffect, FormEvent } from "react";
import Loading from "./loading";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any | string>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching data with a delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);

    const signInData = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    if (signInData?.error) {
      setError("Login fail please check your credential!");
      setDisabled(false);
      return;
    }
    if (signInData?.ok) {
      router.push("/");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="bg-white min-h-screen w-full items-center justify-center">
          <div className="flex ">
            <div className=" p-7 justify-center w-1/2 min-h-screen flex flex-col  ">
              <h3 className="text-4xl text-center font-semibold my-2">
                Selamat Datang Kembali!
              </h3>
              <p className="text-center mt-5">
                Silahkan masuk dengan akun anda
              </p>
              {error ? (
                <div
                  className={`bg-red-200 p-5 text-red-600  rounded-lg flex justify-between`}
                >
                  <p>{error}</p>
                  <span
                    className="font-semibold cursor-pointer hover:opacity-80"
                    onClick={() => setError(null)}
                  >
                    X
                  </span>
                </div>
              ) : (
                ""
              )}
              <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full  mt-10 bg-base-200 "
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <input
                  id="username"
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full mt-5 bg-base-200 "
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="btn btn-primary mt-4 w-full text-white "
                  disabled={disabled}
                >
                  Sign In
                </button>
              </form>

              <p className="text-center mt-20">
                Belum punya akun?
                <Link href="/signup" className="text-[#FF5732] ms-2">
                  Daftar
                </Link>
              </p>
            </div>
            <div className="bg-neutral w-1/2"></div>
          </div>
        </main>
      )}
    </>
  );
}
