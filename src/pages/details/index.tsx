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
import * as util from '../../util';
import artifacts from '../../models/web3/artifacts';
import {exchange as ex, vote_pool as vp, user, SellingNFTData,NFTAsset,BuyRecord} from '../../models';
import Loading from 'webpkit/lib/loading';
import Dialog from 'webpkit/lib/dialog';
import './index.scss';

export default class extends Page<{token: string; tokenId: string}> {

	state = {
		data: null as (NFTAsset | null),
		historyBuys: null as (BuyRecord[] | null),
	};

	async _test(selling: SellingNFTData) {
		var fee_plan = artifacts.fee_plan.api;

		console.log('fee_plan.feeToVoterAtFirst', await fee_plan.feeToVoterAtFirst().call());
		console.log('fee_plan.feeToVoter       ', await fee_plan.feeToVoter().call());
		console.log('fee_plan.feeToTeamAtFirst ', await fee_plan.feeToTeamAtFirst().call());
		console.log('fee_plan.feeToTeam        ', await fee_plan.feeToTeam().call());

		var votes = await vp.orderTotalVotes(selling.orderId);
		console.log('vp.orderTotalVotes', votes);
		var formula =
			await fee_plan.formula(selling.order.maxSellPrice, true, votes).call();
		console.log(formula);
	}

	async triggerLoad() {
		await this._fetchData();
	}

	async _fetchData() {
		var data = await ex.assetSellingOf(this.params.token, BigInt(this.params.tokenId))
		var historyBuys = data.selling ? await ex.historyBuys(data.selling.orderId): null;
		this.setState({ data, historyBuys });

		if (data.selling)
			await this._test(data.selling);
	}

	private async _vote(data: NFTAsset) {
		var selling = data.selling as SellingNFTData;
		try {
			var { value, ok } = await new Promise((r)=>{
				Dialog.prompt({ text: 'Input vote count', value }, (value: string, ok: boolean)=>r({value, ok}));
			});
			if (!ok) return;
			await Loading.show();
			await vp.marginVote(selling.orderId, BigInt(value) * BigInt(1e18));
			Dialog.alert('Vote OK', ()=>this._fetchData());
		} finally {
			Loading.close();
		}
	}

	private async _sell(data: NFTAsset) {
		try {
			var { maxSellPrice, ok } = await new Promise((r)=>{
				Dialog.prompt({ text: 'Input max sell price' }, (maxSellPrice, ok)=>r({maxSellPrice, ok}));
			});
			if (!ok) return;

			var { minSellPrice, ok } = await new Promise((r)=>{
				Dialog.prompt({ text: 'Input min sell price' }, (minSellPrice, ok)=>r({minSellPrice, ok}));
			});
			if (!ok) return;

			var { lifespan, ok } = await new Promise((r)=>{
				Dialog.prompt({ text: 'Input YEAR DAYS' }, (lifespan, ok)=>r({lifespan, ok}));
			});
			if (!ok) return;

			await Loading.show();

			await ex.sell({
				token: data.token,
				tokenId: data.tokenId,
				maxSellPrice: BigInt(maxSellPrice) * BigInt(1e18),
				minSellPrice: BigInt(minSellPrice) * BigInt(1e18),
				lifespan: BigInt(lifespan),
			});

			Dialog.alert('Selling OK', ()=>this._fetchData());
		} finally {
			Loading.close();
		}
	}
	
	private async _buy(data: NFTAsset) {
		var selling = data.selling as SellingNFTData;
		try {
			var { value, ok } = await new Promise((r)=>{
				Dialog.prompt({ text: 'Input price', value }, (value: string, ok: boolean)=>r({value, ok}));
			});
			if (!ok) return;
			await Loading.show();
			await ex.buy(selling.orderId, BigInt(value) * BigInt(1e18));
			Dialog.alert('BUY OK', ()=>this._fetchData());
		} finally {
			Loading.close();
		}
	}
	
