"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCartPlus, FaMinus, FaPlus } from "react-icons/fa";

export default function FormCart({ userId, productId, productPrice, product }) {
  const [count, setCount] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const [data, setData] = useState({
    birthdate: "",
    email: "",
    fullName: "",
    noWa: "",
    gender: "",
    province: "",
    grandTotal: 0,
    productId,
    userId,
    quantity: 0,
  });

  useEffect(() => {
    setData({ ...data, grandTotal: count * productPrice, quantity: count });
  }, [count]);

  const handleSubmit = async () => {
    setDisabled(true);

    try {
      const response = await axios.post("/api/order", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        alert(response.data.message);
        router.push(`/order/${response.data.order.id}`);
      }
      setDisabled(false);
      setCount(0);
    } catch (error) {
      alert(error.response.data.message);
      setDisabled(false);
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    document.getElementById("confirm").showModal();
  };

  return (
    <div>
      <div className=" space-y-0 border rounded-lg mb-10 shadow-lg">
        <div className="flex justify-between   p-6 border-b    ">
          <p className="text-lg">Rp. {productPrice}</p>
          <div className="space-x-3">
            <button
              type="button"
              className="btn btn-circle"
              onClick={() => setCount(count <= 1 ? 1 : count - 1)}
            >
              <FaMinus />
            </button>
            <input
              type="number"
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="input input-bordered w-[70px]"
              value={count}
              min={1}
            />
            <button
              type="button"
              className="btn rounded-full border"
              onClick={() => setCount(count + 1)}
            >
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="flex space-x-5 items-center justify-between  p-8  ">
          <p className="text-lg">Rp. {data.grandTotal} </p>

          <label className="btn btn-primary" htmlFor="my_modal_6">
            <span> Pesan Sekarang</span>
            <FaCartPlus />
          </label>
        </div>
      </div>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box rounded-none w-5/12 max-w-5xl bg-base-200">
          <h3 className="font-bold text-lg mb-5">Mohon Lengkapi Data</h3>
          <hr className="border" />
          <form onSubmit={handleConfirm}>
            <label htmlFor="" className="label">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Nama Lengkap"
              required
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
            />
            <label htmlFor="" className="label">
              Email
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Email"
              required
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <label htmlFor="" className="label">
              Konfirmasi Email
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Konfirmasi Email"
              required
            />
            <label htmlFor="" className="label">
              No Whatsapp
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="No Whatsapp"
              required
              onChange={(e) => setData({ ...data, noWa: e.target.value })}
            />
            <label htmlFor="" className="label">
              Jenis Kelamin
            </label>
            <select
              required
              onChange={(e) => setData({ ...data, gender: e.target.value })}
              className="select select-bordered w-full "
            >
              <option disabled selected>
                Jenis Kelamin?
              </option>
              <option value="laki-laki">Laki - Laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
            <label htmlFor="" className="label">
              Provinsi
            </label>
            <input
              type="text"
              required
              className="input input-bordered w-full"
              placeholder="Provinsi"
              onChange={(e) => setData({ ...data, province: e.target.value })}
            />
            <label htmlFor="" className="label">
              Tanggal Lahir
            </label>
            <input
              onChange={(e) => setData({ ...data, birthdate: e.target.value })}
              type="date"
              required
              className="input input-bordered w-full"
            />
            <div className="modal-action">
              {/* <form method="dialog">
              </form> */}
              <label
                htmlFor="my_modal_6"
                className="btn px-10 bg-white text-primary"
              >
                Batal
              </label>
              <button type="submit" className="text-white btn btn-primary">
                Pesan Sekarang
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <dialog id="confirm" className="modal ">
        <div className="modal-box rounded-none w-4/12 max-w-5xl border-t-4 border-neutral">
          <h3 className="font-extrabold text-lg  text-center">Konfirmasi!</h3>
          <div className="bg-slate-100 p-4 rounded-lg text-center mt-5 ">
            <p>E-Tiket anda akan dikirim ke</p>
            <div>
              Email : <strong className="font-bold"> {data.email} </strong>
            </div>
            <p>Whatsapp : {data.noWa} </p>
          </div>
          <div className="bg-slate-100 p-4 rounded-lg text-center mt-5 ">
            <p>List yang dibeli</p>
            <p>Schedule : {product.name} </p>
            <p>Whatsapp : {data.noWa} </p>
            <p>Quantity : {data.quantity} Tikect </p>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
              <button
                onClick={handleSubmit}
                type="button"
                disabled={disabled}
                className="btn btn-neutral ms-5"
              >
                Ya, Lanjutkan
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
