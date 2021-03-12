
import * as ex from '../exchange';

export class ApiIMPL implements ex.APIExchange {

	contractAddress = '';

	assetSellingOf(token: string, tokenId: bigint): Promise<ex.NFTAsset> {
		return Promise.resolve({
			asset: {
				owner: '',
				status: ex.AssetStatus.List,
				category: 0,
				flags: 0,
				name: '',
				lastOrderId: BigInt(0),
				lastDealOrderId: BigInt(0),
				arrayIndex: BigInt(0),
			},
			token: '',
			tokenId: BigInt(0),
			tokenURI: '',
		});
	}

	// 返回当前拍卖排名最高的101个
	getNFT101(): Promise<ex.NFTAsset[]> {
		return Promise.resolve([]);
	}

	// 返回我的资产列表
	myNFTs(): Promise<ex.NFTAsset[]> {
		return Promise.resolve([]);
	}

	// 订单信息
	bids(orderId: bigint): Promise<ex.SellStore> {
		return Promise.resolve({
			token: '',
			tokenId: BigInt(0),
			maxSellPrice: BigInt(0),
			minSellPrice: BigInt(0),
			lifespan: BigInt(0),
			expiry: BigInt(0),
			buyPrice: BigInt(0),
			bigBuyer: '',
		});
	}

	// 拍卖资产
	sell(order: ex.SellOrder): Promise<{ token: string; tokenId: bigint; seller: string; orderId: bigint }> {
		return Promise.resolve({
			token: '',
			tokenId: BigInt(0),
			seller: '',
			orderId: BigInt(0),
		});
	}

	// 拍卖出价
	buy(orderId: bigint, price: bigint): Promise<{ buyer: string; orderId: bigint; price: bigint }> {
		return Promise.resolve({
			buyer: '',
			orderId: BigInt(0),
			price: BigInt(0),
		});
	}

	// 历史购买记录
	historyBuys(orderId: bigint): Promise<ex.BuyRecord[]> {
		return Promise.resolve([]);
	}

	// 尝试结束一个拍卖订单
	tryEndBid(orderId: bigint): Promise<{
		orderId: bigint;
		winner: string;
		price: bigint;
	} | null> {
		return Promise.resolve(null);
	}

	// 查看订单状态
	orderStatus(orderId: bigint): Promise<ex.OrderStatus> {
		return Promise.resolve(ex.OrderStatus.Ing);
	}

	// 查看资产信息
	assetOf(token: string, tokenId: bigint): Promise<ex.Asset> {
		return Promise.resolve({
			owner: '',
			status: ex.AssetStatus.List,
			category: 0,
			flags: 0,
			name: '',
			lastOrderId: BigInt(0),
			lastDealOrderId: BigInt(0),
			arrayIndex: BigInt(0),
		});
	}

}

export default new ApiIMPL;