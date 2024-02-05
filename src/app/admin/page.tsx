import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  return (
    <div className="max-w-5xl mx-auto mt-32">
      <p className="text-3xl ">
        Selamat datang, Admin <strong>{session?.user.username}</strong>
      </p>
    </div>
  );
}
