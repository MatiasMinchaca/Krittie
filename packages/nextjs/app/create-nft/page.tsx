"use client";

import { useState } from "react";
import QRCode from "qrcode.react"; // Instalar la librería con `yarn add qrcode.react`
import axios from "axios";

export default function CreateNFT() {
  const [animalId, setAnimalId] = useState("");
  const [action, setAction] = useState("");
  const [metadataURI, setMetadataURI] = useState("");
  const [qrData, setQrData] = useState("");

  const handleGenerateQR = async () => {
    const data = { animalId, action, metadataURI };
    
    // Generar la URL que interactúa con el backend para crear el NFT
    const qrCodeData = `${window.location.origin}/api/issue-nft?animalId=${animalId}&action=${action}&metadataURI=${metadataURI}`;
    setQrData(qrCodeData);
  };

  return (
    <div>
      <h1>Generar NFT para el refugio</h1>
      <form>
        <input
          type="text"
          placeholder="ID del Animal"
          value={animalId}
          onChange={(e) => setAnimalId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Acción (ej. vacunación)"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        />
        <input
          type="text"
          placeholder="Metadata URI"
          value={metadataURI}
          onChange={(e) => setMetadataURI(e.target.value)}
        />
        <button type="button" onClick={handleGenerateQR}>
          Generar QR
        </button>
      </form>

      {qrData && (
        <div>
          <h3>Escanea el QR para crear el NFT:</h3>
          <QRCode value={qrData} size={200} />
        </div>
      )}
    </div>
  );
}
