import {useEffect, useState} from 'react';
import MetamaskConnector from './components/MetamaskConnector.js';
import { checkState, displayBalance, openBets, closeLottery, displayPrize, buyTokens, displayTokenBalance } from './services/lotteryService';

function App() {

  let [wallet, setWallet] = useState({});
  let [duration, setDuration] = useState(100);
  let [amountToBuy, setAmountToBuy] = useState('1');
  const handleOnSet = (event) => {
    setWallet(event);
    console.log(wallet)
  };

  const handleDisplayBalance = () => {
    const address = wallet.address;
    console.log(address)
    displayBalance(address);
  };

  const handleDisplayPrize = () => {
    const address = wallet.address;
    console.log('Address:', address);
    displayPrize(address);
  };

  return (
    <div>
      <h1>Welcome To the Lottery app</h1>

      <MetamaskConnector onSet={handleOnSet}/>
      <p>Select an option:
        <div>
          <button onClick={checkState}>Check state</button>
        </div>
        <div>
          <button onClick={handleDisplayBalance}>Check balance</button>
        </div>
        <div>
          <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)}/>
          <button onClick={() => openBets(duration)}>Open bets</button>
        </div>
        <div>
          <button onClick={closeLottery}>Close Lottery</button>
        </div>
        <div>
          <button onClick={handleDisplayPrize}>Display Prize</button>
        </div>
        <div>
          <input type="text" value={`${amountToBuy}`} onChange={(e) => setAmountToBuy(e.target.value)}/>
          <button onClick={() => buyTokens(`${amountToBuy}`)}>Buy Tokens</button>
        </div>
      </p>
    </div>
  );
}

export default App;
