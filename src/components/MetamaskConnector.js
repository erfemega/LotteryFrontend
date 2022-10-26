import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function MetamaskConnector ({onSet}) {
  let [haveMetamask, setHaveMetamask] = useState(false);
  let [isConnected, setIsConnected] = useState(false);
  let [accountAddress, setAccountAddress] = useState('');

  function checkMetamask() {
    const ethereum = window.ethereum;

    if(!ethereum) {
      setHaveMetamask(false);
    }
    else {
      setHaveMetamask(true);
    }
  }

  async function handleConnection() {
    console.log('connecting');
    let walletData = {};
    const { ethereum } = window;
    try {
      if (!ethereum) {
        setHaveMetamask(false);
      }
  
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      console.log('connecting', accounts);
      setAccountAddress(accounts[0]);
      setIsConnected(true);
      walletData = {
        address: accounts[0],
        isConnected: true
      }
    }
    catch (error) {
      setIsConnected(false);
      walletData = {
        isConnected: false
      };
    }
    onSet(walletData);
  }
  useEffect(() => {
    checkMetamask();
  }, []);

  const connectButton = <div>
    <button onClick={handleConnection}>Conectar</button>
  </div>;
  const noMetamask = <div>
    <p>No hay metamask</p>
  </div>

  return haveMetamask ? connectButton : noMetamask;
}