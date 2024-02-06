import { getServerSession } from "next-auth";
import Drawer from "../components/drawer";
import { authOptions } from "@/lib/auth";

export default async function Kontak() {
  const session = await getServerSession(authOptions);
  return (
    <Drawer session={session}>
      <div className="min-h-[500px] bg-neutral items-center align-middle ">
        <h1 className="text-center text-white pt-[250px] text-4xl font-bold ">
          GET IN TOUCH
        </h1>
        <hr className="max-w-sm mx-auto my-10" />
        <p className="text-white text-center">
          Kritikan & Masukan Anda Sangat Membantu Kami
        </p>
      </div>
      <div className="flex bg-base-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63331.183204917026!2d109.13175031994109!3d-7.218133501115371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f8d3974df69b7%3A0x44f89e1f16c24043!2sGuci%2C%20Kecamatan%20Bumijawa%2C%20Kabupaten%20Tegal%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1707191920838!5m2!1sid!2sid"
          className="lg:w-1/2 lg:block hidden h-[800px]"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="flex items-center w-full lg:w-1/2 p-5 lg:p-0">
          <div className=" w-full flex items-center flex-col  ">
            <h2 className="text-center  mb-10 text-xl font-bold">
              Hubungi Kami
            </h2>
            <form action="" className="mx-auto max-w-md w-full space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="input   input-bordered w-full "
              />
              <input
                type="email"
                placeholder="Email"
                className="input   input-bordered w-full "
              />
              <textarea
                name="Komentar"
                className="input input-bordered w-full h-[200px]"
                id=""
                placeholder="Komentar"
                cols={30}
                rows={10}
              ></textarea>
              <button className="btn btn-primary">Send</button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full mt-10">
        <div className="flex flex-col items-center mx-auto">
          <div className="flex items-center">
            <span className="block w-[70px] h-[3px] m-5 bg-black"></span>
            <h2 className="text-2xl font-bold">Ulasan Kami</h2>
            <span className="block w-[70px] h-[3px] m-5 bg-black"></span>
          </div>
        </div>
        <div className="mt-10 bg-base-200 max-w-3xl mx-auto border-primary border-2 p-5 rounded-xl">
          <div className="flex space-x-5">
            <img
              height={80}
              width={50}
              src="/default-user-profile.png"
              alt="default-user-profile.png"
            />
            <h2 className="text-2xl font-bold">Fico Ardian</h2>
          </div>
          <p className="mt-5">
            “ Saya senang menemukan website ini. Mereka memberikan informasi
            yang sangat lengkap terkait wisata di kabupaten guci . Mereka juga
            memberikan fitur untuk pembelian tiket secara online dengan beragam
            metode pembayaran.“
          </p>
        </div>
      </div>
    </Drawer>
  );
}
