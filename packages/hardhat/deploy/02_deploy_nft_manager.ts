import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployNFTManager: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  // Obtener las cuentas que se usarán para el despliegue
  const { deployer } = await getNamedAccounts();

  const nftManager = await deploy("NFTManager", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log("NFTManager deployed at:", nftManager.address);
};

export default deployNFTManager;
deployNFTManager.tags = ["NFTManager"];
