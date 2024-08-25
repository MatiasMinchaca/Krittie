"use client";
import {
  MiniKit,
  tokenToDecimals,
  Tokens,
  PayCommandInput,
  ResponseEvent,
  MiniAppPaymentPayload,
} from "@worldcoin/minikit-js";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from '~~/components/ui/button';

export default function DonateToKrittie() {
  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      console.error("MiniKit is not installed");
      return;
    }

    MiniKit.subscribe(
      ResponseEvent.MiniAppPayment,
      async (response: MiniAppPaymentPayload) => {
        if (response.status == "success") {
          const res = await fetch(`/api/confirm-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ payload: response }),
          });
          const payment = await res.json();
          if (payment.success) {
            toast.success("Transferencia exitosa!");
          } else {
            toast.error("Transferencia fallida");
          }
        }
      }
    );

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppPayment);
    };
  }, []);

  const sendPayment = async () => {
    const res = await fetch("/api/initiate-payment", {
      method: "POST",
    });
  
    const { id } = await res.json();
  
    console.log(id);
  
    const payload: PayCommandInput = {
      reference: id,
      to: "0xa6e75dfceb438e609b87997e67dbbf8fc0d5494f",
      tokens: [
        {
          symbol: Tokens.WLD,
          token_amount: tokenToDecimals(0.5, Tokens.WLD).toString(),
        },
        {
          symbol: Tokens.USDCE,
          token_amount: tokenToDecimals(0.1, Tokens.USDCE).toString(),
        },
      ],
      description: "Watch this is a test",
    };
  
    if (MiniKit.isInstalled()) {
      MiniKit.commands.pay(payload);
    }
  };

  return (
    <Button onClick={sendPayment}>
      Donar
    </Button>
  );
};