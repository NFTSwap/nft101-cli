
import buffer from 'somes/buffer'
import artifacts from '../artifacts';

export const artifact = artifacts.nfts.api;

export default {

	tokenURI(token: string, tokenId: bigint): Promise<string> {
		return artifacts.nft(token).api.tokenURI(tokenId).call();
	},

	async setTokenURI(token: string, tokenId: bigint, tokenURI: string): Promise<void> {
		var nft = artifacts.nft(token);
		await nft.api.setTokenURI(tokenId, tokenURI).call();
		await nft.api.setTokenURI(tokenId, tokenURI).post();
	},

	async mint(token: string, tokenId: bigint) {
		var nft = artifacts.nft(token);
		await nft.api.mint(tokenId).call();
		var r = await nft.api.mint(tokenId).post();
		var evt = await nft.findEventFromReceipt('Transfer', r);
		var values = evt.returnValues as any;
		return {
			from: values.address as string,
			to: values.to as string,
			tokenId: BigInt(values.tokenId),
		};
	},

	async safeTransferFrom(token: string, from: string, to: string, tokenId: bigint, data?: Uint8Array) {
		var nft = artifacts.nft(token);
		var data_ = data ? buffer.from(data).toString('hex'): '0x0';
		await nft.api.safeTransferFrom(from, to, tokenId, data_).call();
		var r = await nft.api.safeTransferFrom(from, to, tokenId, data_).post();
		var evt = await nft.findEventFromReceipt('Transfer', r);
		var values = evt.returnValues as any;
		return {
			from: values.address as string,
			to: values.to as string,
			tokenId: BigInt(values.tokenId),
		};
	},

	exists(token: string, tokenId: bigint) {
		return artifacts.nft(token).api.exists(tokenId).call();
	},

}