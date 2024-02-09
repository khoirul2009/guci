import { prisma } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import chromium from "@sparticuz/chromium";
import hbs from "handlebars";
import fs from "fs-extra";
import path from "path";
import puppeteer from "puppeteer-core";

const compile = async function name(templateName: string, order: any) {
  hbs.registerHelper("each", function (n, block) {
    let accum = "";
    for (let i = 0; i < n; ++i) accum += block.fn(i);
    return accum;
  });

  const filePath = path.join(process.cwd(), "", `${templateName}.hbs`);

  const html = await fs.readFileSync(filePath, "utf-8");

  return hbs.compile(html)(order);
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transaction_status, order_id } = body;

    const order = await prisma.order.update({
      data: { status: transaction_status },
      where: { id: order_id },
      include: {
        product: true,
      },
    });

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar"
      ),
      headless: true,
    });
    const page = await browser.newPage();
    const content = await compile("template_invoice", order);

    await page.setContent(content);

    const pdf = await page.pdf({
      format: "A5",
      printBackground: true,
    });

    console.log("Invoice has ben created");

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

    transporter.sendMail(
      {
        from: process.env.EMAIL,
        to: order.email,
        subject: `Invoice & Ticket from Gu-Tix`,
        text: "Terima kasih telah memilih Gu-Tix sebagai tempat pembelian tiket onlineuntuk wisata Guci semoga liburan anda menyenangkan.",
        attachments: [
          {
            filename: `${order.id}.pdf`,
            content: pdf,
          },
        ],
      },
      (err, info) => {
        if (err) console.log(err);
        else {
          console.log(info);
          fs.unlinkSync(`/tmp/generated-pdf/${order?.id}.pdf`);
        }
      }
    );

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
