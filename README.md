# Token

## Be president of your own railroad.

### Step 1

Edit [.env.example](.env.example) and rename it to `.env`.

The wallet entered here will own the token's contract and receive the initial supply.

Hot tip: export your private key from MetaMask and add `0x` to the beginning.

### Step 2

Edit [arguments.ts](scripts/arguments.ts) to your liking and run the following:

```
  yarn install
  yarn hardhat compile
  yarn hardhat test
```

### Step 3

Make sure your contract deployment wallet has ether on Rinkeby, then deploy like so:

```
  yarn hardhat run --network rinkeby scripts/deploy.ts
```

Optionally, verify on Etherscan with the following (but hey, why not, you've come this far):

```
  yarn hardhat verify --network rinkeby $CONTRACT_ADDRESS --constructor-args scripts/arguments.ts
```

Mainnet is just an ocean of gas away.

### Step 4

Read the docs for the [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/) whence this code was wrought.

### Step 5

Be careful what you wish for.
