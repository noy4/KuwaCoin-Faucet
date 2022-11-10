import { ethers } from 'hardhat'

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000)
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS

  const lockedAmount = ethers.utils.parseEther('1')

  const Lock = await ethers.getContractFactory('Lock')
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount })

  await lock.deployed()

  console.log(
    `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  )

  //
  const accounts = await ethers.getSigners()
  const deployer = accounts[0].address

  const KuwaCoin = await ethers.getContractFactory('KuwaCoin')
  const kuwaCoin = await KuwaCoin.deploy(ethers.utils.parseEther('2000'))

  const Faucet = await ethers.getContractFactory('Faucet')
  const faucet = await Faucet.deploy(kuwaCoin.address, deployer)

  await kuwaCoin.transfer(faucet.address, ethers.utils.parseEther('2000'))
  console.log('balance:', await kuwaCoin.balanceOf(faucet.address))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
