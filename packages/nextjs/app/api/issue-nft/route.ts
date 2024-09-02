// Ruta: /app/api/issue-nft/route.ts
import { NextResponse } from "next/server";
import { CONFIG } from "../../../utils/config";
import { getNFTManagerContract } from "../../../utils/contracts";
import { ethers } from "ethers";

// Asegúrate de importar la configuración correctamente

export async function GET(req: Request) {
  try {
    // Obtener parámetros de la consulta
    const { searchParams } = new URL(req.url);
    const animalId = searchParams.get("animalId") || "1"; // Valor por defecto
    const action = searchParams.get("action") || "vacunacion"; // Valor por defecto
    const metadataURI = searchParams.get("metadataURI") || "ipfs://default-metadata-uri"; // Valor por defecto

    // Configuración del provider y signer
    const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
    const signer = provider.getSigner();

    // Obtener el contrato NFTManager
    const nftManagerContract = getNFTManagerContract(await signer);

    // Llamada para emitir el NFT
    const tx = await nftManagerContract.issueNFT(animalId, action, metadataURI);
    const receipt = await tx.wait();

    // Respuesta exitosa
    return NextResponse.json({
      success: true,
      txHash: tx.hash,
      receipt: receipt,
      message: `NFT emitido exitosamente. Hash de la transacción: ${tx.hash}`,
    });
  } catch (error: any) {
    console.error("Error al emitir NFT:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Error desconocido",
    });
  }
}
