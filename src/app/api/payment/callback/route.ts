import { prisma } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
// import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transaction_status, order_id } = body;

    await prisma.order.update({
      data: { status: transaction_status },
      where: { id: order_id },
    });
    return NextResponse.json({}, { status: 200 });

    // const transporter = nodemailer.createTransport({
    //   port: 465,
    //   host: "smtp.gmail.com",
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.PASSWORD,
    //   },
    //   secure: true,
    //   service: "Gmail",
    // });

    // transporter.sendMail(
    //   {
    //     from: process.env.EMAIL,
    //     to: "khoirulafwan20@gmail.com",
    //     subject: `Message From : khoirulafwan20@gmail.com`,
    //     text: " | Sent from: khoirulafwan20@gmail.com",
    //     html: `<div>Hai</div><p>Sent from:
    // khoirulafwan20@gmail.com</p>`,
    //   },
    //   (err, info) => {
    //     if (err) console.log(err);
    //     else console.log(info);
    //   }
    // );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
