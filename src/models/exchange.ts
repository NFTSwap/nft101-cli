
import {EventData} from 'web3z';
import somes from 'somes';
import artifacts from '../artifacts';
import * as ex from '../artifacts/Exchange';

export const artifact = artifacts.exchange.api;

export interface NFTAsset {
	asset: ex.Asset;
	tokenURI: string;
	selling?: ex.SellingNFTData;
}

class Exchange {

	async getSellingNFT101() {
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
	}

	async myNFTs() {
		var nfts: NFTAsset[] = [];
		return nfts;
	}

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
	}

	assetOf(asset: ex.AssetID) {
		return artifact.assetOf(asset).call();
	}

	bids(orderId: bigint) {
		return artifact.bids(orderId).call();
	}

	async withdraw(asset: ex.AssetID): Promise<{ token: string; tokenId: bigint; from: string }> {
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
	}

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
	}

	orderStatus(orderId: bigint): Promise<ex.OrderStatus> {
		return artifact.orderStatus(orderId).call();
	}

	orderVoteInfo(orderId: bigint) {
		return artifact.orderVoteInfo(orderId).call();
	}

}

export default new Exchange;