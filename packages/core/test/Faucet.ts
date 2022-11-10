import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('Faucet', () => {
  const deployFaucetFixture = async () => {
    const [owner, otherAccount] = await ethers.getSigners()

    const KuwaCoin = await ethers.getContractFactory('KuwaCoin')
    const kuwaCoin = await KuwaCoin.deploy(ethers.utils.parseEther('100000'))
    const Faucet = await ethers.getContractFactory('Faucet')
    const faucet = await Faucet.deploy(kuwaCoin.address, owner.address)
    await kuwaCoin.transfer(faucet.address, ethers.utils.parseEther('100000'))
    return { kuwaCoin, faucet, owner, otherAccount }
  }

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      const { faucet, owner } = await loadFixture(deployFaucetFixture)
      expect(await faucet.owner()).to.equal(owner.address)
    })

    it('Should have 2000 KuwaCoin', async () => {
      const { kuwaCoin, faucet } = await loadFixture(deployFaucetFixture)
      expect(await kuwaCoin.balanceOf(faucet.address)).to.equal(
        ethers.utils.parseEther('100000')
      )
    })
  })

  describe('Send', () => {
    it('Should send KuwaCoin', async () => {
      const { kuwaCoin, faucet, otherAccount } = await loadFixture(
        deployFaucetFixture
      )
      await faucet.connect(otherAccount).requestTokens()
      expect(await kuwaCoin.balanceOf(otherAccount.address)).to.equal(
        ethers.utils.parseEther('5000')
      )
    })
  })
})
