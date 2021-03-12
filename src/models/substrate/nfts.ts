
import * as nfts from '../nfts';
import {Address} from 'web3z/solidity_types';

export class ApiIMPL implements nfts.APINFTs {

	contractAddress = '';

	safeMintURI(token: string, to: Address, tokenId: bigint, tokenURI: string, data?: Uint8Array): Promise<{
		from: string;
		to: string;
		tokenId: bigint;
	}> {
		return Promise.resolve({
			from: '',
			to: '',
			tokenId: BigInt(0),
		});
	}

	// 健全转移资产
	safeTransferFrom(token: string, from: string, to: string, tokenId: bigint, data?: Uint8Array): Promise<{
		from: string;
		to: string;
		tokenId: bigint;
	}> {
		return Promise.resolve({
			from: '',
			to: '',
			tokenId: BigInt(0),
		});
	}

}

export default new ApiIMPL;