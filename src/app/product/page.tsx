"use client";
import { BsSearch } from "react-icons/bs";
import ProductSection from "./components/product-section";
import { useSelector } from "react-redux";
import {
  getProducts,
  setQuery,
} from "@/globalRedux/features/product/productSlice";
import { useAppDispatch } from "@/globalRedux/hook";
import Drawer from "../components/drawer";

export default function ProductPage() {
  const dispatch = useAppDispatch();
  const query = useSelector((state: any) => state.product.query);

  return (
    <Drawer session={null}>
      <div className="mt-32 max-w-7xl mx-5 lg:mx-auto">
        <div className=" w-full bg-neutral justify-between rounded-xl">
          <h1 className="font-semibold text-3xl text-white text-center  p-8 mb-10">
            Wisata
          </h1>
        </div>
        <div className="join mb-10">
          <div>
            <input
              className="input input-bordered join-item "
              placeholder="Search"
              onChange={(e) => dispatch(setQuery(e.target.value))}
            />
          </div>
          <div className="indicator">
            <button
              onClick={() => dispatch(getProducts({ page: 1, query: query }))}
              className="btn join-item btn-primary"
            >
              <BsSearch />
            </button>
          </div>
        </div>
        <ProductSection />
      </div>
    </Drawer>
  );
}
