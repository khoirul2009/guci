import { prisma } from "@/lib/database";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await prisma.post.findUnique({ where: { id: params.id } });

    if (!data) {
      return NextResponse.json({ message: "Data not found!" }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const form = await req.formData();

    const title = form.get("title") as string;
    const author = form.get("author") as unknown as string;
    const description = form.get("description") as unknown as string;
    const thumbnail = form.get("thumbnail") as any;

    const oldData = await prisma.post.findUnique({
      where: { id: params.id },
    });

    if (thumbnail !== "null") {
      const fileSize = thumbnail.size;
      const ext = path.extname(thumbnail.name);
      const allowedType = [".png", ".jpeg", ".jpg"];

      if (!allowedType.includes(ext.toLowerCase()))
        return NextResponse.json(
          { message: "Invalid file type" },
          { status: 422 }
        );
      if (fileSize > 3000000)
        return NextResponse.json(
          { message: "Image must be less than 1 mb" },
          { status: 422 }
        );

      if (oldData === null)
        return NextResponse.json(
          {
            message: "Post not found!",
          },
          {
            status: 404,
          }
        );

      const { data, error }: { data: any; error: any } = await supabase.storage
        .from("upload-images")
        .update(oldData.thumbnailPath, thumbnail);
      if (error) {
        return NextResponse.json(
          {
            message: `Image upload error : ${error.message}`,
          },
          {
            status: error.statusCode,
          }
        );
      }

      const updated = await prisma.post.update({
        data: {
          title,
          author,
          description,
          thumbnailPath: data.path,
        },
        where: { id: params.id },
      });
      return NextResponse.json({
        message: "Post success updated",
      });
    }

    const updated = await prisma.post.update({
      data: {
        title,
        author,
        description,
      },
      where: { id: params.id },
    });
    return NextResponse.json({
      message: "Post success updated",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const oldData = await prisma.post.findUnique({ where: { id: params.id } });

    if (!oldData) {
      return NextResponse.json({ message: "Not found!" }, { status: 404 });
    }

    const { data, error }: { data: any; error: any } = await supabase.storage
      .from("upload-images")
      .remove([oldData.thumbnailPath]);
    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: error.statusCode }
      );
    }
    await prisma.post.delete({ where: { id: params.id } });

    return NextResponse.json(
      { message: "Post success deleted!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}
