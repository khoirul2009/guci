"use client";

import ActionOptions from "./action-options";
import { useEffect, useState } from "react";
import type { Product } from "@prisma/client";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToastState } from "@/globalRedux/features/toast/toastSlice";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [pages, setPages] = useState<number>();
  const page = searchParams.get("page") || "1";
  const size = searchParams.get("size") || "5";

  useEffect(() => {
    fetchProduct();
  }, [searchParams]);

  const dispatch = useDispatch();
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/product?page=${page}&size=${size}`
      );

      if (response.status == 200) {
        setProducts(response.data.data);
        setPages(response.data.pages);
      }
      setLoading(false);
    } catch (error: any) {
      dispatch(setToastState(error.message));
      setLoading(false);
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            products?.map(
              ({ name, price, available, imagePath, id }, index) => (
                <tr key={id}>
                  <th>{index + 1}</th>
                  <td>
                    <img
                      height={100}
                      width={100}
                      src={`https://hcnuxswybozwzvullpzu.supabase.co/storage/v1/object/public/upload-images/${imagePath}`}
                      alt=""
                    />
                  </td>
                  <td>{name}</td>
                  <td>{price}</td>
                  <td>{available ? "Tersedia" : "Tidak Tersedia"}</td>
                  <td>
                    <ActionOptions
                      fetchProduct={fetchProduct}
                      imagePath={imagePath}
                      productId={id}
                    />
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td className="text-center" colSpan={6}>
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="join mt-10">
        <Link
          href={
            parseInt(page) > 1
              ? `/admin/product?page=${parseInt(page) - 1}`
              : `/admin/product?page=1`
          }
          className="join-item btn btn-md"
        >
          Previous page
        </Link>
        {Array.from(Array(pages), (e, i) => {
          return (
            <Link
              key={i}
              href={`/admin/product?page=${i + 1}`}
              className="join-item btn btn-md"
            >
              {i + 1}
            </Link>
          );
        })}
        <Link
          href={
            parseInt(page) != pages
              ? `/admin/product?page=${parseInt(page) + 1}`
              : `/admin/product?page=${parseInt(page)}`
          }
          className="join-item btn btn-md"
        >
          Next
        </Link>
      </div>
    </div>
  );
}
