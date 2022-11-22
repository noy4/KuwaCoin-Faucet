import { ethers } from 'hardhat'

async function main() {
  const [owner] = await ethers.getSigners()

  const KuwaCoin = await ethers.getContractFactory('KuwaCoin')
  const kuwaCoin = await KuwaCoin.connect(owner).deploy(
    ethers.utils.parseEther('100000')
  )

  const Faucet = await ethers.getContractFactory('Faucet')
  const faucet = await Faucet.connect(owner).deploy(
    kuwaCoin.address,
    owner.address
  )
  console.log('deployed:', {
    kuwaCoin: kuwaCoin.address,
    faucet: faucet.address,
  })

  await kuwaCoin.transfer(faucet.address, ethers.utils.parseEther('100000'))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
