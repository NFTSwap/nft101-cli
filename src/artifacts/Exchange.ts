/**
 * @copyright © 2020 Copyright ccl
 * @date 2021-01-04
 */

// import {TransactionReceipt} from 'web3z';
import {Address,Uint256} from '../solidity_types'
import * as json from './Exchange.json';

export const abi = json.abi;
export const contractName = json.contractName;
export const contractAddress = '0x08A8b3135256725f25b44569D6Ef44674c16A237';

export interface AssetID {
	token: Address;
	tokenId: Uint256;
}

export enum AssetStatus { List, Selling }

export interface Asset {
	owner: Address;
	status: AssetStatus;
	category: number;
	flags: number;
	name: string;
	lastOrderId: Uint256;
	lastDealOrderId: Uint256;
}

export default interface Exchange {
	assetOf(id: AssetID): Promise<Asset>;
}