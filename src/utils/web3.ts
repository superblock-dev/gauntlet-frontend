export const web3Config = {
  strategy: 'speed',
  rpcs: [
    { url: 'https://free.rpcpool.com', weight: 10 },
    { url: 'https://api.rpcpool.com', weight: 10 },
    { url: 'https://solana-api.projectserum.com', weight: 10 },
    { url: 'https://raydium.rpcpool.com', weight: 50 },
    { url: 'https://api.mainnet-beta.solana.com', weight: 20 }
  ]
}
