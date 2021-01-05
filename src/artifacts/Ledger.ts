/**
 * @copyright © 2021 Copyright hardchain
 * @date 2021-01-05
 */

import {TransactionPromise} from 'web3z';
import {Address,Uint256, Uint8} from '../solidity_types'
import * as json from './Ledger.json';

export const abi = json.abi;
export const contractName = json.contractName;
export const contractAddress = '0x942D6f5313E70f2c2911c639b3D363d43C3fD96c';

export default interface Ledger {
	owner(): Promise<Address>;
	initialize(admin: Address): TransactionPromise;
	renounceOwnership(): TransactionPromise;
	transferOwnership(): TransactionPromise;
	decimals(): Promise<Uint8>;
	name(): Promise<string>;
	symbol(): Promise<string>;
	addNewSubLedger(sub: Address): TransactionPromise;
	totalSupply(): Promise<Uint256>;
	balanceOf(account: Address): Promise<Uint256>;
	transfer(recipient: Address, amount: Uint256): TransactionPromise;
	allowance(owner: Address, spender: Address): Promise<Uint256>;
	approve(spender: Address, amount: Uint256): TransactionPromise;
	transferFrom(sender: Address, recipient: Address, amount: Uint256): TransactionPromise;
	increaseAllowance(spender: Address, addedValue: Uint256): TransactionPromise;
	decreaseAllowance(spender: Address, subtractedValue: Uint256): TransactionPromise;
	burn(amount: Uint256): TransactionPromise;
	mint(): TransactionPromise;
	lock(to: Address, lockId: Uint256): TransactionPromise;
	unlock(holder: Address, lockId: Uint256, withdrawNow: boolean): TransactionPromise;
	lockedItems(holder: Address): Promise<{locker: Address; lockId: Uint256; amount: Uint256}[]>;
}