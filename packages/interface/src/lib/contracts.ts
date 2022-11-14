import { Faucet__factory, KuwaCoin__factory } from '$lib/typechain-types'
import { ethers, type Wallet } from 'ethers'
import { derived, writable } from 'svelte/store'

export const wallet = writable<Wallet | undefined>()
export const provider = new ethers.providers.JsonRpcProvider()
const signerOrProvider = derived(wallet, ($signer) => $signer || provider)

export const KUWA_COIN_ADDRESS = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512'
export const kuwaCoin = derived(signerOrProvider, ($signerOrProvider) =>
  $signerOrProvider
    ? KuwaCoin__factory.connect(KUWA_COIN_ADDRESS, $signerOrProvider)
    : undefined
)

export const DEV_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
export const DEV_PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
export const FAUCET_ADDRESS = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
export const devWallet = new ethers.Wallet(DEV_PRIVATE_KEY, provider)
export const faucet = Faucet__factory.connect(FAUCET_ADDRESS, devWallet)
