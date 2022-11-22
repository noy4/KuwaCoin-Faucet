import { PUBLIC_PROVIDER_URL } from '$env/static/public'
import { Faucet__factory, KuwaCoin__factory } from '$lib/typechain-types'
import { ethers, type Wallet } from 'ethers'
import { derived, writable } from 'svelte/store'

export const wallet = writable<Wallet | undefined>()
export const provider = new ethers.providers.JsonRpcProvider(
  PUBLIC_PROVIDER_URL
)
const signerOrProvider = derived(wallet, ($signer) => $signer || provider)

export const KUWA_COIN_ADDRESS = '0xB152A6695026187c6693614B788959B3d9B76186'
export const kuwaCoin = derived(signerOrProvider, ($signerOrProvider) =>
  $signerOrProvider
    ? KuwaCoin__factory.connect(KUWA_COIN_ADDRESS, $signerOrProvider)
    : undefined
)

export const HELPER_ADDRESS = '0x64Be755E78eE1eDaDe7e3590E1591A3707cE9d0c'
export const HELPER_PRIVATE_KEY =
  '0xe7e0be15428062a757a7ca7fbcba5f69848347545403d48b813740e42999ab77'
export const FAUCET_ADDRESS = '0xAfa1ECdBA51E114b8618BCe459DBfc5921E06d44'
export const helperWallet = new ethers.Wallet(HELPER_PRIVATE_KEY, provider)
export const faucet = Faucet__factory.connect(FAUCET_ADDRESS, helperWallet)
