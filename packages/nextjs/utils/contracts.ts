// utils/contracts.ts
import NFTManagerABI from "./abis/NFTManager.json";
import ShelterDonationABI from "./abis/ShelterDonation.json";
import { ethers } from "ethers";

const nftManagerAddress = "0x976EA74026E726554dB657fA54763abd0C3a0aa9"; // Dirección del contrato desplegado de NFTManager
const donationManagerAddress = "0x..."; // Dirección del contrato desplegado de ShelterDonation (reemplaza esto con la dirección correcta)

export const getNFTManagerContract = (providerOrSigner: ethers.Signer | ethers.Provider) => {
  return new ethers.Contract(nftManagerAddress, NFTManagerABI.abi, providerOrSigner);
};

export const getDonationManagerContract = (providerOrSigner: ethers.Signer | ethers.Provider) => {
  return new ethers.Contract(donationManagerAddress, ShelterDonationABI.abi, providerOrSigner);
};
