import { getServerSession } from "next-auth";
import Drawer from "../components/drawer";
import { authOptions } from "@/lib/auth";
import Image from "next/image";

export default async function Kontak() {
  const session = await getServerSession(authOptions);
  return (
    <Drawer session={session}>
      <div className="max-w-5xl mt-32 mx-auto ">
        <div className="flex gap-10">
          <Image src="/holiday.png" alt="" width={400} height={400} />
          <div className=" h-full flex-1 flex-col">
            <p className="font-bold">Wisata</p>
            <p>
              Gutix merupakan platform berbasis web yang menyediakan berbagai
              wisata yang ada di objek wisata guci tegal.
            </p>
          </div>
        </div>
        <div className="flex mt-10 gap-10">
          <Image src="/money.png" alt="" width={400} height={400} />
          <div className="">
            <p className="font-bold">Bebas Pilih Metode Pembayaran</p>
            <p>
              Gu-Tix menyediakan beragam metode pembayaran mulai dari kartu
              kredit, transfer bank, hingga pembayaran online lainnya
            </p>
          </div>
        </div>
        <div className="flex mt-10 gap-10">
          <Image src="/cheap.png" alt="" width={400} height={400} />
          <div className="">
            <p className="font-bold">Mudah, Cepat & Aman.</p>
            <p>
              Temukan aktivitas, liburan di objek wisata guci tegal di manapun
              dan kapanpun, tanpa cemas.
            </p>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
