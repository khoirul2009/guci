"use client";
import { setToastState } from "@/globalRedux/features/toast/toastSlice";
import { Post } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import PostComponent from "./components/post";

export default function Post() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<Post[]>();
  const [pages, setPages] = useState<number>();
  const [isFetch, setIsFetch] = useState(false);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    getPost();
  }, []);
  async function getPost() {
    setIsFetch(true);
    try {
      const response = await axios.get(`/api/post?page=${page}&size=${3}`);

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
    <div className="max-w-7xl mx-auto mt-32">
      <div className=" w-full bg-neutral justify-between rounded-xl">
        <h1 className="font-semibold text-3xl text-white text-center  p-8 mb-10">
          Wisata
        </h1>
      </div>
      {isFetch ? (
        <div className="card lg:card-side max-w-3xl mx-auto ">
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
        posts?.map((post, index) => (
          <PostComponent key={index} style="horizontal" post={post} />
        ))
      )}
      <div className="join mt-20 w-full">
        <Link
          href={
            parseInt(page) > 1
              ? `/blog?page=${parseInt(page) - 1}`
              : `/blog?page=1`
          }
          className="join-item btn btn-md ms-auto"
        >
          <FaChevronLeft />
        </Link>
        {Array.from(Array(pages), (e, i) => {
          return (
            <Link
              key={i}
              href={`/blog?page=${i + 1}`}
              className="join-item btn btn-md"
            >
              {i + 1}
            </Link>
          );
        })}
        <Link
          href={
            parseInt(page) != pages
              ? `/blog?page=${parseInt(page) + 1}`
              : `/blog?page=${parseInt(page)}`
          }
          className="join-item btn btn-md me-auto"
        >
          <FaChevronRight />
        </Link>
      </div>
    </div>
  );
}