	private async _canEndSell(data: NFTAsset) {
		var selling = data.selling as SellingNFTData;
		try {
			await Loading.show();
			if (!await ex.tryEndBid(selling.orderId))
				return Dialog.alert(`It can't end`);
			this._fetchData();
		} finally {
			Loading.close();
		}
	}

	renderHistory(historyBuys: BuyRecord[]) {
		return (
			<div className="md-cell md-cell--12">
				<section className="collectible-history-section">
					<h2>History</h2>

					{historyBuys.map((e,j)=>{
						return (
							<section className="collectible-history-item" key={j}>
								<div className="collectible-history-item-action">
									<div>
										<span><a className="recent-activity-item-user-link" href="#">{util.asAddress(e.buyer)} </a> made an offer of </span>
										<span>{util.price(e.price)}</span>
										<span className="eth-symbol" style={{fontSize: '14px'}}>Ξ</span>
									</div>
								</div>
								{/* <span className="collectible-history-item-timestamp"><time dateTime="1608840252000">4 days ago</time></span>
								<a className="collectible-history-item-link" target="_blank"
									rel="noopener noreferrer"
									href="https://etherscan.io/tx/0x58eb013005cb722f367ddc70b9a82060baa3e5437033b94f8c3e330c16d3308d">[view tx]</a> */}
							</section>
						);
					})}
					
				</section>
			</div>
		);
	}

	renderSelling(selling: SellingNFTData) {

		return (
			<span>
				<div className="collectible-detail__collectible-current-bid">
					<p><span style={{display: 'inline-block', overflow: 'hidden'}}>&nbsp;Current offer: &nbsp;{util.price(selling.order.buyPrice)} <span
								className="eth-symbol" style={{fontSize: '12px'}}>Ξ</span></span></p>
				</div>

				<div className="collectible-detail__collectible-current-bid">
					<p><span style={{display: 'inline-block', overflow: 'hidden'}}>&nbsp;Votes: &nbsp;{util.price(selling.totalVotes)} <span
								className="eth-symbol" style={{fontSize: '12px'}}>Ξ</span></span></p>
				</div>

				<div className="collectible-detail__collectible-current-bid">
					<p><span style={{display: 'inline-block', overflow: 'hidden'}}>&nbsp;Big Buyer: &nbsp;{util.asAddress(selling.order.bigBuyer)} </span></p>
				</div>

				<div className="collectible-detail__collectible-current-bid">
					<p><span style={{display: 'inline-block', overflow: 'hidden'}}>&nbsp;Max Sell Price: &nbsp;{util.price(selling.order.maxSellPrice)} <span
								className="eth-symbol" style={{fontSize: '12px'}}>Ξ</span></span></p>
				</div>

				<div className="collectible-detail__collectible-current-bid">
					<p><span style={{display: 'inline-block', overflow: 'hidden'}}>&nbsp;Min Sell Price: &nbsp;{util.price(selling.order.minSellPrice)} <span
								className="eth-symbol" style={{fontSize: '12px'}}>Ξ</span></span></p>
				</div>

				<div className="collectible-detail__collectible-current-bid">
					<p><span style={{display: 'inline-block', overflow: 'hidden'}}>&nbsp;Expiry: &nbsp;{new Date(Number(selling.order.expiry) * 1e3).toString('yyyy-MM-dd hh:mm:ss')} <span
								className="eth-symbol" style={{fontSize: '12px'}}>Ξ</span></span></p>
				</div>
			</span>
		);
	}

