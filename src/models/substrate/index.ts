/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2019, hardchain
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of hardchain nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL hardchain BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * ***** END LICENSE BLOCK ***** */

import { ApiPromise, WsProvider } from '@polkadot/api';
import { SignerOptions } from '@polkadot/api/submittable/types';
import { Signer, SignerResult, SignerPayloadJSON, SignerPayloadRaw, } from '@polkadot/types/types';
import { web3Enable, web3Accounts, web3FromSource } from '@polkadot/extension-dapp';
import * as cfg from '../../../config';

const crypto_tx = require('crypto-tx');

const types = {
	"Address": "MultiAddress",
	"LookupSource": "MultiAddress",
	"Nft": "String",
	"NftId": "u128",
	"OrderId": "u128",
	"OrderOf": {
		"order_id": "u128",
		"start_price": "Balance",
		"end_price": "Balance",
		"nft_id": "u128",
		"keep_block_num": "u32",
		"owner": "Hash"
	},
	"BidOf": {
		"order_id": "u128",
		"price": "Balance",
		"owner": "Hash"
	},
	"VoteOf": {
		"order_id": "u128",
		"amount": "Balance",
		"owner": "Hash"
	}
};

const provider = new WsProvider(cfg.substrate); // wss://rpc.polkadot.io

export class LazySigner implements Signer {
	private _signatures: Map<string, SignerResult> = new Map();
	private _signer: any;
	private _blockHash: any = '';
	private _era: any = '';

	constructor(signer: Signer) {
		this._signer = signer;
	}

	private _hash(data: any): string {
		var keys = Object.keys(data).sort((a, b)=>(a>b?1:a<b?-1:0));
		var datas = [];
		for (var key of keys) {
			if (key != 'blockNumber')
				datas.push((data as any)[key]);
		}
		// console.log('------_hash------', datas);
		this._blockHash = data.blockHash;
		this._era = data.era;
		return crypto_tx.keccak(JSON.stringify(datas)).hex;
	}

	async signPayload(payload: SignerPayloadJSON): Promise<SignerResult> {
		var hash = this._hash(payload);
		var signature = this._signatures.get(hash);
		// console.log('------payload------', payload);
		if (!signature) {
			signature = await this._signer.signPayload(payload) as SignerResult;
			// console.log('------signature------', buffer.from(signature.signature).toString('base64'));
			this._signatures.set(hash, signature);
		}
		return signature;
	}
	async signRaw(raw: SignerPayloadRaw): Promise<SignerResult> {//debugger
		var hash = this._hash(raw);
		var signature = this._signatures.get(hash);
		if (!signature) {
			signature = await this._signer.signPayload(raw) as SignerResult;
			this._signatures.set(hash, signature);
		}
		return signature;
	}
	update(id: number, status: any) {
		this._signer.update(id, status);
	}

	get options(): Partial<SignerOptions> {
		return {blockHash: this._blockHash, era: this._era, signer: this };
	}
}

export function encodeParameters() {
	return '0x00';
}

export class Substrate {
	constructor() {
		// TODO ...
	}

	async initialize() {
		// Create our API with a default connection to the local node
		var api = await ApiPromise.create({ provider, types });

		await api.isReady;

		await web3Enable('NFTSwap');

		var accounts = await web3Accounts();

		// TODO ...
	}

}

export default new Substrate;
