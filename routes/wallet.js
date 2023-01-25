const router = require('express').Router();
const { Router } = require('express');

const ethers = require('ethers');
const crypto = require('crypto');

import Web3 from 'web3';

const web3 = new Web3(window.ethereum);
await window.ethereum.enable();

const escrowContract = web3.eth.Contract(contract_abi, contract_address);

var id = crypto.randomBytes(32).toString('hex');
var privateKey = "0x" + id;

var wallet = new ethers.Wallet(privateKey);

router.route('/wallet').get((req, res) => {
    res.json(wallet.address);
});

router.route('/deposit').get((req, res) => {
    res.json(escrowContract.methods.deposit(req.data).call());
});

router.route('/withdraw').get((req, res) => {
    res.json(escrowContract.methods.withdraw(req.data).call());
});

module.exports = router