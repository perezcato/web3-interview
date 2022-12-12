import React from 'react';
import Login from "./login";
import {ethers} from "ethers";

const HomeContainer = () => {

  const [provider, setProvider] = React.useState<ethers.providers.Web3Provider>(new ethers.providers.Web3Provider(window.ethereum))
  const [account, setAccount] = React.useState<string>()
  const [signer, setSigner] = React.useState<ethers.Signer>()

  return (
    <div className="bg-gray-900 w-screen h-screen text-white">
      {
        account && signer ? (<div>User Logged in</div>):(
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