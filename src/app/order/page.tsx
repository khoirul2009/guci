import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/database";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Drawer from "../components/drawer";

export default async function Order() {
  const session = await getServerSession(authOptions);

  const order = await prisma.order.findMany({
    where: { userId: session?.user.id },
  });
  return (
    <Drawer session={session}>
      <div className="max-w-4xl mt-24 mx-5 lg:mx-auto min-h-screen">
        <h1 className="text-3xl mb-5 font-medium">Order</h1>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>GrandTotal</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {order.map(
                ({ grandTotal, id, status, userId, createdAt }, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{id}</td>
                    <td>{createdAt.toDateString()}</td>
                    <td>{grandTotal}</td>
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
        </div>
      </div>
    </Drawer>
  );
}
