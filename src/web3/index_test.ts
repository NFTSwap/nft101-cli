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

import web3 from './index';
import ccl from '../../test/ccl';
import artifacts from '../artifacts';

export default async function _test() {

	var mask = web3.metaMask;

	var [from] = await mask.request({ method: 'eth_requestAccounts' });

	console.log('eth_requestAccounts', from);

	console.log('currentProvider', web3.currentProvider);

	console.log('web3.getBlockNumber', await web3.eth.getBlockNumber());

	var accounts = await web3.eth.getAccounts();

	console.log('defaultAccount', accounts);

	var happy = ccl.license_types.happy();

	var license_types = await happy.get('11100000000019713D057');

	console.log('license_types', license_types);

	var ex = artifacts.exchange.happy();

	var ass = await ex.assetOf({ token: '0x08A8b3135256725f25b44569D6Ef44674c16A237', tokenId: '0x0c3b14b48efe80524918e366821b49a30905c6e7187f6a5a717843f28653a529' })

	console.log(ass);

	// web3.eth.getTransactionCount(account, 'latest');

	// var r = await mask.request({
	// 	method: 'personal_sign',
	// 	params: [from, 'SuperRare uses this cryptographic signature in place of a password, verifying that you are the owner of this Ethereum address.'],
	// });

	// var r = await web3.eth.personal.sign(
	// 	'SuperRare uses this cryptographic signature in place of a password, verifying that you are the owner of this Ethereum address.', from, '');
	// console.log('personal_sign', r);

}
