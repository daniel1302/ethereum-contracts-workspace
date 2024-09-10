require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");


const { ARBITRUM_API_URL, ETHEREUM_API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;
/**

* @type import('hardhat/config').HardhatUserConfig

*/

module.exports = {

  solidity: {
    compilers: [
      {
        version: "0.8.8",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },

   defaultNetwork: "arbitrum_sepolia",

   networks: {
      hardhat: {},

      arbitrum_sepolia: {
         url: ARBITRUM_API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      },
      sepolia: {
        url: ETHEREUM_API_URL,
        accounts: [`0x${PRIVATE_KEY}`]
     }
   },

    etherscan: {
      apiKey: ETHERSCAN_API_KEY,
      customChains: [
        {
          network: "arbitrum_sepolia",
          chainId: 421614,
          urls: {
            apiURL: "https://api-sepolia.arbiscan.io/api",
            browserURL: "https://sepolia.arbiscan.io/"
          }
        },
        {
          network: "sepolia",
          chainId: 11155111,
          urls: {
            apiURL: "https://api-sepolia.etherscan.io/api",
            browserURL: "https://sepolia.etherscan.io/"
          }
        }
      ]
    },

    sourcify: {
      enabled: true
    }

}