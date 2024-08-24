import NFTManagerABI from "../../hardhat/artifacts/contracts/NFTManager.sol/NFTManager.json";
import ShelterDonationABI from "../../hardhat/artifacts/contracts/ShelterDonation.sol/ShelterDonation.json";
import { ethers } from "ethers";

const nftManagerAddress = "0x..."; // Dirección del contrato desplegado de NFTManager
const donationManagerAddress = "0x..."; // Dirección del contrato desplegado de DonationManager

export const getNFTManagerContract = (providerOrSigner: ethers.Signer | ethers.Provider) => {
  return new ethers.Contract(nftManagerAddress, NFTManagerABI.abi, providerOrSigner);
};

export const getDonationManagerContract = (providerOrSigner: ethers.Signer | ethers.Provider) => {
  return new ethers.Contract(donationManagerAddress, ShelterDonationABI.abi, providerOrSigner);
};
