/**
 * @copyright © 2021 Copyright hardchain
 * @date 2021-01-05
 */

import {Address,Uint256, Uint8} from 'web3z/solidity_types'
import * as json from './Ledger.json';

export const abi = json.abi;
export const contractName = json.contractName;
export const contractAddress = '0x5947073453b978fc36235747031c511B57540a7c';

export default interface Ledger {
	owner(): Promise<Address>;
	// initialize(admin: Address): TransactionPromise;
	name(): Promise<string>;
	symbol(): Promise<string>;
	decimals(): Promise<Uint8>;
	// addNewSubLedger(sub: Address): Promise<void>; // TransactionPromise;
	totalSupply(): Promise<Uint256>;
	balanceOf(account: Address): Promise<Uint256>;
	transfer(recipient: Address, amount: Uint256): Promise<boolean>; // TransactionPromise;
	allowance(owner: Address, spender: Address): Promise<Uint256>;
	approve(spender: Address, amount: Uint256): Promise<boolean>; // TransactionPromise;
	transferFrom(sender: Address, recipient: Address, amount: Uint256): Promise<boolean>; // TransactionPromise;
	increaseAllowance(spender: Address, addedValue: Uint256): Promise<boolean>; // TransactionPromise;
	decreaseAllowance(spender: Address, subtractedValue: Uint256): Promise<boolean>; // TransactionPromise;
	withdraw(receiver: Address, amount: Uint256): Promise<void>; // TransactionPromise;
	deposit(): Promise<void>; // TransactionPromise;
	// lock(to: Address, lockId: Uint256): Promise<void>; // TransactionPromise;
	// unlock(holder: Address, lockId: Uint256, withdrawNow: boolean): Promise<Uint256>; // TransactionPromise;
	lockedItems(holder: Address): Promise<{locker: Address; lockId: Uint256; amount: Uint256}[]>;
}