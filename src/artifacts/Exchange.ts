/**
 * @copyright © 2020 Copyright ccl
 * @date 2021-01-04
 */

import {TransactionReceipt} from 'web3z';
import {Address,Uint256,Bytes,Bytes4} from '../solidity_types'
import * as json from './Exchange.json';

export const abi = json.abi;
export const contractName = json.contractName;
export const contractAddress = '0x08A8b3135256725f25b44569D6Ef44674c16A237';

export interface AssetID {
	token: Address;
	tokenId: Uint256;
}

export enum AssetStatus {
	List,
	Selling,
}

export interface Asset {
	owner: Address;
	status: AssetStatus;
	category: number;
	flags: number;
	name: string;
	lastOrderId: Uint256;
	lastDealOrderId: Uint256;
}

export interface SellStore {
	token: Address;
	tokenId: Uint256;
	maxSellPrice: Uint256;
	minSellPrice: Uint256;
	lifespan: Uint256;
	expiry: Uint256;
	buyPrice: Uint256;
	bigBuyer: Address;
}

export interface SellOrder {
	token: Address;
	tokenId: Uint256;
	maxSellPrice: Uint256;
	minSellPrice: Uint256;
	lifespan: Uint256;
}

export default interface Exchange {
	ORDER_MAX_LIFESPAN(): Promise<Uint256>;
	ORDER_MIN_LIFESPAN(): Promise<Uint256>;
	feePlan(): Promise<Address>;
	lastOrderId(): Promise<Uint256>;
	ledger(): Promise<Address>;
	owner(): Promise<Address>;
	renounceOwnership(): Promise<void>;
	sellingOrders(orderId: Uint256): Promise<SellStore>
	teamAddress(): Promise<Address>;
	transferOwnership(newOwner: Address): Promise<void>;
	votePool(): Promise<Address>;
	initialize(name: Address, feePlan_: Address, ledger_: Address, votePool_: Address, team: Address): Promise<void>;
	withdraw(asset: AssetID): Promise<void>;
	sell(order: SellOrder): Promise<Uint256>;
	buy(orderId: Uint256): Promise<TransactionReceipt>;
	tryEndBid(orderId: Uint256): Promise<void>;
	onERC721Received(_: Address, from: Address, tokenId: Uint256, data: Bytes): Promise<Bytes4>;
	getSellOrder(orderId: Uint256): Promise<{status: number; lifespan: Uint256; minPrice: Uint256}>;
	assetOf(asset: AssetID): Promise<Asset>;
}