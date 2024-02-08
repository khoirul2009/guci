import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, comment } = body;

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      secure: true,
      service: "Gmail",
    });

    await transporter.sendMail({
      to: {
        name: "Gu-Tix ",
        address: "wisataguci00@gmail.com",
      },
      from: {
        name: name,
        address: email,
      },
      subject: `Message From : khoirulafwan20@gmail.com`,
      text: comment,
    });

    return NextResponse.json({ message: "Email sended" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
