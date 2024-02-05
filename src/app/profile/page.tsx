import { prisma } from "@/lib/database";
import { getServerSession } from "next-auth";
import FormUser from "./components/form-user";
import Link from "next/link";
import PhotoProfile from "./components/photo-profile";
import Drawer from "../components/drawer";

export default async function Profile() {
  const session = await getServerSession();
  const user = await prisma.user.findUnique({
    where: { email: session?.user.email || "" },
  });

  return (
    <main className="bg-base-200 min-h-screen items-center flex flex-1 ">
      <Drawer session={session}>
        <div className="max-w-6xl w-full  lg:mx-auto justify-center  ">
          <Link
            href={"/"}
            className="mb-5 space-x-3 flex hover:opacity-70 mt-5 "
          >
            <img src="/back.png" alt="" width={24} />
            <span>Back</span>
          </Link>
          <div className=" lg:flex flex-none w-full py-20 bg-base-100 rounded-xl shadow-lg">
            <PhotoProfile
              userId={user?.id || ""}
              imageUrl={
                user?.image?.toString() ||
                "photoProfile/default-user-profile.png"
              }
            />
            <div className="lg:w-1/2 w-full lg:px-20 px-5 mt-5">
              <h2 className=" text-2xl font-medium">Your Profile</h2>
              <FormUser user={user} />
            </div>
          </div>
        </div>
      </Drawer>
    </main>
  );
}
