<strong>Here </strong>
## Demo
https://web3-frontend-interview.netlify.app/

## Loom video

https://www.loom.com/share/1edcafe79473468db90952e29037d3a4


## Run Locally

Clone the project

```bash
  git clone git@github.com:perezcato/web3-interview.git
```

Go to the project directory

```bash
  cd project
```

Compile and run smart contract locally


```bash
- Install dependencies
  yarn install
```

```bash
- Compile smart contract
  yarn run compile
```

```bash
- Deploy smart contract locally
  yarn run deploy:locally

  NB: In the console you would get the address to where the contract has been deployed.
  Please copy it as it would be used in the frontend.
```

```bash
- Run test wallets to use locally
  npx hardhat node

  NB: You would be given wallets with which you can import into your metamask 
  in your browser to use.
```

Run UI

```bash
- Checkout UI folder
  cd ui
```

```bash
- Install dependencies
  yarn install
```

```bash
- create .env file
  cp .env.template .env

  NB: note that this command works for UNIX systems and would not work on windows devices.
  For windows devices please copy the .env.template and rename it as .env
```

```bash
- Set contract address
  In the .env file set 
  REACT_APP_CONTRACT_ADDRESS = "<ADDRESS COPIED WHEN SMART CONTRACT WAS DEPLOYED LOCALLY>"
```

```bash
- Run App
  yarn start

  App can be accessed at http://localhost:3000
```


Run Tests (still in the UI folder)

```bash
- Run tests
  yarn run test
```




## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, hardhat

