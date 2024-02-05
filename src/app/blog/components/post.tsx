import type { Post } from "@prisma/client";

import Link from "next/link";

export default function PostComponent({
  post,
  style,
}: {
  post: Post;
  style: string;
}) {
  const horizontalContainer = "lg:flex gap-5  lg:px-5 px-0 mt-10";
  const horizontalSubContainer = "w-full px-10 mt-5 lg:mt-0";

  return (
    <div
      className={style == "horizontal" ? horizontalContainer : "flex flex-col"}
    >
      <img
        src={`https://hcnuxswybozwzvullpzu.supabase.co/storage/v1/object/public/upload-images/${post.thumbnailPath}`}
        className="w-full"
        alt=""
      />
      <div className={style == "horizontal" ? horizontalSubContainer : "mt-5 "}>
        <p>{new Date(post.createdAt).toDateString()}</p>
        <p className="text-4xl font-bold mt-3 ">{post.title}</p>

        <Link
          href={`/blog/${post.id}`}
          className="border-2 border-black py-3 px-8 mt-10 block w-64 text-center hover:bg-black hover:text-white"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
