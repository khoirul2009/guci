import { useEffect } from "react";
import ProductCart from "../../components/product";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/globalRedux/hook";
import {
  getProducts,
  setQuery,
} from "@/globalRedux/features/product/productSlice";

export default function ProductSection() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const searchQuery = searchParams.get("query");

  const dispatch = useAppDispatch();

  const productState = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      getProducts({
        page: parseInt(page),
        query: searchQuery ?? productState.query,
      })
    );
  }, [page]);

  return productState.isLoading == false ? (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {productState.products?.map((item, index) => (
          <ProductCart key={index} product={item} />
        ))}
      </div>
      <div className="join mt-10 ">
        <Link
          href={
            parseInt(page) > 1
              ? `${window.location.href}?page=${parseInt(page) - 1}`
              : `${window.location.href}?page=1`
          }
          className="join-item btn btn-md"
        >
          Previous page
        </Link>
        {Array.from(Array(productState.pages), (e, i) => {
          return (
            <Link
              key={i}
              href={`${window.location.href}?page=${i + 1}`}
              className="join-item btn btn-md"
            >
              {i + 1}
            </Link>
          );
        })}
        <Link
          href={
            parseInt(page) != productState.pages
              ? `${window.location.href}?page=${parseInt(page) + 1}`
              : `${window.location.href}?page=${parseInt(page)}`
          }
          className="join-item btn btn-md"
        >
          Next
        </Link>
      </div>
    </>
  ) : (
    <>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from(Array(4), (e, i) => {
          return (
            <div
              key={i}
              className="card bg-base-100 shadow-xl mb-5 w-full  hover:opacity-90 cursor-pointer"
            >
              <figure>
                <div className="bg-base-200 h-[300px] w-full"></div>
              </figure>
              <div className="card-body">
                <h2 className="card-title text-base-200 bg-base-200">
                  LlllLLLLLLLL
                </h2>
                <div className="flex flex-1 justify-between">
                  <p className="font-semibold  bg-base-200 text-base-200">
                    lllllllllll
                  </p>
                  <p className="text-right text-base-200 font-semibold bg-base-200">
                    llllll
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
