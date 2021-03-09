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

import {Page,React} from 'webpkit';
import Nav from '../../com/nav';
import Footer from '../../com/footer';
import ledger from '../../models/ledger';
import vp from '../../models/vote_pool';
import artifacts from '../../artifacts';
import * as user from '../../models/user';
import './index.scss';

export default class extends Page {

	state = { balanceOf: BigInt(0) };

	async triggerLoad() {
		var address = user.addressNoJump();
		var balanceOf = await ledger.balanceOf(address);
		var items = await ledger.lockedItems(address);
		var ledger_add = await artifacts.vote_pool.api.ledger().call();
		console.log(ledger_add)
		debugger
		this.setState({ balanceOf, items });
	}

	async _Settle() {
		debugger
		var address = user.addressNoJump();
		var eth = await vp.canRelease(address);
		console.log(eth);
		await vp.cancelVote(BigInt(12));
		var votes = await vp.allVotes(address);
		debugger

		for (var vote of votes) {
			var vote_o = await vp.votesById(vote);
			console.log(vote_o)
		}
		// await vp.tryRelease(address);
	}

	render() {
		var {balanceOf} = this.state;
		return (
			<div className="marketplace-page app-page sell">
				<Nav />

				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="marketplace__title">Income</h1>
						</div>
					</div>

					<div>
						<button onClick={()=>this._Settle()}>Settle</button>
					</div>

					<div>
						balanceOf: {String(balanceOf)}
					</div>

					<div>
						
					</div>

				</div>

				<Footer />

			</div>
		);
	}

}