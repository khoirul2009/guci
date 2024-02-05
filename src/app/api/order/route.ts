import { prisma } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page: string = searchParams.get("page") || "1";
  const perPage: string = searchParams.get("per_page") || "5";

  const pageInt = parseInt(page);
  const perPageInt = parseInt(perPage);

  try {
    const length = await prisma.order.count();
    const orders = await prisma.order.findMany({
      skip: (pageInt - 1) * perPageInt,
      take: perPageInt,
      include: {
        user: true,
      },
    });

    return NextResponse.json({
      data: orders,
      totalPage: Math.ceil(length / perPageInt),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Erro!" },
      { status: 500 }
    );
  } finally {
    prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    email,
    fullName,
    noWa,
    gender,
    province,
    birthdate,
    grandTotal,
    productId,
    quantity,
    userId,
  } = body;

  try {
    const order = await prisma.order.create({
      data: {
        birthdate: new Date(birthdate),
        email,
        fullName,
        noWa,
        gender,
        quantity,
        province,
        grandTotal,
        productId,
        userId,
        status: "unpaid",
        id: `order-${v4()}`,
      },
    });

    return NextResponse.json(
      { message: "Order success created!", order },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Erro!" },
      { status: 500 }
    );
  }
}
