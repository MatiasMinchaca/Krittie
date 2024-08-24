import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployShelterDonation: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const wldTokenAddress = "0x..."; // Dirección del token WLD
  const usdcTokenAddress = "0x..."; // Dirección del token USDC
  const shelterAddress = "0x..."; // Dirección del refugio

  await deploy("ShelterDonation", {
    from: deployer,
    args: [shelterAddress, wldTokenAddress, usdcTokenAddress],
    log: true,
  });
};

export default deployShelterDonation;
deployShelterDonation.tags = ["ShelterDonation"];
