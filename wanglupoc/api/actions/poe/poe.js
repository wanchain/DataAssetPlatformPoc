const POE = require('../../models/poe');
const meta = require('../../ethereum/poe_Meta');
const poeService = require('../../ethereum/poe');
const mongoose = require('mongoose');
const SolidityCoder = require("web3/lib/solidity/coder.js");

mongoose.promise = Promise;

export function add(req) {
	const input = req.body;
	const inputJSONStr = JSON.stringify(input);
	var poe = new POE();
	poe.type = input.type;
	poe.meta = inputJSONStr;
	poe.ownerPK = meta.privateKey;
	poe.ownerAccount = meta.defaultAccount;
	
	return new Promise((resolve, reject) => {
		poeService.addData( poe.ownerAccount, poe.ownerPK, inputJSONStr, (err, hash) => {
			if (err) reject(err);
			if (hash) {
				poe.txHash = hash;
				poe
					.save() 
					.then((res) => {
						resolve({data: res.txHash})
					})
					.catch((err) => {
						reject(err)
					})
			}
		})
	})
}


export function getShortLink(req) {
	const { txHash } = req.body;
	return new Promise((resolve, reject) => {
		poeService.getShortLink( txHash, (err, receipt) => {
			if (err) reject(err);
			if (receipt) {
				const { link, blockNumber, timestamp } = receipt;
				console.log(receipt)
				POE
					.findOneAndUpdate({ txHash: txHash }, {$set: {blockNumber: blockNumber, timestamp: timestamp, link: link }}, { new: true})
					.then((res) => {
						resolve({data: res.link})
					})
					.catch((err) => {
						reject(err);
					})
			}
		}) 
	})
}

export function getTxHash(req) {
    const { shortLink } = req.body;
    return new Promise((resolve, reject) => {
    	poeService.getTxHash( shortLink, (err, res) => {
  			if (err) reject(err);
  			if (res) {
  			  resolve(res);	
  			};
  	})
  })
}


export function verify(req) {
	const { shortLink } = req.body;
	return new Promise((resolve, reject) => {
		poeService.verify( shortLink, (err, meta) => {
			if (err) reject(err);
			if (meta) resolve(meta);
		})
	})
}


export default {
	add,
	getShortLink,
	getTxHash,
	verify
}



