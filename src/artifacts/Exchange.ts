/**
 * @copyright © 2021 Copyright hardchain
 * @date 2021-01-04
 */

import {Address,Uint256} from 'web3z/solidity_types'
import * as json from './Exchange.json';

export const abi = json.abi;
export const contractName = json.contractName;
export const contractAddress = '0x7322ee767aaD2dEf9e3527Dc1230fB5f09ead682';

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

export interface SellingNFTData {
	orderId: Uint256;
	totalVotes: Uint256;
	order: SellStore;
}

export enum OrderStatus { Ing, Expired, DealDone }

export default interface Exchange {
	feePlan(): Promise<Address>;
	lastOrderId(): Promise<Uint256>;
	ledger(): Promise<Address>;
	owner(): Promise<Address>;
	bids(orderId: Uint256): Promise<SellStore>;
	teamAddress(): Promise<Address>;
	votePool(): Promise<Address>;
	// initialize(name: Address, feePlan_: Address, ledger_: Address, votePool_: Address, team: Address): TransactionPromise;
	withdraw(asset: AssetID): Promise<void>; // TransactionPromise;
	sell(order: SellOrder): Promise<Uint256>; // TransactionPromise;
	buy(orderId: Uint256): Promise<void>; // TransactionPromise
	tryEndBid(orderId: Uint256): Promise<boolean>;// TransactionPromise;
	// onERC721Received(_: Address, from: Address, tokenId: Uint256, data: Bytes): TransactionPromise;
	// getSellOrder(orderId: Uint256): Promise<{status: number; lifespan: Uint256; minPrice: Uint256}>;
	orderStatus(orderId: Uint256): Promise<OrderStatus>;
	assetOf(asset: AssetID): Promise<Asset>;
	getSellingNFT(fromIndex: Uint256, pageSize: Uint256, ignoreZeroVote: boolean): Promise<{ next: Uint256; nfts: SellingNFTData[] }>;
	orderVoteInfo(orderId: Uint256): Promise<{ buyPrice: Uint256, auctionDays: Uint256, shareRatio: Uint256 }>;
	// cancelVoteAllowed(orderId: Uint256, voter: Address): Promise<void>;
	// voteAllowed();
	// setVotePool(votePool_: Address): Promise<void>;
}