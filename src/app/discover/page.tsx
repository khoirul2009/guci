"use client";

import { useSearchParams } from "next/navigation";
import ProductSection from "../product/components/product-section";
import { useAppDispatch } from "@/globalRedux/hook";

export default function Discover() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const dispatch = useAppDispatch();

  return (
    <div className="max-w-6xl mx-5 lg:mx-auto mt-24">
      <h1 className="text-3xl font-semibold mb-10">Search Result</h1>
      <ProductSection />
    </div>
  );
}
