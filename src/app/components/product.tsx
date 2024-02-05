"use client";
import type { Product } from "@prisma/client";
import Link from "next/link";

interface Params {
  product: Product;
  key: any;
}

export default function Product({ product, key }: Params) {
  return (
    <Link
      key={key}
      href={`/product/${product.id}`}
      className="card bg-base-100 shadow-xl mb-5 w-full  hover:opacity-90 cursor-pointer"
    >
      <figure>
        <img
          src={`https://hcnuxswybozwzvullpzu.supabase.co/storage/v1/object/public/upload-images/${product.imagePath}`}
          alt="Shoes"
          className="h-[200px] lg:h-[300px] w-full  "
        />
      </figure>
      <div className="card-body p-5 lg:p-8">
        <h2 className="card-title text-sm lg:text-lg">{product.name}</h2>
        <div className="flex flex-1 justify-between">
          <p className="font-semibold text-primary text-xs lg:text-md">
            Rp {product.price}
          </p>
          <p className="text-right text-success font-semibold text-xs lg:text-md">
            {product.available ? "Tiket Tersedia" : "Tiket Tidak Tersedia"}
          </p>
        </div>
      </div>
    </Link>
  );
}
