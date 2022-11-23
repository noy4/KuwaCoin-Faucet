import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('MasterKuwa', () => {
  const deployMasterKuwaFixture = async () => {
    const [owner, otherAccount] = await ethers.getSigners()

    const KuwaCoin = await ethers.getContractFactory('KuwaCoin')
    const kuwaCoin = await KuwaCoin.deploy(ethers.utils.parseEther('100000'))
    const MasterKuwa = await ethers.getContractFactory('MasterKuwa')
    const masterKuwa = await MasterKuwa.deploy(kuwaCoin.address, owner.address)
    await kuwaCoin.transfer(
      masterKuwa.address,
      ethers.utils.parseEther('100000')
    )
    return { kuwaCoin, masterKuwa, owner, otherAccount }
  }

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      const { masterKuwa, owner } = await loadFixture(deployMasterKuwaFixture)
      expect(await masterKuwa.owner()).to.equal(owner.address)
    })

    it('Should have 2000 KuwaCoin', async () => {
      const { kuwaCoin, masterKuwa } = await loadFixture(
        deployMasterKuwaFixture
      )
      expect(await kuwaCoin.balanceOf(masterKuwa.address)).to.equal(
        ethers.utils.parseEther('100000')
      )
    })
  })

  describe('Send', () => {
    it('Should send KuwaCoin', async () => {
      const { kuwaCoin, masterKuwa, owner, otherAccount } = await loadFixture(
        deployMasterKuwaFixture
      )
      await masterKuwa.connect(owner).requestTokens(otherAccount.address)
      expect(await kuwaCoin.balanceOf(otherAccount.address)).to.equal(
        ethers.utils.parseEther('5000')
      )
    })
  })
})
