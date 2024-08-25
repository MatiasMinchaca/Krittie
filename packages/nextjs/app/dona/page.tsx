'use client'

import DonateToKrittie from '~~/components/donate-to-krittie';
import { MiniKit, tokenToDecimals, Tokens, PayCommandInput, ResponseEvent, MiniAppPaymentPayload } from '@worldcoin/minikit-js'
import { useEffect } from 'react';

export default function DonaPage() {
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
            body: JSON.stringify(response),
          });
          const payment = await res.json();
          if (payment.success) {
            // Congrats your payment was successful!
          }
        }
      }
    );

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppPayment);
    };
  }, []);

  return (
    <div className="px-2">
      <p>Dona a nuestro refugio</p>
      <DonateToKrittie />
    </div>
  )
}