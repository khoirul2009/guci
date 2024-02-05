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
    const count = await prisma.post.count();
    const post = await prisma.post.findMany({
      skip: (parsedPage - 1) * parsedSize,
      take: parsedSize,
    });

    return NextResponse.json(
      { data: post, pages: Math.ceil(count / parsedSize) },
      { status: 200 }
    );
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

    const title = form.get("title") as string;
    const author = form.get("author") as unknown as string;
    const description = form.get("description") as unknown as string;
    const image = form.get("image") as unknown as File;
    const category = form.get("category") as unknown as string;

    const fileSize = image.size;
    const ext = path.extname(image.name);
    const fileName = `image-${uuid()}` + ext;
    const allowedType = [".png", ".jpeg", ".jpg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return NextResponse.json(
        { message: "Invalid file type" },
        { status: 422 }
      );
    if (fileSize > 3000000)
      return NextResponse.json(
        { message: "Image must be less than 3 mb" },
        { status: 422 }
      );

    const { data, error }: { data: any; error: any } = await supabase.storage
      .from("upload-images")
      .upload(`thumbnail/${fileName}`, image);

    if (error) {
      return NextResponse.json(
        { message: `Error upload image: ${error.message}` },
        { status: error.statusCode }
      );
    }

    const newPost = await prisma.post.create({
      data: {
        author,
        id: `post-${uuid()}`,
        thumbnailPath: data.path,
        title,
        description,
        category,
      },
    });
    return NextResponse.json(
      { message: "Post success created!", data: newPost },
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
