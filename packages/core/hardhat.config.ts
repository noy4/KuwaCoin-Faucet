import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import dotenv from 'dotenv'
dotenv.config()

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  networks: {
    sepolia: {
      url: 'https://sepolia.infura.io/v3/6959e2068d034bf3a1855ba1fd1ec3cd',
      accounts: [process.env.HELPER_PRIVATE_KEY || ''],
    },
  },
}

export default config
