
import somes from 'somes';
import artifacts from '../artifacts';
import * as ex from '../artifacts/Exchange';

export const artifact = artifacts.exchange.api;

export interface NFTAsset {
	asset: ex.Asset;
	tokenURI: string;
	selling?: ex.SellingNFTData;
}

export default {

	// 返回当前拍卖排名最高的101个
	async getSellingNFT101() {
		// TODO ...
		var total = Number(await artifact.getSellingNFTTotal().call());
		var nfts: NFTAsset[] = [];
		if (total != 0) {
			var r = await artifact.getSellingNFT(BigInt(0), BigInt(Math.min(100, total)), false).call();
			for (var selling of r.nfts) {
				if (selling.orderId) {
					var asset = await artifact.assetOf({ token: selling.order.token, tokenId: selling.order.tokenId }).call();
					var tokenURI = await artifacts.nft(selling.order.token as string).api.tokenURI(selling.order.tokenId).call();
					nfts.push({ asset, tokenURI, selling })
				}
			}
		}
		return nfts;
	},

	// 返回我的资产列表
	async myNFTs() {
		// TODO ...
		var nfts: NFTAsset[] = [];
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
		var values = evt.returnValues as any;
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
		var values = evt.returnValues as any;
		return {
			token: values.token,
			orderId: BigInt(values.orderId),
			seller: values.seller,
			tokenId: BigInt(values.tokenId),
		};
	},

	// 拍卖出价
	async buy(orderId: bigint): Promise<{ buyer: string; orderId: bigint; price: bigint }> {
		// event Buy(uint256 indexed orderId, address buyer, uint256 price);
		await artifact.buy(orderId).call(); // test
		var r = await artifact.buy(orderId).post();
		var evt = await artifacts.exchange.findEventFromReceipt('Buy', r);
		var values = evt.returnValues as any;
		return {
			buyer: values.buyer,
			orderId: BigInt(values.orderId),
			price: BigInt(values.price),
		};
	},

	// 尝试结束一个拍卖订单
	async tryEndBid(orderId: bigint) {
		if (!await artifact.tryEndBid(orderId).call())
			return null;
		var r = await artifact.tryEndBid(orderId).post();
		var evt = await artifacts.exchange.findEventFromReceipt('BidDone', r);
		var values = evt.returnValues as any;
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
	getSellingNFT(fromIndex: number, pageSize: number, ignoreZeroVote?: boolean) {
		return artifact.getSellingNFT(BigInt(fromIndex), BigInt(pageSize), !!ignoreZeroVote).call();
	},

	// 当前拍卖中的资产数量
	async getSellingNFTTotal() {
		return Number(await artifact.getSellingNFTTotal().call());
	},

}