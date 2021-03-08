/**
 * @copyright © 2021 Copyright hardchain
 * @date 2021-01-04
 */

import {Address,Uint256} from 'web3z/solidity_types'
import {Result} from 'web3z/happy';
import * as json from './Exchange.json';
import {contracts} from '../../config';

export const abi = json.abi;
export const contractName = json.contractName;
export const contractAddress = contracts.exchange;// '0x7322ee767aaD2dEf9e3527Dc1230fB5f09ead682';

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
	feePlan(): Result<Address>;
	lastOrderId(): Result<Uint256>;
	ledger(): Result<Address>;
	owner(): Result<Address>;
	bids(orderId: Uint256): Result<SellStore>;
	teamAddress(): Result<Address>;
	votePool(): Result<Address>;
	// initialize(name: Address, feePlan_: Address, ledger_: Address, votePool_: Address, team: Address): TransactionPromise;
	withdraw(asset: AssetID): Result<void>; // TransactionPromise;
	sell(order: SellOrder): Result<Uint256>; // TransactionPromise;
	buy(orderId: Uint256): Result<void>; // TransactionPromise
	tryEndBid(orderId: Uint256): Result<boolean>;// TransactionPromise;
	// onERC721Received(_: Address, from: Address, tokenId: Uint256, data: Bytes): TransactionPromise;
	// getSellOrder(orderId: Uint256): Result<{status: number; lifespan: Uint256; minPrice: Uint256}>;
	orderStatus(orderId: Uint256): Result<OrderStatus>;
	assetOf(asset: AssetID): Result<Asset>;
	getSellingNFT(fromIndex: Uint256, pageSize: Uint256, ignoreZeroVote: boolean): Result<{ next: Uint256; nfts: SellingNFTData[] }>;
	orderVoteInfo(orderId: Uint256): Result<{ buyPrice: Uint256, auctionDays: Uint256, shareRatio: Uint256 }>;
	getSellingNFTTotal(): Result<Uint256>;
	// cancelVoteAllowed(orderId: Uint256, voter: Address): Result<void>;
	// voteAllowed();
	// setVotePool(votePool_: Address): Result<void>;
}