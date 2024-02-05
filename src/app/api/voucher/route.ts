import { prisma } from "@/lib/database";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { v4 as uuid } from "uuid";

export async function GET(req: NextRequest) {
  try {
    const vouchers = await prisma.voucher.findMany();

    return NextResponse.json({
      data: vouchers,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const name = form.get("name") as string;
    const point = form.get("point") as unknown as string;
    const image = form.get("image") as unknown as File;

    const fileSize = image.size;
    const ext = path.extname(image.name);
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

    const { data, error }: { data: any; error: any } = await supabase.storage
      .from("upload-images")
      .upload(`voucher/${fileName}`, image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      return NextResponse.json(
        { message: `Error upload image: ${error.message}` },
        { status: error.statusCode }
      );
    }

    const newVoucher = await prisma.voucher.create({
      data: {
        imagePath: data.path,
        name,
        point: parseInt(point),
        popularity: 0,
        id: `voucher-${uuid()}`,
      },
    });
    return NextResponse.json(
      { message: "Voucher success created!", data: newVoucher },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}
