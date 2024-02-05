import { prisma } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import path from "path";
import { supabase } from "@/lib/supabase";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await req.formData();
    const file: File | any = formData.get("photo") as unknown as File;

    if (!file) {
      return NextResponse.json(
        { message: "Please upload the image" },
        { status: 403 }
      );
    }

    const fileSize = file.size;
    const ext = path.extname(file.name);
    const fileName = `image-${uuid()}` + ext;
    const allowedType = [".png", ".jpeg", ".jpg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return NextResponse.json(
        { message: "Invalid file type" },
        { status: 422 }
      );
    if (fileSize > 1000000)
      return NextResponse.json(
        { message: "Image must be less than 1 mb" },
        { status: 422 }
      );

    const user = await prisma.user.findUnique({ where: { id: params.id } });

    if (user?.image !== null) {
      const { data, error } = await supabase.storage
        .from("upload-images")
        .remove([user?.image!]);
    }
    const { data, error } = await supabase.storage
      .from("upload-images")
      .upload(`photoProfile/${fileName}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    const updated = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        image: data?.path,
      },
    });

    return NextResponse.json({
      message: "Photo success updated",
      user: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}
