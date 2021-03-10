/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2019, hardchain
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of hardchain nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL hardchain BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

import {Page,React, Link} from 'webpkit';
import Nav from '../../com/nav';
import Footer from '../../com/footer';
import artifacts from '../../artifacts';
import nfts from '../../models/nfts';
import './index.scss';
import Loading from 'webpkit/lib/loading';
import Dialog from 'webpkit/lib/dialog';
import web3 from '../../web3';
import * as user from '../../models/user';
import buffer from 'somes/buffer';
import {rng} from 'somes/rng';

export default class extends Page {

	state = { new_TokenId: ''};

	async _Transfer(token: string, tokenId: string, erc721_name: string) {
		var data_str = web3.eth.abi.encodeParameters(
			['uint16', 'uint16', 'string'], [0, 0, erc721_name]
		);
		var data = buffer.from(data_str.slice(2), 'hex');
		var address = user.addressNoJump();

		try {
			await Loading.show();
			await nfts.safeTransferFrom(token, address, artifacts.exchange.address, BigInt(tokenId), data);
			Dialog.alert('NFT Swap OK', ()=>(location.href = '/mynft'));
		} finally {
			Loading.close();
		}
	}

	async _NFTSwap() {
		var token = (this.refs.erc721 as HTMLInputElement).value;
		var tokenId = (this.refs.erc721_id as HTMLInputElement).value;
		var erc721_name = (this.refs.erc721_name as HTMLInputElement).value;
		await this._Transfer(token, tokenId, erc721_name);

		if (await new Promise((r)=>{
			Dialog.confirm({
				text: (
					<div>
						<div>转移完成，现在就去出售?</div>
					</div>
				)
			}, ok=>r(ok));
		})) {
			this.history.push(`/details?token=${token}&tokenId=${tokenId}`);
		}
	}

	async _NEWNFT() {
		var token = artifacts.nfts.address;
		var tokenId = '0x' + rng(32).toString('hex');
		var name = (this.refs.nft_name as HTMLInputElement).value;
		var uri = (this.refs.nft_uri as HTMLInputElement).value;
		var data_str = web3.eth.abi.encodeParameters(
			['uint16', 'uint16', 'string'], [0, 0, name]
		);
		var data = buffer.from(data_str.slice(2), 'hex');

		try {
			await Loading.show();
			this.setState({ new_TokenId: tokenId });
			await nfts.safeMintURI(token, artifacts.exchange.address, BigInt(tokenId), uri, data);
		} finally {
			Loading.close();
		}

		if (await new Promise((r)=>{
			Dialog.confirm({
				text: (
					<div>
						<div>创建成功，现在就去出售?</div>
					</div>
				)
			}, ok=>r(ok));
		})) {
			this.history.push(`/details?token=${token}&tokenId=${tokenId}`);
		}
	}

	_Sell() {
		this.history.push('/mynft');
	}
	
	render() {
		return (
			<div className="marketplace-page app-page sell">
				<Nav />

				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="marketplace__title">Publish</h1>
						</div>
					</div>

					<div className="panel" style={{border: 'none'}}>
						<div className="txt">
							<span>创建新的NFT资产</span>
						</div>
						ERC721协约：{artifacts.exchange.address}<br /><br />
						ERC721资产ID：{this.state.new_TokenId}<br /><br />
						ERC721资产名称：<input ref="nft_name" style={{width: '600px'}} /><br /><br />
						ERC721资产URI：<input ref="nft_uri" style={{width: '600px'}} /><br /><br />
						<div><button onClick={()=>this._NEWNFT()}>创建</button></div>
					</div>

					<div className="panel">
						<div className="txt">
							<h3>或</h3>
							<span>现有资产转移到NFTSwap</span>
						</div>
						ERC721协约：<input ref="erc721" style={{width: '600px'}} /><br /><br />
						ERC721资产ID：<input ref="erc721_id" style={{width: '600px'}} /><br /><br />
						ERC721资产名称：<input ref="erc721_name" style={{width: '600px'}} /><br /><br />
						<div><button onClick={()=>this._NFTSwap()}>转移</button></div>
					</div>

					<div className="panel">
						<div className="txt">
							<h3>或</h3>
							<span>将ERC721资产转移到 {artifacts.exchange.address} 协约 </span>
						</div>
						<button onClick={()=>this._Sell()}>转移完成去出售</button>
					</div>

				</div>

				<Footer/>

			</div>
		);
	}
}