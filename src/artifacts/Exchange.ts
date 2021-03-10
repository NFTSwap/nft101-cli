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
	arrayIndex: Uint256;
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

export interface NFTAsset {
	asset: Asset;
	token: Address;
	tokenId: Uint256;
	tokenURI: string;
	selling?: SellingNFTData;
}

export enum OrderStatus { Ing, Expired, DealDone }

export default interface Exchange {
	feePlan(): Result<Address>;
	lastOrderId(): Result<Uint256>;
	ledger(): Result<Address>;
	owner(): Result<Address>;
	bids(orderId: Uint256): Result<SellStore>;
	assetsFrom(owner: Address, isTokenURI: boolean): Result<NFTAsset[]>;
	teamAddress(): Result<Address>;
	votePool(): Result<Address>;
	withdraw(asset: AssetID): Result<void>;
	sell(order: SellOrder): Result<Uint256>;
	buy(orderId: Uint256): Result<void>;
	tryEndBid(orderId: Uint256): Result<boolean>;
	orderStatus(orderId: Uint256): Result<OrderStatus>;
	assetOf(asset: AssetID): Result<Asset>;
	getSellingNFT(fromIndex: Uint256, pageSize: Uint256, ignoreZeroVote: boolean, isTokenURI: boolean): Result<{ next: Uint256; nfts: NFTAsset[] }>;
	orderVoteInfo(orderId: Uint256): Result<{ buyPrice: Uint256, auctionDays: Uint256, shareRatio: Uint256 }>;
	getSellingNFTTotal(): Result<Uint256>;
}