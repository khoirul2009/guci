import midtransClient from "midtrans-client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { orderId, name, amount, email, phone } = body;

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const paramters = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      customer_details: {
        first_name: name,
        email,
        phone,
      },
      enabled_payments: [
        "bca_va",
        "bni_va",
        "bri_va",
        "gopay",
        "indomaret",
        "echannel",
        "shopeepay",
      ],
    };

    const transaction = await snap.createTransaction(paramters);
    const dataPayment = {
      response: JSON.stringify(transaction),
    };
    const token = transaction.token;
    return NextResponse.json({
      message: "Success",
      dataPayment,
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.ApiResponse.error_messages },
      { status: error.httpStatusCode }
    );
  }
}
