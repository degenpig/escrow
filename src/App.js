import { useState, useEffect } from "react";
import axios from "axios";

import { ethers } from "ethers";

import './App.css';

var port = 5000;
axios.defaults.baseURL = window.location.protocol + '//' + window.location.hostname + ':' + port;

function App() {
  
  const [balance, setBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');

  const deposit = async () => {
    const res = await axios.get('/api/wallet');
    setWalletAddress(res.data);
    document.getElementById("modal").style.display = "block";
  }

  const show = async () => {
    document.getElementById("showWithdraw").style.display = "block";
  }

  const fetchBalance = async () => {
    let res;

    res = await axios.get(`/balance`, {
      params : {
        address : address,
        chain : 0x1
      },
    });

    console.log(res);

    setBalance((res.data.result.balance / 1E18).toFixed(2));
  }

  useEffect(()=>{
    fetchBalance();
  });

  const withdraw = async () => {
    const res = await axios.get('/api/wallet/withdraw');
  }

  return (
    <div className="container">
      <div className="row" id="space"></div>
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <div className="row">
            <div className="col-sm-4">
              <h4>{balance}ETH</h4>
            </div>
            <div className="col-sm-8">
              <button onClick={deposit}>DEPOSIT</button>
            </div>
          </div>
        </div>
        <div className="col-sm-4"></div>
      </div>
      <div className="row" id="modal">
        <div className="col-sm-12">
          <div className="row">
            <h6>Game Wallet Address</h6>
          </div>
          <div className="row">
            <h6>{walletAddress}</h6>
          </div>
          <div className="row">
            <button onClick={show}>WITHDRAW</button>
          </div>
        </div>
      </div>
      <div className="row" id="space"></div>
      <div className="row" id="showWithdraw">
        <div className="col-sm-12">
          <div className="row">
            <h6>Please input address and amount that need to withdraw crypto</h6>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <input type="text" placeholder="address" style={{width:"400px"}}></input>
            </div>
            <div className="col-sm-6">
              <input type="text" placeholder="amount"></input>
            </div>
          </div>
          <div className="row" style={{marginTop:"20px"}}>
            <button onClick={withdraw}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
