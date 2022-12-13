import React from 'react';
import Login from "./login";
import {ethers} from "ethers";
import Roles from "./Roles";

const HomeContainer = () => {

  const [provider, _] = React.useState<ethers.providers.Web3Provider>(new ethers.providers.Web3Provider(window.ethereum))
  const [account, setAccount] = React.useState<string>()
  const [signer, setSigner] = React.useState<ethers.Signer>()

  return (
    <div className="bg-gray-900 w-screen h-screen text-white">
      {
        account && signer ? (
          <Roles
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