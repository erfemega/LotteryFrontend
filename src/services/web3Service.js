import { ethers } from 'ethers';
import LotteryABI from './../assets/Lottery.json';
import LotteryTokenABI from './../assets/LotteryToken.json';

const CONTRACT_ADDRESS = '0xce3F4827f8860ae2c205565e2e5b19444da8eBA4';

const getProvider = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log(provider)
  return provider;
}

const getSigner = () => {
  const provider = getProvider();
  const signer = provider.getSigner();
  return signer;
}

const getContract = () => {
  const signer = getSigner();
  console.log(signer)
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    LotteryABI.abi,
    signer
  );
  return contract;
};

const getTokenContract = async () => {
  const signer = getSigner();
  const contract = getContract();
  const tokenAddress = await contract.paymentToken();
  console.log('token address:', tokenAddress);
  const token = new ethers.Contract(
    tokenAddress,
    LotteryTokenABI.abi,
    signer
  );
  return token;
}

export default {
  getProvider,
  getSigner,
  getContract,
  getTokenContract
};