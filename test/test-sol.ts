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

import web3 from '../src/web3';
import artifacts from '../src/artifacts';

export default async function() {
	console.log('currentProvider', web3.currentProvider);
	console.log('web3.getBlockNumber', await web3.eth.getBlockNumber());

	var ex = artifacts.exchange.happy();

	console.log('exchange.assetOf', await ex.assetOf({
		token: '0x08A8b3135256725f25b44569D6Ef44674c16A237', 
		tokenId: BigInt('0x0c3b14b48efe80524918e366821b49a30905c6e7187f6a5a717843f28653a529'),
	}));
	console.log('exchange.ORDER_MAX_LIFESPAN', await ex.ORDER_MAX_LIFESPAN());
	console.log('exchange.ORDER_MIN_LIFESPAN', await ex.ORDER_MIN_LIFESPAN());
	console.log('exchange.feePlan', await ex.feePlan());
	console.log('exchange.lastOrderId', await ex.lastOrderId());
	console.log('exchange.ledger', await ex.ledger());
	console.log('exchange.owner', await ex.owner());
	// console.log('exchange.renounceOwnership', await ex.renounceOwnership());
	console.log('exchange.sellingOrders', await ex.sellingOrders(BigInt('0x0c3b14b48efe80524918e366821b49a30905c6e7187f6a5a717843f28653a529')));
	// console.log('exchange.transferOwnership', await ex.transferOwnership('0x08A8b3135256725f25b44569D6Ef44674c16A237')); // post
	console.log('exchange.votePool', await ex.votePool());
	console.log('exchange.getSellOrder', await ex.getSellOrder(BigInt('0x0c3b14b48efe80524918e366821b49a30905c6e7187f6a5a717843f28653a529')));
	console.log('exchange.teamAddress', await ex.teamAddress());

	var fee_plan = artifacts.fee_plan.happy();

	console.log('fee_plan.feeToTeam', await fee_plan.feeToTeam());
	console.log('fee_plan.feeToTeamAtFirst', await fee_plan.feeToTeamAtFirst());
	console.log('fee_plan.feeToVoter', await fee_plan.feeToVoter());
	console.log('fee_plan.feeToVoterAtFirst', await fee_plan.feeToVoterAtFirst());
	console.log('fee_plan.owner', await fee_plan.owner());
	// console.log('fee_plan.renounceOwnership', await fee_plan.renounceOwnership());
	// console.log('fee_plan.transferOwnership', await fee_plan.transferOwnership());
	// console.log('fee_plan.initialize', await fee_plan.initialize('0x08A8b3135256725f25b44569D6Ef44674c16A237'));
	console.log('fee_plan.formula', await fee_plan.formula(
		BigInt('0x0c3b14b48efe80524918e366821b49a30905c6e7187f6a5a717843f28653a529'), true,
		BigInt('0x0c3b14b48efe80524918e366821b49a30905c6e7187f6a5a717843f28653a529')
	));

	var ledger = artifacts.ledger.happy();

	console.log('ledger.owner', await ledger.owner());
	// initialize(admin: Address): TransactionPromise;
	// renounceOwnership(): TransactionPromise;
	// transferOwnership(): TransactionPromise;
	console.log('ledger.decimals', await ledger.decimals());
	console.log('ledger.name', await ledger.name());
	console.log('ledger.symbol', await ledger.symbol());
	// addNewSubLedger(sub: Address): TransactionPromise;
	console.log('ledger.totalSupply', await ledger.totalSupply());
	console.log('ledger.balanceOf', await ledger.balanceOf('0x08A8b3135256725f25b44569D6Ef44674c16A237'));
	// transfer(recipient: Address, amount: Uint256): TransactionPromise;
	console.log('ledger.allowance', await ledger.allowance('0x08A8b3135256725f25b44569D6Ef44674c16A237', '0x08A8b3135256725f25b44569D6Ef44674c16A237'));
	// approve(spender: Address, amount: Uint256): TransactionPromise;
	// transferFrom(sender: Address, recipient: Address, amount: Uint256): TransactionPromise;
	// increaseAllowance(spender: Address, addedValue: Uint256): TransactionPromise;
	// decreaseAllowance(spender: Address, subtractedValue: Uint256): TransactionPromise;
	// burn(amount: Uint256): TransactionPromise;
	// mint(): TransactionPromise;
	// lock(to: Address, lockId: Uint256): TransactionPromise;
	// unlock(holder: Address, lockId: Uint256, withdrawNow: boolean): TransactionPromise;
	console.log('ledger.lockedItems', await ledger.lockedItems('0x08A8b3135256725f25b44569D6Ef44674c16A237'));
}
