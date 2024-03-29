"use client";

import { formatter } from "@/lib/utlis";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ButtonPayment({ order, user }) {
  const [token, setToken] = useState("");

  const [snap, setSnap] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && snap) {
      embed(token);
      setToken("");
    } else if (snap) {
      const localToken = localStorage.getItem(order.id);
      embed(localToken);
    }
  }, [snap, token]);

  async function embed(token) {
    setTimeout(() => {
      window.snap.embed(token, {
        onSuccess: (result) => {
          console.log(result);
          setToken("");
        },
        onPending: (result) => {
          localStorage.setItem(order.id, token);
          setToken("");
        },
        onError: function (result) {
          console.log("error");
          console.log(result);
          setToken("");
        },
        onClose: () => {
          console.log("Anda belum menyelesaikan pembayaran");
          setToken("");
        },
        embedId: "snap-container",
      });
    }, 500);
  }

  useEffect(() => {
    const midtransURL = "https://app.midtrans.com/snap/snap.js";
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransURL;

    const midtransClientKey = process.env.MIDTRANS_CLIENT_KEY || "";
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    setSnap(true);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(() => {
    const localToken = localStorage.getItem(order.id);
    if (snap == true && order.status == "unpaid" && localToken == null) {
      handlePay();
    }
  }, [snap]);

  const handlePay = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/payment",
        {
          order: order,
          name: user.name,
          amount: order.grandTotal + order.grandTotal * 0.1,
          email: user.email,
          phone: user.noTelp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToken(response.data.token);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 flex justify-between py-2 items-center">
      {loading ? (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="animate-spin rounded-full border-t-4  border-opacity-75 border-r-4 border-b-4 border-gray-300 h-16 w-16"></div>
          </div>
        </>
      ) : (
        ""
      )}
      <h2 className="text-2xl">Grand Total</h2>
      <p>{formatter.format(order.grandTotal + order.grandTotal * 0.1)} </p>
    </div>
  );
}
