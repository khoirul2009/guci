import { getServerSession } from "next-auth";
import Drawer from "../components/drawer";
import { authOptions } from "@/lib/auth";

export default async function PrivacyPolicy() {
  const session = getServerSession(authOptions);
  return (
    <Drawer session={session}>
      <div className="mt-32">
        <h1 className="text-center font-bold text-2xl">KEBIJAKAN PRIVASI</h1>
        <div className="max-w-5xl mx-auto mt-10">
          <p className="text-justify">
            GuTix menghargai privasi semua pelanggan dan kontak bisnis kami, dan
            berkomitmen untuk menjaga informasi pribadi yang Anda berikan kepada
            kami. Harap baca Kebijakan Privasi ini untuk mempelajari lebih
            lanjut tentang cara kami mengumpulkan, menggunakan, dan melindungi
            informasi pribadi Anda. Kami ingin Anda sepenuhnya memahami praktik
            privasi kami. Jika Anda memiliki pertanyaan, silakan kirim email
            ke gutix@gmail.com Dengan mengakses dan / atau menggunakan layanan
            yang tersedia di atau melalui Situs, Anda secara tegas menyetujui
            Ketentuan Akses dan secara tegas menyetujui penggunaan dan
            pengungkapan informasi pribadi Anda sesuai dengan Kebijakan Privasi
            ini. Jika Anda tidak menyetujui Ketentuan Akses dan / atau tidak
            menyetujui penggunaan dan pengungkapan tersebut, silakan berhenti
            mengakses atau menggunakan layanan yang tersedia pada atau melalui
            Situs.
          </p>
          <p className="text-justify mt-5">
            <strong>Keamanan</strong>
            <br />
            Kerahasiaan data dan informasi pribadi Anda sangat penting bagi
            kami. Kami akan memberlakukan upaya dan langkah terbaik untuk
            melindungi dan mengamankan data dan informasi pribadi Anda. Namun,
            kami tidak dapat sepenuhnya menjamin bahwa sistem kami tidak dapat
            ditembus karena virus, malware, gangguan atau peristiwa luar biasa,
            termasuk akses tidak sah oleh pihak ketiga. Anda tidak boleh
            mengungkapkan kata sandi akun Anda kepada siapa pun dan harus selalu
            menjaga keamanan perangkat yang Anda gunakan.
          </p>
          <p className="mt-5">
            Catatan: Kami tidak menjamin keamanan basis data kami, kami juga
            tidak dapat menjamin bahwa data yang Anda berikan tidak akan ditahan
            / terganggu saat dikirim kepada kami. Setiap pengiriman informasi
            oleh Anda kepada kami adalah risiko Anda sendiri. Anda tidak dapat
            mengungkapkan kata sandi Anda kepada siapa pun. Tidak peduli
            seberapa efektif teknologi, tidak ada sistem keamanan yang tak
            tertembus.
          </p>
        </div>
      </div>
    </Drawer>
  );
}
