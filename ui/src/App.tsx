import React, {useEffect} from 'react';
import { ethers } from 'ethers';
import Login from "./components/login";
import HomeContainer from "./components/homeContainer";

declare global {
  interface Window {
    ethereum: any
  }
}

function App() {

  const [web3Support, setWeb3Support] = React.useState<boolean>(false)

  useEffect(() => {
    if(window.ethereum){
      setWeb3Support(true)
    }
  }, [])


  return web3Support ? (
   <HomeContainer />
  ) : (
    <div className="bg-gray-900 w-screen h-screen text-white flex items-center justify-center text-sm">
      <div className="py-2 px-5 bg-gray-800 rounded text-orange-500">
        Web3 Not supported in this browser
      </div>
    </div>
  );
}

export default App;
