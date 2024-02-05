"use client";
import { prisma } from "@/lib/database";
import { User } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Order = {
  id: string;
  userId: string;
  status: string;
  grandTotal: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  noWa: String;
  email: string;
};

export default function Transaction() {
  const [orders, setOrders] = useState<Order[]>();
  const [pages, setPages] = useState<number>();

  const searchParams = useSearchParams();
  const currentPage: number = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    fetchOrder();
  }, [searchParams]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        `/api/order?page=${searchParams.get("page") || "1"}&per_page=${
          searchParams.get("per_page") || "5"
        }`
      );
      if (response.status === 200) {
        setOrders(response.data.data);
        setPages(response.data.totalPage);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <div className="max-w-5xl mx-auto bg-white mt-10 p-10 rounded-lg shadow-md">
      <h1 className="text-lg font-medium mb-5">Transaction - Admin Page</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>User </th>
            <th>GrandTotal</th>
            <th>no Wa</th>
            <th>Email</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders?.map(
            (
              { grandTotal, id, status, userId, createdAt, user, noWa, email },
              index
            ) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{id}</td>
                <td>{new Date(createdAt).toLocaleDateString("id-ID")}</td>
                <td>{user.name}</td>
                <td>{grandTotal}</td>
                <td>{noWa}</td>
                <td>{email}</td>
                <td className="text-medium capitalize">{status}</td>
                <td>
                  <Link
                    href={`/order/${id}`}
                    className="btn btn-sm btn-success"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div className="join mt-10">
        <Link
          href={
            currentPage > 1
              ? `/admin/transaction?page=${currentPage - 1}`
              : `/admin/transaction?page=1`
          }
          className="join-item btn btn-md"
        >
          Previous page
        </Link>
        {Array.from(Array(pages), (e, i) => {
          return (
            <Link
              href={`/admin/transaction?page=${i + 1}`}
              className="join-item btn btn-md"
            >
              {i + 1}
            </Link>
          );
        })}
        <Link
          href={
            currentPage != pages
              ? `/admin/transaction?page=${currentPage + 1}`
              : `/admin/transaction?page=${currentPage}`
          }
          className="join-item btn btn-md"
        >
          Next
        </Link>
      </div>
    </div>
  );
}
