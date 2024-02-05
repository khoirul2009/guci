import { prisma } from "@/lib/database";
import PostComponent from "../components/post";
import Drawer from "@/app/components/drawer";
import Link from "next/link";
import Image from "next/image";

export default async function DetailBlog({
  params,
}: {
  params: { id: string };
}) {
  const post = await prisma.post.findUnique({ where: { id: params.id } });

  const posts = await prisma.post.findMany({
    take: 3,
    orderBy: { createdAt: "asc" },
  });

  return (
    <Drawer session={null}>
      <div className="max-w-5xl mx-auto mt-32">
        <h1 className="text-2xl font-bold">{post?.title}</h1>
        <figure className="mt-10 w-full">
          <img
            src={`https://hcnuxswybozwzvullpzu.supabase.co/storage/v1/object/public/upload-images/${post?.thumbnailPath}`}
            alt=""
            className="w-full"
          />
        </figure>
        <p className="mt-10">{new Date(post!.createdAt).toDateString()}</p>
        <div
          className="my-10"
          dangerouslySetInnerHTML={{ __html: post!.description }}
        ></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 mt-32 justify-between">
          {posts.map((post, index) => (
            <PostComponent key={index} style="" post={post} />
          ))}
        </div>

        <Link
          href="/blog"
          className="border-2 bg-black py-3 px-8 mt-20 block w-64 text-center mx-auto hover:opacity-80 text-white"
        >
          See All
        </Link>
      </div>
    </Drawer>
  );
}
