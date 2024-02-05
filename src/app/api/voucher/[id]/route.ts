import { prisma } from "@/lib/database";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const oldData = await prisma.voucher.findUnique({
      where: { id: params.id },
    });

    if (!oldData)
      return NextResponse.json(
        { message: "Voucher not found!" },
        { status: 404 }
      );

    const { data, error }: { data: any; error: any } = await supabase.storage
      .from("upload-images")
      .remove([oldData.imagePath]);

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: error.statusCode }
      );
    }
    await prisma.voucher.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "Voucher success deleted!" });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error!",
      },
      {
        status: 500,
      }
    );
  }
}
