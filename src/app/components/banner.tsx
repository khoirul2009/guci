import { prisma } from "@/lib/database";

export default async function banner() {
  const tourism = await prisma.post.findMany({
    where: { category: "Toursm" },
  });
  return (
    <div className="carousel w-full rounded-xl">
      {tourism.map(({ thumbnailPath }, index) => (
        <div id={`slide${index + 1}`} className="carousel-item relative w-full">
          <a href="" className="w-full">
            <img
              src={`https://hcnuxswybozwzvullpzu.supabase.co/storage/v1/object/public/upload-images/${thumbnailPath}`}
              className="w-full h-[350px]"
            />
          </a>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href={`#slide${index}`} className="btn btn-circle">
              ❮
            </a>
            <a
              href={
                tourism.length == index + 1
                  ? `#slide${1}`
                  : `#slide${index + 2}`
              }
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