	renderContent(data: NFTAsset) {

		var asset = data.asset;
		var address = user.addressNoJump();

		return (
			<div className="collectible-detail-wrapper">
				<div className="md-grid collectible-detail-grid">
					<div className="md-cell md-cell--3 collectible-detail-desktop-col-1">
						<h1 className="collectible-detail__collectible-name">{asset.name || data.tokenId}</h1>
						<div className="collectible-detail__collectible-scarcity-container">
							{/* <p className="collectible-detail__collectible-scarcity">Edition <span>1</span> of <span>1</span></p> */}
						</div>
						{/* <div className="collectible-detail__collectible-description">
							<div>
								<span><span><span>We are enter in the new</span><br/><span>era...postpandemic
											Choose</span><br/><span>the pills, choose the</span><br/><span>future</span></span><span
										style={{position: 'fixed', visibility: 'hidden', top: '0px', left: '0px'}}><span>... <a
												href="https://superrare.co/artwork-v2/2021-17575#" className="">Show
												more</a></span></span></span>
							</div>
							<div className="description-tags"><a href="https://superrare.co/discover?q=2021">#2021 </a><a
									href="https://superrare.co/discover?q=art">#art </a><a
									href="https://superrare.co/discover?q=artist">#artist </a><a
									href="https://superrare.co/discover?q=covid">#covid </a><a
									href="https://superrare.co/discover?q=cryptoart">#cryptoart </a><a
									href="https://superrare.co/discover?q=digitalart">#digitalart </a><a
									href="https://superrare.co/discover?q=digitalartist">#digitalartist </a><a
									href="https://superrare.co/discover?q=nftart">#nftart </a><a
									href="https://superrare.co/discover?q=pandemic">#pandemic </a><a
									href="https://superrare.co/discover?q=pills">#pills </a><a
									href="https://superrare.co/discover?q=postpandemic">#postpandemic </a><a
									href="https://superrare.co/discover?q=superrare">#superrare </a>
							</div>
						</div> */}

						{data.selling?this.renderSelling(data.selling): null}

						<div className="collectible-actions-container">

							{data.selling && asset.owner != address ?
							<div className="collectible-actions-btn-wrapper">
								<a href="#" onClick={()=>this._buy(data)}>
									<button type="button" 
										className="md-btn md-btn--flat md-btn--text md-pointer--hover md-background--primary md-background--primary-hover md-inline-block"
										style={{width: '100%', marginBottom: '2em'}}>Buy</button>
								</a>
							</div>
							: null}

							{!data.selling && asset.owner == address ?
							<div className="collectible-actions-btn-wrapper">
								<a href="#" onClick={()=>this._sell(data)}>
									<button type="button" 
										className="md-btn md-btn--flat md-btn--text md-pointer--hover md-background--primary md-background--primary-hover md-inline-block"
										style={{width: '100%', marginBottom: '2em'}}>Sell</button>
								</a>
							</div>: null
							}

							{data.selling ?
							<div className="collectible-actions-btn-wrapper">
								<a href="#" onClick={()=>this._vote(data)}>
									<button type="button" 
										className="md-btn md-btn--flat md-btn--text md-pointer--hover md-background--primary md-background--primary-hover md-inline-block"
										style={{width: '100%', marginBottom: '2em'}}>Vote</button>
								</a>
							</div>: null}

							{data.selling && asset.owner == address ?
							<div className="collectible-actions-btn-wrapper">
								<a href="#" onClick={()=>this._canEndSell(data)}>
									<button type="button" 
										className="md-btn md-btn--flat md-btn--text md-pointer--hover md-background--primary md-background--primary-hover md-inline-block"
										style={{width: '100%', marginBottom: '2em'}}>End sell</button>
								</a>
							</div>: null
							}

						</div>
					</div>
					<div className="md-cell md-cell--5 md-cell--1-desktop-offset collectible-detail-desktop-col-2">
						<div>
							<div>
								<a href="#">
									{data.tokenURI.indexOf('.mp4') != -1 ?
									<video
										src={data.tokenURI} preload="auto" 
										autoPlay={true} loop={true} playsInline={true} webkit-playsinline="" 
										x5-playsinline="" style={{ width: '100%', height: '100%' }} 
									/>: <img className="collectible-detail-image" src={data.tokenURI} />}
								</a>
								{/* <a href="https://superrare.co/artwork-v2/2021-17575#_" id="img1" className="lightbox "><img
										src="/test/tmp/Authentic Digital Art - 2021 _ SuperRare_files/2021.jpg" />
								</a> */}
							</div>
						</div>
					</div>
					<div className="md-cell md-cell--2 md-cell--1-desktop-offset collectible-detail-desktop-col-3">

						<div className="collectible-account-details">
							{/* <div className="account-details-container">
								<div className="md-inline-block md-avatar md-avatar--default account-details-avatar"><img
										src="/test/tmp/Authentic Digital Art - 2021 _ SuperRare_files/WWS.jpg" className="md-avatar-img" />
								</div>
								<div>
									<div className="account-details-username-container"><a className="account-details-username" href="#">None</a><br/></div>
									<span className="account-details-type">Artist</span>
								</div>
							</div> */}
							<div className="account-details-container null">
								<i className="account-details-placeholder-avatar" data-fa-i2svg="">
									<svg className="svg-inline--fa fa-user-circle fa-w-16" aria-hidden="true"
											data-prefix="fal" data-icon="user-circle" role="img" xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 496 512" data-fa-i2svg="">
										<path fill="currentColor"
											d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z">
										</path>
									</svg>
								</i>
								<div>
									<div className="account-details-username-container"><a className="account-details-username"
											href="#">{util.asAddress(asset.owner)}</a><br/></div><span
										className="account-details-type">Owner</span>
								</div>
							</div>
						</div>

						{/* <div className="collectible-metrics-container">
							<div className="collectible-likes-container">
								<div className="collectible-metrics-icon-container"><button
										style={{background: 'transparent', borderWidth: '0px', outline: '0px', color: 'black', padding: '0px'}}><svg
											width="24px" height="28px" viewBox="0 0 24 14">
											<g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
												<g id="Desktop---PDP-Copy" transform="translate(-1192.000000, -483.000000)">
													<g id="Group-9" transform="translate(1188.000000, 479.000000)">
														<path
															d="M19.5454545,5 C17.6363636,5 16,5.9952381 15,7.44285714 C14,5.9952381 12.3636364,5 10.4545455,5 C7.45454545,5 5,7.44285714 5,10.4285714 C5,15.8571429 15,24 15,24 C15,24 25,15.8571429 25,10.4285714 C25,7.44285714 22.5454545,5 19.5454545,5 Z"
															id="Shape" stroke="black" fill="none" stroke-width="1.20000005"
															stroke-linecap="square"></path>
													</g>
												</g>
											</g>
										</svg></button></div>
								<div className="collectible-metrics-data-container">
									<div className="collectible-metrics-data">0</div>
									<div className="collectible-metrics-label">Favorites</div>
								</div>
							</div>
							<div className="collectible-views-container">
								<div className="collectible-metrics-icon-container"><svg width="24px" height="14px" viewBox="0 0 24 14">
										<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
											<g id="Desktop---PDP-Copy" transform="translate(-1191.000000, -554.000000)">
												<g id="Icon_bounce-Copy" transform="translate(1188.000000, 546.000000)">
													<rect id="Rectangle-7-Copy" x="0" y="0" width="29" height="29"></rect>
													<g id="Group-6" transform="translate(4.000000, 9.000000)">
														<path
															d="M11,12 C14.7444171,12 18.1611044,10.2904985 21.2500619,6.87149553 L21.250057,6.87149108 C21.6972314,6.37653741 21.6972313,5.62345221 21.2500567,5.12849869 C18.1611006,1.70949956 14.744415,0 11,0 C7.25558289,0 3.83889559,1.70950149 0.749938098,5.12850447 L0.749943022,5.12850892 C0.302768552,5.62346259 0.30276868,6.37654779 0.749943318,6.87150131 C3.83889944,10.2905004 7.255585,12 11,12 Z"
															id="Oval-9" stroke="#000000" stroke-width="1.30000007"></path>
														<ellipse id="Oval-10" fill="#000000" cx="11" cy="6.5" rx="3" ry="3.5"></ellipse>
													</g>
												</g>
											</g>
										</g>
									</svg></div>
								<div className="collectible-metrics-data-container">
									<div className="collectible-metrics-data">17</div>
									<div className="collectible-metrics-label">Views</div>
								</div>
							</div>
						</div> */}

					</div>
					
					{this.state.historyBuys?.length?this.renderHistory(this.state.historyBuys):null}

					{/* <div className="md-cell md-cell--12">
						<div className="collectible-moreby-section">
							<h2>More Works By wws</h2>
							<div className="row ">
								<div className="col-md-2 col-xs-4 "><a href="https://superrare.co/artwork-v2/fate-17586">
										<div className="square-box">
											<div className="square-content"><img className="grid-img"
													src="/test/tmp/Authentic Digital Art - 2021 _ SuperRare_files/standard.jpg"
													alt="Fate - undefined" />
											</div>
										</div>
										<h4 className="collectible-card__name" style={{marginTop: '1.2em', paddingLeft: '0px'}}>Fate</h4>
									</a></div>
								<div className="col-md-2 col-xs-4 "><a href="https://superrare.co/artwork-v2/new-born-17414">
										<div className="square-box">
											<div className="square-content"><img className="grid-img"
													src="/test/tmp/Authentic Digital Art - 2021 _ SuperRare_files/standard(1).jpg"
													alt="NEW BORN - undefined" />
											</div>
										</div>
										<h4 className="collectible-card__name" style={{marginTop: '1.2em', paddingLeft: '0px'}}>NEW BORN</h4>
									</a></div>
								<div className="col-md-2 col-xs-4 "><a href="https://superrare.co/artwork-v2/digital-mountain-17016">
										<div className="square-box">
											<div className="square-content"><img className="grid-img"
													src="/test/tmp/Authentic Digital Art - 2021 _ SuperRare_files/standard.png"
													alt="Digital mountain - undefined" />
											</div>
										</div>
										<h4 className="collectible-card__name" style={{marginTop: '1.2em', paddingLeft: '0px'}}>Digital mountain</h4>
									</a></div>
								<div className="col-md-2 col-xs-4 "><a href="https://superrare.co/artwork-v2/liquid-modernity-17015">
										<div className="square-box">
											<div className="square-content"><img className="grid-img"
													src="/test/tmp/Authentic Digital Art - 2021 _ SuperRare_files/standard.gif"
													alt="Liquid modernity - undefined" />
											</div>
										</div>
										<h4 className="collectible-card__name" style={{marginTop: '1.2em', paddingLeft: '0px'}}>Liquid
											modernity</h4>
									</a></div>
								<div className="col-md-2 col-xs-4 "><a href="https://superrare.co/artwork-v2/antistress-16659">
										<div className="square-box">
											<div className="square-content"><img className="grid-img"
													src="/test/tmp/Authentic Digital Art - 2021 _ SuperRare_files/standard(2).jpg"
													alt="Antistress - undefined" />
											</div>
										</div>
										<h4 className="collectible-card__name" style={{marginTop: '1.2em', paddingLeft: '0px'}}>Antistress</h4>
									</a>
								</div>
								<div className="col-md-2 col-xs-4 "><a href="https://superrare.co/artwork-v2/satoshis-in-oil-16629">
										<div className="square-box">
											<div className="square-content"><img className="grid-img"
													src="/test/tmp/Authentic Digital Art - 2021 _ SuperRare_files/standard(3).jpg"
													alt="Satoshis in oil - undefined" />
											</div>
										</div>
										<h4 className="collectible-card__name" style={{marginTop: '1.2em', paddingLeft: '0px'}}>Satoshis in oil
										</h4>
									</a>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12" style={{paddingTop: '2em'}}><a className="collectible-card__name"
										href="https://superrare.co/wws/creations">View all works by @wws</a></div>
							</div>
						</div>
					</div> */}

				</div>
			</div>
		);
	}

	render() {
		var data = this.state.data;

		return (
			<div className="collectible-detail-page app-page">

				<Nav />

				{data?this.renderContent(data): <div>Loading...</div>}

				<Footer />

			</div>
		);
	}

}