import { getServerSession } from "next-auth";
import Drawer from "../components/drawer";
import { authOptions } from "@/lib/auth";

export default function TermsConditions() {
  const session = getServerSession(authOptions);
  return (
    <Drawer session={session}>
      <div className="mt-32">
        <h1 className="text-center font-bold text-2xl">SYARAT & KETENTUAN</h1>
        <div className="max-w-5xl mx-auto mt-10">
          <p className="text-justify">
            Pelanggan yang terhormat, mohon dicatat bahwa setiap tiket yang
            dibeli diGuTix haruslah mengikuti Syarat & Ketentuan sebagai
            berikut: Semua pesanan atau pembelian bergantung pada ketersediaan,
            Gutix berhak untuk menerima atau menolak pemesanan tiket karena
            alasan apapun. Dengan memesan atau membeli tiket berarti Anda seuju
            dengan ketentuan yang ada, yaitu
          </p>
          <ul className="list-decimal ps-4 mt-5 text-justify">
            <li>
              Pembeli Tiket tidak dapat disamakan dengan Pemegang Tiket. Pembeli
              Tiket adalah orang-orang yang membeli tiket untuk pengunjung dan
              melakukan pembayaran sesuai dengan metode pembayaran tertentu.{" "}
            </li>
            <li>
              Dalam hal/kejadian tertentu Pemegang Tiket adalah orang yang
              melakukan pembelian tiket (Pembeli Tiket), maka pemegang tiket
              wajib menunjukkan Identitas Diri yang jelas (KTP / SIM / Paspor),
              serta menyertai bukti pembelian yang sah apabila diperlukan.
            </li>
            <li>
              Apabila Pemegang Tiket bukan Pembeli Tiket, maka Pemegang Tiket
              harus melengkapi dan menyerahkan "Surat Kuasa" yang telah
              ditandatangani oleh Pembeli Tiket di atas Materai dan disertai
              dengan salinan Identitas Diri Pembeli Tiket yang sah (KTP / SIM /
              Paspor).
            </li>
            <li>
              Baik Pembeli Tiket maupun Pemegang Tiket sepenuhnya tunduk kepada
              semua ketentuan umum Gutix.
            </li>
            <li>
              Tiket yang telah dibeli tidak dapat ditukarkan atau dikembalikan
              karena alasan apapun tanpa pengecualian dan tidak dapat ditransfer
              atau dijual kembali.
            </li>
            <li>
              Tidak ada pengembalian berupa uang tiket dalam keadaan apapun
            </li>
            <li>
              Tiket hanya berlaku untuk 1 (satu) Orang dan 1 (satu) kali
              penggunaan
            </li>
          </ul>
        </div>
      </div>
    </Drawer>
  );
}
