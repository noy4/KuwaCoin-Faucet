# Kuwa Coin 開発

## 目的

ブロックチェーン開発の流れをアウトプットして理解

## やったこと

- scafold-eth 写経、構成理解
- yarn v3 試す
- yarn workspaces 試す

<!--  -->

- hardhat
- vite (react-ts)
  - Chakra UI

<!--  -->

- Web3Modal
- Kuwa Coin (Contract)
- Vendor (Contract)

React でやってたけど Svelte が気になってたので使ってみることにした。

- Svelte
- Daisy UI

<!--  -->

- TypeChain

## 変更

Kuwa Coin を売り買いできる Vendor コントラクトを実装したが、ユーザーに前もってテスト ETH 取得してもらうのアレだったので、Kuwa Coin をばら撒く Faucet コントラクトに変更（売り買いページ → [/buy-sell](../../buy-sell)）

MetaMask とかでウォレット接続して使うように作ってたけど MetaMask インストールさせるのアレなのでウォレット作成機能を実装
