/**
 * @copyright © 2021 Copyright hardchain
 * @date 2021-01-05
 */

import {Address,Uint256, Uint8} from 'web3z/solidity_types';
import {Result} from 'web3z/happy';
import * as json from './Ledger.json';
import {contracts} from '../../config';

export const abi = json.abi;
export const contractName = json.contractName;
export const contractAddress = contracts.ledger;//'0x5947073453b978fc36235747031c511B57540a7c';

export default interface Ledger {
	owner(): Result<Address>;
	// initialize(admin: Address): TransactionPromise;
	name(): Result<string>;
	symbol(): Result<string>;
	decimals(): Result<Uint8>;
	// addNewSubLedger(sub: Address): Result<void>; // TransactionPromise;
	totalSupply(): Result<Uint256>;
	balanceOf(account: Address): Result<Uint256>;
	transfer(recipient: Address, amount: Uint256): Result<boolean>; // TransactionPromise;
	allowance(owner: Address, spender: Address): Result<Uint256>;
	approve(spender: Address, amount: Uint256): Result<boolean>; // TransactionPromise;
	transferFrom(sender: Address, recipient: Address, amount: Uint256): Result<boolean>; // TransactionPromise;
	increaseAllowance(spender: Address, addedValue: Uint256): Result<boolean>; // TransactionPromise;
	decreaseAllowance(spender: Address, subtractedValue: Uint256): Result<boolean>; // TransactionPromise;
	withdraw(receiver: Address, amount: Uint256): Result<void>; // TransactionPromise;
	deposit(): Promise<void>; // TransactionPromise;
	// lock(to: Address, lockId: Uint256): Promise<void>; // TransactionPromise;
	// unlock(holder: Address, lockId: Uint256, withdrawNow: boolean): Result<Uint256>; // TransactionPromise;
	lockedItems(holder: Address): Result<{locker: Address; lockId: Uint256; amount: Uint256}[]>;
}