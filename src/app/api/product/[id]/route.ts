import { prisma } from "@/lib/database";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await prisma.product.findUnique({ where: { id: params.id } });

    return NextResponse.json({
      data,
    });
  } catch (error) {
    console.error(error);
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const form = await req.formData();

    const name = form.get("name") as string;
    const price = form.get("price") as unknown as string;
    const available = form.get("available") as unknown as string;
    const image = form.get("image") as any;
    const description = form.get("description") as unknown as string;

    const oldData = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (oldData === null)
      return NextResponse.json(
        {
          message: "User not found!",
        },
        {
          status: 404,
        }
      );

    if (image !== "null") {
      const fileSize = image.size;
      const ext = path.extname(image.name);
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
        .update(oldData.imagePath, image);

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

      const updated = await prisma.product.update({
        data: {
          available: available === "false" ? false : true,
          name,
          price: parseInt(price),
          imagePath: data.path,
          description,
        },
        where: { id: params.id },
      });
      return NextResponse.json({
        message: "Product success updated",
      });
    }

    const updated = await prisma.product.update({
      data: {
        available: available === "false" ? false : true,
        name,
        price: parseInt(price),
        description,
      },
      where: { id: params.id },
    });
    return NextResponse.json({
      message: "Product success updated",
    });
  } catch (error) {
    console.error(error);
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { imagePath } = body;

    const { data, error } = await supabase.storage
      .from("upload-images")
      .remove(imagePath);

    if (!error) {
      await prisma.product.delete({
        where: { id: params.id },
      });
    }

    return NextResponse.json(
      {
        message: "Product success deleted!",
      },
      {
        status: 200,
      }
    );
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
