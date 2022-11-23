<script lang="ts">
  import { Card } from '$components'
  import {
    GivenCountRow,
    KuwaCoinAddressRow,
    MasterKuwaAddressRow,
    MasterKuwaBalanceRow,
    NetworkRow,
    TotalSupplyRow,
    TransferTable,
  } from './components'
</script>

<section class="flex flex-col items-center px-4">
  <h1 class="mt-8 text-4xl font-bold">Kuwa Coin</h1>

  <Card class="p-8 mt-4">
    <table>
      <NetworkRow />
      <KuwaCoinAddressRow />
      <TotalSupplyRow />

      <tr><td class="text-lg font-semibold pt-4">Master Kuwa</td></tr>
      <MasterKuwaAddressRow />
      <MasterKuwaBalanceRow />
      <GivenCountRow />
    </table>
  </Card>

  <h2 class="text-3xl font-bold mt-12">Transfers</h2>
  <TransferTable />

  <div class="h-16" />
</section>
