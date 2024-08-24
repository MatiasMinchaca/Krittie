import { getDonationManagerContract } from "../../utils/contracts";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

interface DonationRequestBody {
  amount: string;
  tokenType: "WLD" | "USDC";
}

interface DonationResponseBody {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<DonationResponseBody>) {
  try {
    if (req.method === "POST") {
      const { amount, tokenType }: DonationRequestBody = req.body;

      // Validaciones
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        return res.status(400).json({ success: false, error: "Invalid amount" });
      }
      if (!tokenType || !["WLD", "USDC"].includes(tokenType)) {
        return res.status(400).json({ success: false, error: "Invalid token type" });
      }

      // Configura tu proveedor y signer
      const provider = new ethers.JsonRpcProvider("URL_DEL_RPC");
      const signer = await provider.getSigner(); // Usa await para resolver el Promise

      // Obtén el contrato
      const donationContract = getDonationManagerContract(signer);

      let tx;
      if (tokenType === "WLD") {
        tx = await donationContract.donateWLD(amount);
      } else if (tokenType === "USDC") {
        tx = await donationContract.donateUSDC(amount);
      }

      await tx.wait(); // Espera a que la transacción sea confirmada
      res.status(200).json({ success: true, transactionHash: tx.hash });
    } else {
      res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
}
