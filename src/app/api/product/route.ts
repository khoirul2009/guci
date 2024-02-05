import { prisma } from "@/lib/database";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { v4 as uuid } from "uuid";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const parsedPage = parseInt(searchParams.get("page") || "1");
    const parsedSize = parseInt(searchParams.get("size") || "5");
    const query = searchParams.get("query") || "";

    const count = await prisma.product.count();

    const data = await prisma.product.findMany({
      skip: (parsedPage - 1) * parsedSize,
      take: parsedSize,
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return NextResponse.json({
      data,
      pages: Math.ceil(count / parsedSize),
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error!",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const name = form.get("name") as string;
    const price = form.get("price") as unknown as string;
    const available = form.get("available") as unknown as string;
    const image = form.get("image") as unknown as File;
    const description = form.get("description") as unknown as string;

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

    const { data, error } = await supabase.storage
      .from("upload-images")
      .upload(`product/${fileName}`, image);

    if (!data?.path) {
      return NextResponse.json(
        { message: "Error upload image" },
        { status: 500 }
      );
    }
    const newProduct = await prisma.product.create({
      data: {
        id: `product-${uuid()}`,
        available: available === "false" ? false : true,
        name,
        price: parseInt(price),
        description,
        imagePath: data.path,
      },
    });

    return NextResponse.json(
      { message: "Success create new product", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}
