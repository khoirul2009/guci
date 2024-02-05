import Banner from "./components/banner";
import Menu from "./components/menu";
import Navbar from "./components/navbar";
import Product from "./components/product";
import Popular from "./components/popular";
import { prisma } from "@/lib/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { BsCart, BsList, BsPeople } from "react-icons/bs";
import Logout from "./components/logout";
import Drawer from "./components/drawer";

export default async function Home() {
  const product = await prisma.product.findMany({
    take: 3,
  });

  const blog = await prisma.post.findFirst({ where: { category: "Blog" } });
  const session = await getServerSession(authOptions);

  return (
    <main className="bg-base-100">
      <Drawer session={session}>
        <Navbar />
        <section id="wisata" className="pt-32">
          <div className="p-4 rounded-xl container px-5 mx-auto shadow-lg text-center">
            <Banner />
          </div>
        </section>
        <section
          id="recomendation"
          className="container lg:mx-auto lg:px-0 px-5"
        >
          <div className="flex">
            <h3 className=" my-5 align-middle text-xl font-semibold">
              Rekomendasi Terbaik
            </h3>
            <Link href="/product" className="my-auto ms-5 text-sky-600">
              Lihat semua
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {product.map((item, index) => (
              <Product key={index} product={item} />
            ))}
          </div>
        </section>
        {/* Rekomendasi */}
        <section
          id="recomendation"
          className="w-full container mx-auto px-5 lg:px-0 mt-5"
        >
          <Popular />
        </section>
        {/* End Rekomendasi */}
        {/* Popular */}
        <section
          id="blog"
          className="w-full container mx-auto px-5 lg:px-0 pt-20 mb-10 min-h-screen "
        >
          <h3 className="text-center text-3xl font-semibold mb-10">Blog</h3>
          {blog ? (
            <div>
              <div className="lg:flex gap-5 flexRow lg:px-5 px-0">
                <img
                  src={`https://hcnuxswybozwzvullpzu.supabase.co/storage/v1/object/public/upload-images/${blog?.thumbnailPath}`}
                  className="w-full"
                />
                <div className="w-full px-10 mt-5 lg:mt-0">
                  <p>{blog?.createdAt.toDateString()}</p>
                  <p className="text-4xl font-bold mt-3 ">{blog?.title}</p>

                  <Link
                    href={`/blog/${blog.id}`}
                    className="border-2 border-black py-3 px-8 mt-10 block w-64 text-center hover:bg-black hover:text-white"
                  >
                    Read More
                  </Link>
                </div>
              </div>
              <Link
                href="/blog"
                className="border-2 bg-black py-3 px-8 mt-20 block w-64 text-center mx-auto hover:opacity-80 text-white"
              >
                See All
              </Link>
            </div>
          ) : (
            <p className="text-center font-medium text-3xl text-gray-500">
              No Content Yet
            </p>
          )}
        </section>
        {/* End Popular */}
        {/* Kontak & Footer */}
      </Drawer>
    </main>
  );
}