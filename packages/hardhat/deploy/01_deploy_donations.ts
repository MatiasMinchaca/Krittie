import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployShelterDonation: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const wldTokenAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"; // Direccion del token WLD
  const usdcTokenAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"; // Direccion del token USDC
  const shelterAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"; // Direccion del refugio

  await deploy("ShelterDonation", {
    from: deployer,
    args: [shelterAddress, wldTokenAddress, usdcTokenAddress],
    log: true,
  });
};

export default deployShelterDonation;
deployShelterDonation.tags = ["ShelterDonation"];
