import web3Service from './web3Service';
import { ethers } from 'ethers';

const checkState = async () => {
  const contract = await web3Service.getContract();
  const state = await contract.betsOpen();
  console.log(`The lottery is ${state ? "open" : "closed"}\n`);
  if (!state) return;
  const provider = web3Service.getProvider();
  const currentBlock = await provider.getBlock("latest");
  const currentBlockDate = new Date(currentBlock.timestamp * 1000);
  const closingTime = await contract.betsClosingTime();
  const closingTimeDate = new Date(closingTime.toNumber() * 1000);
  console.log(
    `The last block was mined at ${currentBlockDate.toLocaleDateString()} : ${currentBlockDate.toLocaleTimeString()}\n`
  );
  console.log(
    `lottery should close at  ${closingTimeDate.toLocaleDateString()} : ${closingTimeDate.toLocaleTimeString()}\n`
  );
}

const displayBalance = async (address) => {
  const balanceBN = await web3Service.getProvider().getBalance(
    address
  );
  const balance = ethers.utils.formatEther(balanceBN);
  console.log(
    `The account of address ${
      address
    } has ${balance} ETH\n`
  );
}

const openBets = async (duration) => {
  const currentBlock = await web3Service.getProvider().getBlock("latest");
  const contract = web3Service.getContract();
  const tx = await contract.openBets(currentBlock.timestamp + Number(duration));
  const receipt = await tx.wait();
  console.log(`Bets opened (${receipt.transactionHash})`);
}

const closeLottery = async () => {
  const contract = web3Service.getContract();
  const tx = await contract.closeLottery();
  const receipt = await tx.wait();
  console.log(`Bets closed (${receipt.transactionHash})\n`);
}

const displayPrize = async (address) => {
  const contract = web3Service.getContract();
  const prizeBN = await contract.prize(address);
  const prize = ethers.utils.formatEther(prizeBN);
  console.log(
    `The account of address ${
      address
    } has earned a prize of ${prize} Tokens\n`
  );
  return prize;
}

const buyTokens = async (amount) => {
  const contract = web3Service.getContract();
  const signer = web3Service.getSigner();
  const tx = await contract.connect(signer).purchaseTokens({
    value: ethers.utils.parseEther(amount),
  });
  const receipt = await tx.wait();
  console.log(`Tokens bought (${receipt.transactionHash})\n`);
}

const displayTokenBalance = async (address) => {
  const token = web3Service.getTokenContract();
  console.log('token: ' + JSON.stringify(token));
  const balanceBN = await token.balanceOf(address);
  const balance = ethers.utils.formatEther(balanceBN);
  console.log(
    `The account of address ${
      address
    } has ${balance} Tokens\n`
  );
}

export {
  checkState,
  displayBalance,
  openBets,
  closeLottery,
  displayPrize,
  buyTokens,
  displayTokenBalance
};