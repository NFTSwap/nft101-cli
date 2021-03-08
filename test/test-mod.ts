
import somes from 'somes';
import exchange from '../src/models/exchange';
import {newnft} from './test-sol';
import {contractAddress as NFTs} from '../src/artifacts/NFTs';
import {contractAddress as Exchange, AssetStatus} from '../src/artifacts/Exchange';

export default async function() {

	console.log(await exchange.getSellingNFT101());
	console.log(await exchange.myNFTs());

	var tokens = [
		'0x5b8a95286812302a5e997d920524c3084c5dde131a2e9e18ee96722eae246407',
		'0x6b8a95286812302a5e997d920524c3084c5dde131a2e9e18ee96722eae246407',
		'0x7b8a95286812302a5e997d920524c3084c5dde131a2e9e18ee96722eae246407',
	];
	var uri = 'https://ipfs.pixura.io/ipfs/QmSvZR32rfCDaKAPweFNa6ik8zoFkaGcMB5KYRNLgVMCwN/ultra-solem.mp4';

	for (var hash of tokens) {
		await newnft(hash, uri, 'nft_' + somes.random());
		var tokenId = BigInt(hash);
		var asset = await exchange.assetOf({token: NFTs, tokenId });
		if (asset.status == AssetStatus.List) { // sell
			var order = {
				token: NFTs, tokenId,
				maxSellPrice: BigInt(1e19),
				minSellPrice: BigInt(1e18), lifespan: BigInt(100),
			};
			console.log(await exchange.sell(order));
		}
	}

};