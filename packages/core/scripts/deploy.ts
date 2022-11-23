import { ethers } from 'hardhat'

async function main() {
  const [owner] = await ethers.getSigners()

  const KuwaCoin = await ethers.getContractFactory('KuwaCoin')
  const kuwaCoin = await KuwaCoin.connect(owner).deploy(
    ethers.utils.parseEther('100000')
  )

  const MasterKuwa = await ethers.getContractFactory('MasterKuwa')
  const masterKuwa = await MasterKuwa.connect(owner).deploy(
    kuwaCoin.address,
    owner.address
  )
  console.log('deployed:', {
    kuwaCoin: kuwaCoin.address,
    masterKuwa: masterKuwa.address,
  })

  await kuwaCoin.transfer(masterKuwa.address, ethers.utils.parseEther('100000'))
  const HELPER_ADDRESS = '0x64be755e78ee1edade7e3590e1591a3707ce9d0c'
  owner.sendTransaction({
    to: HELPER_ADDRESS,
    value: ethers.utils.parseEther('2000'),
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
