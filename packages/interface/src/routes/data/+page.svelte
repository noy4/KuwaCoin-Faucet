<script lang="ts">
  import { Card, Hash } from '$components'
  import {
    PUBLIC_KUWA_COIN_ADDRESS,
    PUBLIC_MASTER_KUWA_ADDRESS,
    PUBLIC_PROVIDER_URL,
  } from '$env/static/public'
  import { kuwaCoin, masterKuwa } from '$lib/contracts'
  import { shortenAddress } from '$lib/utils'
  import { formatEther } from '@ethersproject/units'
  import { TransferTable } from './TransferTable'
</script>

<section class="flex flex-col items-center px-4">
  <h1 class="mt-8 text-4xl font-bold">Kuwa Coin</h1>

  <Card class="p-8 mt-4">
    <table>
      <tr>
        <td>Network</td>
        <td class="text-right">
          {PUBLIC_PROVIDER_URL ? 'Sepolia' : 'Localhost'}
        </td>
      </tr>
      <tr>
        <td>Address</td>
        <td class="text-right">
          <Hash
            text={PUBLIC_KUWA_COIN_ADDRESS}
            label={shortenAddress(PUBLIC_KUWA_COIN_ADDRESS)}
          />
        </td>
      </tr>
      <tr>
        <td>Total Supply</td>
        <td class="text-right">
          {#await $kuwaCoin.totalSupply()}
            loading...
          {:then value}
            {value ? (+formatEther(value)).toLocaleString() : '-'}
          {/await}
        </td>
      </tr>
      <tr><td class="text-lg font-semibold pt-4">Master Kuwa</td></tr>
      <tr>
        <td>Address</td>
        <td class="text-right">
          <Hash
            text={PUBLIC_MASTER_KUWA_ADDRESS}
            label={shortenAddress(PUBLIC_MASTER_KUWA_ADDRESS)}
          />
        </td>
      </tr>
      <tr>
        <td>KWC Balance</td>
        <td class="text-right">
          {#await $kuwaCoin.balanceOf(PUBLIC_MASTER_KUWA_ADDRESS)}
            loading...
          {:then value}
            {value ? (+formatEther(value)).toLocaleString() : '-'}
          {/await}
        </td>
      </tr>
      <tr>
        <td>Given Count</td>
        <td class="text-right">
          {#await masterKuwa.givenCount()}
            loading...
          {:then value}
            {value || '-'}
          {/await}
        </td>
      </tr>
    </table>
  </Card>

  <h2 class="text-3xl font-bold mt-12">Transfers</h2>
  <TransferTable />

  <div class="h-16" />
</section>
