// Ruta: /app/api/issue-nft/route.ts
import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { getNFTManagerContract } from '../../../utils/contracts';
import { CONFIG } from '../../../utils/config'; // Asegúrate de importar la configuración correctamente

export async function GET(req: Request) {
  try {
    // Obtener parámetros de la consulta
    const { searchParams } = new URL(req.url);
    let animalId = searchParams.get('animalId') || '1'; // Valor por defecto
    let action = searchParams.get('action') || 'vacunacion'; // Valor por defecto
    let metadataURI = searchParams.get('metadataURI') || 'ipfs://default-metadata-uri'; // Valor por defecto

    // Configuración del provider y signer
    const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
    const signer = provider.getSigner(CONFIG.ADMIN_ADDRESS);

    // Obtener el contrato NFTManager
    const nftManagerContract = getNFTManagerContract(await signer, CONFIG.NFT_MANAGER_CONTRACT_ADDRESS, provider);

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
  } catch (error) {
    console.error('Error al emitir NFT:', error);
    return NextResponse.json({
      success: false,
      error: error || 'Error desconocido',
    });
  }
}
