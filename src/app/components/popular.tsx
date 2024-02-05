import { prisma } from "@/lib/database";
import Image from "next/image";

export default async function Popular() {
  const array = [1, 2, 3];
  const voucher = await prisma.voucher.findMany({ take: 3 });
  return (
    <div className="relative z-0">
      <div className="relative z-10 py-10">
        <h3 className="text-3xl font-bold text-white text-center mb-5">
          Popular di Guci Tegal
        </h3>
        <div className="lg:flex lg:flex-row px-5 w-full max-w-5xl gap-10 mx-auto opacity-100">
          {voucher.map(({ imagePath, id, name, point }, index) => (
            <div className="card w-1/3 bg-base-100 shadow-xl mb-5 " key={index}>
              <figure>
                <Image
                  src={`https://hcnuxswybozwzvullpzu.supabase.co/storage/v1/object/public/upload-images/${imagePath}`}
                  alt={name}
                  className="max-h-[250px] my-5"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-sm">{name}</h2>
                <div className="flex flex-1 justify-between">
                  <p className="font-semibold text-black">{point} Point</p>
                  <button className="btn btn-sm text-white rounded-none btn-error hover:bg-red-700">
                    Tukar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-[url('https://gcdnb.pbrd.co/images/bAtTYGiF9rTd.png?o=1')] opacity-80 z-0 bg-no-repeat bg-cover rounded-3xl"></div>
    </div>
  );
}
