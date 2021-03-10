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

export default class extends Page {

	async _NFTSwap() {
		
		var token = (this.refs.erc721 as HTMLInputElement).value;
		var token_id = (this.refs.erc721_id as HTMLInputElement).value;
		var erc721_name = (this.refs.erc721_name as HTMLInputElement).value;
		var data_str = web3.eth.abi.encodeParameters(
			['uint16', 'uint16', 'string'], [0, 0, erc721_name]
		);
		var data = buffer.from(data_str.slice(2), 'hex');
		var address = user.addressNoJump();

		try {
			await Loading.show();
			await nfts.safeTransferFrom(token, address, artifacts.exchange.address, BigInt(token_id), data);
			Dialog.alert('NFT Swap OK', ()=>(location.href = '/mynft'));
		} finally {
			Loading.close();
		}
	}
	
	render() {
		return (
			<div className="marketplace-page app-page sell">
				<Nav />

				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="marketplace__title">Sell</h1>
						</div>
					</div>

					<div style={{textAlign: 'center'}}>
						ERC721协约：<input ref="erc721" style={{width: '300px'}} /><br /><br />
						ERC721资产ID：<input ref="erc721_id" style={{width: '300px'}} /><br /><br />
						ERC721资产名称：<input ref="erc721_name" style={{width: '300px'}} /><br /><br />
						<button onClick={()=>this._NFTSwap()}>转移到NFTSwap</button>
					</div>

					<div style={{textAlign: 'center'}}>

						<br/><br/>
						<h2>或</h2><br/>

						将ERC721资产转移到 {artifacts.exchange.address} 协约<br /><br/>
						<Link to="/mynft">转移完成去出售</Link>
					</div>

				</div>

				<Footer/>

			</div>
		);
	}
}