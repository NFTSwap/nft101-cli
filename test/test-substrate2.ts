
import somes from 'somes';
import substrate, {decodeParameters, encodeParameters} from '../src/models/substrate';
import {exchange as ex, nfts} from '../src/models';
import user from '../src/models/substrate/user';

async function _test1() {
	var addres = await user.address();
	var uri = 'https://img20.360buyimg.com/pop/s1180x940_jfs/t1/141199/10/14094/60678/60482694E2b1f76db/554fbbd50e4dbb97.jpg.webp';
	var r = await nfts.safeMintURI(nfts.contractAddress, addres, BigInt(0), uri);
	console.log(r);
}

async function _test2() {
	var address = await user.address();
	var data_str = encodeParameters(['uint16', 'uint16', 'string'], [0, 0, 'ABCD']);
	var obj = decodeParameters(['uint16', 'uint16', 'string'], data_str);
	console.log(data_str, obj);
	var a = await substrate.query.nfts(5);
	console.log('substrate.query.nfts(4)', a.toJSON());
	var lastOrderId = (await substrate.query.nextOrderId()).toJSON() as any;
	console.log(lastOrderId);
	var orderId = (await substrate.query.nftOrder(0)).toJSON() as any;
	console.log(orderId);
	var allNfts = await substrate.query.nfts.keys();
	console.log(allNfts.map(e=>e.toJSON()));
	var nftid = Number((allNfts[1].toHuman() as any)[0]);
	var nft = await substrate.query.nfts(11);
	console.log(nft.toJSON());
	var nftids = await substrate.query.nftAccount.keys();

	for (var id of nftids) {
		var id_ = Number((id.toHuman() as any)[0]);
		var account = await substrate.query.nftAccount(id_);
		if (account.toJSON() == address) {
			var nft_ = (await substrate.query.nfts(id_)).toJSON() as any;
			console.log(nft_);
		}
	}

	console.log('ex.myNFTs()', await ex.myNFTs());

	debugger;

	var hash = await substrate.api.rpc.chain.getBlockHash(0);
	var block = await substrate.api.rpc.chain.getBlock(hash);
	var header = await substrate.api.rpc.chain.getHeader(hash);
	
	console.log(block);
	console.log(header);

	var Registry = await substrate.api.getBlockRegistry(hash);

	console.log(Registry);

	var bid = await substrate.query.bids(Number(0));

	console.log(bid);

	var num = await substrate.api.derive.chain.bestNumberFinalized();

	num.toHuman

	console.log('bestNumberFinalized', num.toJSON());

	var votes = (await substrate.query.votes(Number(orderId))).toJSON() as {order_id:number;amount:number;owner: string}[];

	console.log(votes);

	debugger
}

export default async function() {
	// await _test1();
	// await _test2();
}