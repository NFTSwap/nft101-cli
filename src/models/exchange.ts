
import somes from 'somes';
import { Address, Uint256 } from 'web3z/solidity_types';
import nfts from './nfts';
import vp from './vote_pool';
import artifacts from '../artifacts';
import * as ex from '../artifacts/Exchange';
import * as user from './user';

export const artifact = artifacts.exchange.api;

export type NFTAsset = ex.NFTAsset;

export interface BuyRecord {
	orderId: Uint256;
	price: bigint;
	buyer: Address;
}

export default {

	async assetSellingOf(token: string, tokenId: bigint): Promise<ex.NFTAsset> {
		var selling: ex.SellingNFTData | undefined;
		console.log('triggerLoad', token, tokenId);
		var asset = await this.assetOf(token, tokenId);
		var tokenURI = await nfts.tokenURI(token, tokenId);
		if (asset.status == ex.AssetStatus.Selling) {
			var orderId = asset.lastOrderId;
			var totalVotes = await vp.orderTotalVotes(orderId);
			selling = {
				orderId,
				totalVotes,
				order: await this.bids(orderId),
			};
		}
		return {
			asset,
			token, tokenId,
			tokenURI, selling,
		};
	},

	// 返回当前拍卖排名最高的101个
	async getNFT101() {
		// TODO ...
		var r = await artifact.getSellingNFT(BigInt(0), BigInt(100), true, true).call();
		// console.log(r)
		return r.nfts.sort((a, b)=>{
			var _a = a.selling ? a.selling.totalVotes: BigInt(-1);
			var _b = b.selling ? b.selling.totalVotes: BigInt(-1);
			return Number(_b - _a);
		});
	},

	// 返回我的资产列表
	async myNFTs() {
		// TODO ...
		var address = user.addressNoJump();
		var nfts = await artifact.assetsFrom(address, true).call();
		// console.log(nfts);
		return nfts;
	},

	// 订单信息
	bids(orderId: bigint) {
		return artifact.bids(orderId).call();
	},

	// 取出资产
	async withdraw(token: string, tokenId: bigint): Promise<{ token: string; tokenId: bigint; from: string }> {
		var asset = {token, tokenId};
		await artifact.withdraw(asset).call(); // test
		var r = await artifact.withdraw(asset).post();
		var evt = await artifacts.exchange.findEventFromReceipt('Withdraw', r);
		somes.assert(evt, 'not event Withdraw');
		var values = evt[0].returnValues as any;
		return {
			token: values.token,
			from: values.from,
			tokenId: BigInt(values.tokenId),
		};
	},

	// 拍卖资产
	async sell(order: ex.SellOrder): Promise<{ token: string; tokenId: bigint; seller: string; orderId: bigint }> {
		await artifact.sell(order).call(); // test
		var r = await artifact.sell(order).post();
		var evt = await artifacts.exchange.findEventFromReceipt('Sell', r);
		var values = evt[0].returnValues as any;
		return {
			token: values.token,
			orderId: BigInt(values.orderId),
			seller: values.seller,
			tokenId: BigInt(values.tokenId),
		};
	},

	// 拍卖出价
	async buy(orderId: bigint, price: bigint): Promise<{ buyer: string; orderId: bigint; price: bigint }> {
		// event Buy(uint256 indexed orderId, address buyer, uint256 price);
		var value = String(price);
		await artifact.buy(orderId).call({value}); // test
		var r = await artifact.buy(orderId).post({value});
		var evt = await artifacts.exchange.findEventFromReceipt('Buy', r);
		var values = evt[0].returnValues as any;
		console.log(r.events);
		return {
			buyer: values.buyer,
			orderId: BigInt(values.orderId),
			price: BigInt(values.price),
		};
	},

	// 历史购买记录
	async historyBuys(orderId: bigint): Promise<BuyRecord[]> {
		// TODO ...
		return [];
	},

	// 尝试结束一个拍卖订单
	async tryEndBid(orderId: bigint) {
		if (!await artifact.tryEndBid(orderId).call())
			return null;
		var r = await artifact.tryEndBid(orderId).post();
		var evt = await artifacts.exchange.findEventFromReceipt('BidDone', r);
		var values = evt[0].returnValues as any;
		// event BidDone(uint256 orderId, address winner, uint256 price);
		return {
			orderId: BigInt(values.orderId),
			winner: String(values.winner),
			price: BigInt(values.price),
		};
	},

	// 查看订单状态
	orderStatus(orderId: bigint): Promise<ex.OrderStatus> {
		return artifact.orderStatus(orderId).call();
	},

	// 查看资产信息
	assetOf(token: string, tokenId: bigint) {
		return artifact.assetOf({token, tokenId}).call();
	},

	// 查看订单信息
	orderVoteInfo(orderId: bigint) {
		// uint256 buyPrice // 当前竞拍最低价格
		// uint256 auctionDays, // 周期
		// uint256 shareRatio // 投票收益比
		return artifact.orderVoteInfo(orderId).call();
	},

	// 分页返回拍卖资产列表
	getSellingNFT(fromIndex: number, pageSize: number, ignoreZeroVote?: boolean, isTokenURI?: boolean) {
		return artifact.getSellingNFT(BigInt(fromIndex), BigInt(pageSize), !!ignoreZeroVote, !!isTokenURI).call();
	},

	assetsFrom(owner: Address, isTokenURI?: boolean): Promise<ex.NFTAsset[]> {
		return artifact.assetsFrom(owner, !!isTokenURI).call();
	},

	// 当前拍卖中的资产数量
	async getSellingNFTTotal() {
		return Number(await artifact.getSellingNFTTotal().call());
	},

}