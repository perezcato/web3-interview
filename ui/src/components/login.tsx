import React from 'react';
import Button from "./button";
import {ethers} from "ethers";

interface Props {
  provider: ethers.providers.Web3Provider,
  setSigner: React.Dispatch<React.SetStateAction<ethers.Signer | undefined>>
  setAccount: React.Dispatch<React.SetStateAction<string | undefined>>
}

const Login = (props: Props) => {

  const onLogin = async () => {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()

      await signer.signMessage('Allow access to metamask wallet')
      props.setSigner(signer)
      props.setAccount(await signer.getAddress())
    } catch (e) {
      console.error('Error:', e)
    }

  }


  return (
    <div className="w-full h-full flex items-center justify-center">
      <Button
      onClick={onLogin}
        label={'Login via metamask'} />
    </div>
  );
};

export default Login;