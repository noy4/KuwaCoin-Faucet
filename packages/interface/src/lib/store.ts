import { PUBLIC_MASTER_KUWA_ADDRESS } from '$env/static/public'
import type { BigNumber, Wallet } from 'ethers'
import { writable, type Writable } from 'svelte/store'
import { kuwaCoin, masterKuwa, wallet } from './contracts'
import type { KuwaCoin } from './typechain-types'
import { useFetch, type UseFetchOptions } from './useFetch'

let $wallet: Wallet | undefined
let $kuwaCoin: KuwaCoin

wallet.subscribe((value) => {
  $wallet = value
})
kuwaCoin.subscribe((value) => {
  $kuwaCoin = value
})

const kwcBalance = writable<BigNumber | undefined>()
const totalSupply = writable<BigNumber | undefined>()
const masterKuwaBalance = writable<BigNumber | undefined>()
const givenCount = writable<BigNumber | undefined>()

export function useBalance(
  options: UseFetchOptions<BigNumber | undefined> = {}
) {
  const fetch = () => $kuwaCoin.balanceOf($wallet?.address || '')
  return useFetch(fetch, {
    data: kwcBalance,
    ...options,
  })
}
export function useTotalSupply() {
  return useFetch($kuwaCoin.totalSupply, { data: totalSupply })
}
export function useGivenCount() {
  return useFetch(masterKuwa.givenCount, { data: givenCount })
}
export function useMasterKuwaBalance() {
  const fetch = () => $kuwaCoin.balanceOf(PUBLIC_MASTER_KUWA_ADDRESS)
  return useFetch(fetch, {
    data: masterKuwaBalance,
  })
}
