"use client";

import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function ScanPage() {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (result: any) => {
    if (result?.text) {
      setData(result.text);
      try {
        const url = new URL(result.text);
        const animalId = url.searchParams.get("animalId") || "1"; // Valor por defecto
        const action = url.searchParams.get("action") || "vacunacion"; // Valor por defecto
        const metadataURI = url.searchParams.get("metadataURI") || "ipfs://default-metadata-uri"; // Valor por defecto

        // Llamada a la API para emitir el NFT
        const response = await fetch(`/api/issue-nft?animalId=${animalId}&action=${action}&metadataURI=${metadataURI}`);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Error desconocido al emitir el NFT");
        }

        // Mostrar el NFT (o POAP) en la página
        alert(`NFT emitido exitosamente: ${data.txHash}`);
        // Aquí puedes agregar más lógica para mostrar el NFT en la página, si es necesario
      } catch (err) {
        setError("Error al procesar el QR o emitir el NFT: " + err);
      }
    } else {
      setError("Error datos de QR incompletos");
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    setError("Error al acceder a la cámara o al leer el QR");
  };

  return (
    <div>
      <h1>Escanear QR para emitir NFT</h1>
      <QrReader
        onResult={handleScan}
        constraints={{ facingMode: "environment" }}
        onError={handleError}
        style={{ width: "100%" }}
      />
      {data && <p>Datos escaneados: {data}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
