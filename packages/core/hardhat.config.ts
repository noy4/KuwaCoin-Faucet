import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  networks: {
    sepolia: {
      url: 'https://sepolia.infura.io/v3/6959e2068d034bf3a1855ba1fd1ec3cd',
      accounts: [
        '0xe7e0be15428062a757a7ca7fbcba5f69848347545403d48b813740e42999ab77',
      ],
    },
  },
}

export default config
