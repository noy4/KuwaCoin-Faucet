import { PUBLIC_MASTER_KUWA_ADDRESS } from '$env/static/public'
import type { BigNumber, Wallet } from 'ethers'
import { writable } from 'svelte/store'
import { kuwaCoin, masterKuwa, wallet } from './contracts'
import type { KuwaCoin } from './typechain-types'
import type { TransferEvent } from './typechain-types/contracts/KuwaCoin'
import { useFetch, type UseFetchOptions } from './useFetch'

let $wallet: Wallet | undefined
let $kuwaCoin: KuwaCoin

wallet.subscribe((value) => {
  $wallet = value
})
kuwaCoin.subscribe((value) => {
  $kuwaCoin = value
})

const balance = writable<BigNumber | undefined>()
const totalSupply = writable<BigNumber | undefined>()
const masterKuwaBalance = writable<BigNumber | undefined>()
const givenCount = writable<BigNumber | undefined>()
const transfers = writable<TransferEvent[]>([])

export function useBalance(
  options: UseFetchOptions<BigNumber | undefined> = {}
) {
  const fetch = () => $kuwaCoin.balanceOf($wallet?.address || '')
  return useFetch(fetch, {
    data: balance,
    ...options,
  })
}
export function useTotalSupply() {
  return useFetch($kuwaCoin.totalSupply, { data: totalSupply })
}
export function useMasterKuwaBalance() {
  const fetch = () => $kuwaCoin.balanceOf(PUBLIC_MASTER_KUWA_ADDRESS)
  return useFetch(fetch, {
    data: masterKuwaBalance,
  })
}
export function useGivenCount() {
  return useFetch(masterKuwa.givenCount, { data: givenCount })
}
export function useTransfers() {
  const fetch = () => $kuwaCoin.queryFilter($kuwaCoin.filters.Transfer())
  return useFetch(fetch, { data: transfers })
}
