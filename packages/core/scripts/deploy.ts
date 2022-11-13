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
  const [owner] = await ethers.getSigners()

  const KuwaCoin = await ethers.getContractFactory('KuwaCoin')
  const kuwaCoin = await KuwaCoin.deploy(ethers.utils.parseEther('100000'))

  const Faucet = await ethers.getContractFactory('Faucet')
  const faucet = await Faucet.deploy(kuwaCoin.address, owner.address)

  await kuwaCoin.transfer(faucet.address, ethers.utils.parseEther('100000'))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
