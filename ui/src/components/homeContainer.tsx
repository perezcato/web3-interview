import React, {useEffect} from 'react';
import Login from "./login";
import {ethers} from "ethers";
import Dashboard from "./Dashboard";

const HomeContainer = () => {

  const [provider, _] = React.useState<ethers.providers.Web3Provider>(new ethers.providers.Web3Provider(window.ethereum))
  const [account, setAccount] = React.useState<string>()
  const [signer, setSigner] = React.useState<ethers.Signer>()


  useEffect(() => {

    (async () => {
      try{
        const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        if(accounts && accounts.length > 0){
          setSigner(provider.getSigner())
          setAccount(accounts[0])
        }
      } catch (e){
        console.error(e)
      }
    })()

  }, [])

  return (
    <div className="bg-gray-900 w-screen h-screen text-white">
      {
        account && signer ? (
          <Dashboard
            account={account}
            signer={signer}
          />
        ):(
          <Login
            provider={provider}
            setAccount={setAccount}
            setSigner={setSigner}
          />
        )
      }

    </div>
  );
};

export default HomeContainer;