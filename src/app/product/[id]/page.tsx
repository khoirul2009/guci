import { prisma } from "@/lib/database";
import FormCart from "./components/form-cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Drawer from "@/app/components/drawer";
import Image from "next/image";

export default async function Product({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  const session = await getServerSession(authOptions);
  const user = session?.user
    ? await prisma.user.findUniqueOrThrow({
        where: { email: session!.user.email || "" },
      })
    : null;

  return (
    <Drawer session={session}>
      <div className="max-w-3xl lg:mx-auto mt-28  mx-5 ">
        <h1 className="font-bold text-2xl lg:text-3xl mb-5">{product?.name}</h1>
        <img
          src={`https://hcnuxswybozwzvullpzu.supabase.co/storage/v1/object/public/upload-images/${product?.imagePath}`}
          alt=""
          className="mx-auto rounded-xl h-[400px] mb-5"
        />

        {product?.available ? (
          <p className=" font-medium text-lg badge badge-success p-5 text-white">
            Tersedia
          </p>
        ) : (
          <p className=" font-medium text-lg badge badge-error p-5 text-white">
            Tidak Tersedia
          </p>
        )}
        <div
          dangerouslySetInnerHTML={{ __html: product?.description || "" }}
          className="my-5 text-gray-600"
        ></div>
        <h1 className="font-bold text-2xl mb-5">Harga Tiket</h1>
        {product && user ? (
          <FormCart
            product={product}
            productId={product.id}
            userId={user.id}
            productPrice={product.price}
          />
        ) : (
          <p className="text-center my-10 bg-slate-200 p-3 rounded-xl">
            Login terlebih dahulu!
          </p>
        )}
      </div>
    </Drawer>
  );
}
