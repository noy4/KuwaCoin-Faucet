import {
  PUBLIC_HELPER_PRIVATE_KEY,
  PUBLIC_KUWA_COIN_ADDRESS,
  PUBLIC_MASTER_KUWA_ADDRESS,
  PUBLIC_PROVIDER_URL,
} from '$env/static/public'
import { MasterKuwa__factory, KuwaCoin__factory } from '$lib/typechain-types'
import { ethers, type Wallet } from 'ethers'
import { derived, writable } from 'svelte/store'

export const wallet = writable<Wallet | undefined>()
export const provider = new ethers.providers.JsonRpcProvider(
  PUBLIC_PROVIDER_URL
)
const signerOrProvider = derived(wallet, ($signer) => $signer || provider)

export const kuwaCoin = derived(signerOrProvider, ($signerOrProvider) =>
  KuwaCoin__factory.connect(PUBLIC_KUWA_COIN_ADDRESS, $signerOrProvider)
)

export const helperWallet = new ethers.Wallet(
  PUBLIC_HELPER_PRIVATE_KEY,
  provider
)
export const masterKuwa = MasterKuwa__factory.connect(
  PUBLIC_MASTER_KUWA_ADDRESS,
  helperWallet
)
