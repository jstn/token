import { HardhatUserConfig } from "hardhat/config";
import { config as dotenvConfig } from "dotenv";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-erc1820";

dotenvConfig({
  path: `${process.cwd()}/.env`
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
    settings: {
      metadata: {
        bytecodeHash: "none"
      },
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`${process.env.WALLET_PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: `${process.env.ETHERSCAN_API_KEY}`
  }
};

export default config;
