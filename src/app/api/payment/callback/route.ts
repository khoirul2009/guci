import { prisma } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transaction_status, order_id } = body;

    if (transaction_status !== "settlement") {
      await fetch(`https://api.sandbox.midtrans.com/v2/${order_id}/cancel`);
      return NextResponse.json({}, { status: 403 });
    }
    await prisma.order.update({
      data: { status: "paid" },
      where: { id: order_id },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
