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

import web3, {web3Support} from '.';
import buffer from 'somes/buffer';
import * as user from '../user';

const crypto_tx = require('crypto-tx');

var _address: string = '';

export class ApiIMPL implements user.APIUser {

	// load address
	async load() {
		if (!_address) {
			if (web3Support()) {
				var mask = web3.metaMask;

				var [from] = await mask.request({ method: 'eth_requestAccounts' });

				console.log('eth_requestAccounts', from);

				if (from) {
					from = '0x' + crypto_tx.toChecksumAddress(buffer.from(from.slice(2), 'hex'));
				}

				_address = from || '';
			}
		}

		return _address;
	}

	async user() {

		var mask = web3.metaMask;

		var addr = await this.load();

		if (!addr) {
			// TODO ...
		}

		var r = await mask.request({
			method: 'personal_sign',
			params: [addr, 'NFTSwap uses this cryptographic signature in place of a password, verifying that you are the owner of this Ethereum address.'],
		});

		console.log('personal_sign', r);

		return { address: addr };
	}

	async address() {
		if (! await this.load()) {
			await this.user();
		}
		return _address;
	}

	addressNoJump() {
		return _address;
	}

}

export default new ApiIMPL;