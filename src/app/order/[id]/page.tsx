import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/database";
import { getServerSession } from "next-auth";
import ButtonPayment from "../components/button-payment";
import { formatter } from "@/lib/utlis";

export default async function OrderDetail({
  params,
}: {
  params: { id: string };
}) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      product: true,
    },
  });
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });

  return (
    <div className="mt-20 max-w-7xl mx-auto flex-col lg:flex flex-none gap-5">
      {order?.status !== "paid" ? (
        <div className="w-full lg:w-3/5 mx-auto shadow-md p-8 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Pembayaran</h1>

          <div className="w-full mt-5" id="snap-container"></div>
        </div>
      ) : (
        ""
      )}
      <div className="w-full lg:w-2/5">
        <div className="bg-white shadow-md rounded-md p-8">
          <h2 className="text-2xl font-bold mb-4">Order Details</h2>

          <div className="flex justify-between mb-4">
            <div>
              <p className="text-gray-600">Order ID:</p>
              <p className="font-semibold">{order?.id}</p>
            </div>
            <div>
              <p className="text-gray-600">Date:</p>
              <p className="font-semibold">
                {order?.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">Items:</p>
            <ul className="list-disc ">
              {order?.quantity} x {order?.product.name}
            </ul>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">Total Price:</p>
            <p className="font-semibold">
              {formatter.format(order!!.grandTotal)}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Pajak:</p>
            <p className="font-semibold">
              {formatter.format(order!!.grandTotal * 0.1)}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">Atas Nama:</p>
            <p className="font-semibold">{user?.name}</p>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">Status:</p>
            <p className="font-medium capitalize">{order?.status}</p>
          </div>
          <hr />

          {order && user ? <ButtonPayment order={order} user={user} /> : ""}
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
}
