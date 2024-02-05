"use client";
import { setToastState } from "@/globalRedux/features/toast/toastSlice";
import { Post } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoAdd, IoEyeOutline, IoPencil, IoTrash } from "react-icons/io5";
import { useDispatch } from "react-redux";

export default function Blog() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<Post[]>();
  const [pages, setPages] = useState<number>();
  const [isFetch, setIsFetch] = useState(false);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const size = searchParams.get("size") || "5";

  useEffect(() => {
    getPost();
  }, []);
  async function getPost() {
    setIsFetch(true);
    try {
      const response = await axios.get(`/api/post?page=${page}&size=${size}`);

      setPosts(response.data.data);
      setPages(response.data.pages);
      setIsFetch(false);
    } catch (error: any) {
      dispatch(
        setToastState({
          isShown: true,
          message: error.response.data.message,
          type: "error",
        })
      );
      setIsFetch(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto mt-10">
      {isFetch ? (
        <div className="card lg:card-side max-w-3xl mx-auto bg-base-100 shadow-xl">
          <figure>
            <div className="w-[350px] h-[350px] bg-gray-200"></div>
          </figure>
          <div className="card-body">
            <h2 className="card-title bg-gray-200 text-gray-200">Hai</h2>

            <div className=" bg-gray-200 text-gray-200 h-[20px] w-[150px]"></div>
            <div className=" bg-gray-200 text-gray-200 h-[20px] mt-10 "></div>
            <div className=" bg-gray-200 text-gray-200 h-[20px] w-[300px]"></div>
            <div className="card-actions justify-end mt-auto">
              <div className=" bg-gray-200 text-gray-200 h-[50px] rounded-md w-[80px]"></div>
              <div className=" bg-gray-200 text-gray-200 h-[50px] rounded-md w-[80px]"></div>
              <div className=" bg-gray-200 text-gray-200 h-[50px] rounded-md w-[80px]"></div>
            </div>
          </div>
        </div>
      ) : (
        posts?.map(
          (
            { author, description, id, thumbnailPath, title, createdAt },
            index
          ) => (
            <div
              key={index}
              className="card lg:card-side max-w-3xl mx-auto bg-base-100 shadow-xl mt-5"
            >
              <figure>
                <img
                  src={`https://hcnuxswybozwzvullpzu.supabase.co/storage/v1/object/public/upload-images/${thumbnailPath}`}
                  alt="Album"
                  className="w-[350px]"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className="text-slate-500">
                  <p>Author : {author}</p>
                </div>
                <div
                  className="max-h-[100px] max-w-[320px] overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: description }}
                ></div>
                <div className="card-actions justify-end mt-auto">
                  <Link
                    href={`/post/${id}`}
                    className="btn btn-success hover:bg-green-500 text-white text-lg"
                  >
                    <IoEyeOutline />
                  </Link>
                  <Link
                    href={`/admin/blog/${id}`}
                    className="btn btn-primary text-white text-lg"
                  >
                    <IoPencil />
                  </Link>
                  <button
                    onClick={async () => {
                      try {
                        const response = await axios.delete(`/api/post/${id}`);

                        if (response.status === 200) {
                          dispatch(
                            setToastState({
                              isShown: true,
                              message: response.data.message,
                              type: "success",
                            })
                          );
                          getPost();
                        }
                      } catch (error: any) {
                        dispatch(
                          setToastState({
                            isShown: true,
                            message: error.response.data.message,
                            type: "error",
                          })
                        );
                      }
                    }}
                    className="btn btn-error hover:bg-red-500 text-white text-lg"
                  >
                    <IoTrash />
                  </button>
                </div>
              </div>
            </div>
          )
        )
      )}
      <div className="join mt-20 ms-auto">
        <Link
          href={
            parseInt(page) > 1
              ? `/admin/blog?page=${parseInt(page) - 1}`
              : `/admin/blog?page=1`
          }
          className="join-item btn btn-md"
        >
          <FaChevronLeft />
        </Link>
        {Array.from(Array(pages), (e, i) => {
          return (
            <Link
              href={`/admin/blog?page=${i + 1}`}
              className="join-item btn btn-md"
            >
              {i + 1}
            </Link>
          );
        })}
        <Link
          href={
            parseInt(page) != pages
              ? `/admin/blog?page=${parseInt(page) + 1}`
              : `/admin/blog?page=${parseInt(page)}`
          }
          className="join-item btn btn-md"
        >
          <FaChevronRight />
        </Link>
      </div>

      <Link
        href="/admin/blog/add"
        title="Contact Sale"
        className="fixed z-90  bottom-10 right-8 bg-blue-600 w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700"
      >
        <IoAdd />
      </Link>
    </div>
  );
}
