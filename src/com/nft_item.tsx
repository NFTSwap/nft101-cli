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

import { ViewController, React, Link } from 'webpkit';
import {NFTAsset} from '../models/exchange';
import * as util from '../util';

export default class extends ViewController<{assets: NFTAsset}> {

	render() {
		var {tokenURI, token, tokenId, selling, asset} = this.props.assets;
		return (
			<div className="collectible-card col-sm-6 col-md-4">
				<Link to={`/details?token=${token}&tokenId=${tokenId}`}>
					<section className="md-media md-media--1-1">
						<div>

							{tokenURI.indexOf('.mp4') == -1 ?

							<img src={tokenURI} className="new-grid-img" />:

							<div>
								<div className="new-grid-img" style={{ width: '640px', height: '360px' }}>
									<video src={tokenURI} preload="auto" 
									autoPlay={true} loop={true} playsInline={true} webkit-playsinline="" 
									x5-playsinline="" style={{ width: '100%', height: '100%' }}></video>
								</div>
							</div>}

						</div>
					</section>
				</Link>
				<div className="collectible-card__info-container">
					<div className="collectible-card__first-section" style={{ width: '95%' }}>
						<a className="collectible-card__name" href="#">{asset.name || tokenId}</a>
					</div>

					<div className="collectible-card__price-item-container">

						<div className="collectible-card__price-item">
							<a className="collectible-card__price-number" href="#">
								<div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
									<span>{util.price(selling?.order.maxSellPrice)}</span>
									<span className="eth-symbol" style={{ fontSize: '15px' }}>Ξ</span> ($
									<span>{util.priceDollar(selling?.order.maxSellPrice)}</span>)
								</div>
							</a>
							<p className="collectible-card__price-text ">Max price</p>
						</div>

						<div className="collectible-card__price-item">
							<a className="collectible-card__price-number" href="#">
								<span>{util.price(selling?.order.buyPrice)}</span>
								<span className="eth-symbol" style={{ fontSize: '15px' }}>Ξ</span> 
								($<span>{util.priceDollar(selling?.order.buyPrice)}</span>)
							</a>
							<p className="collectible-card__price-text">Current offer by<a className="collectible-card__price-username" 
								href="#">{util.asAddress(selling?.order.bigBuyer)}</a>
							</p>
						</div>

					</div>

					<div className="collectible-card__user-section" style={{ visibility: 'visible', }}>
						<hr className="collectible-card__user-section-divider" />
						<div className="collectible-card__user-container">
							<div className="collectible-card__user-item">
								<div className="collectible-card__user-title"> ARTIST </div>
								<a className="user" href="#">
									<div className="md-inline-block md-avatar md-avatar--default user__avatar">
										<img src="/test/tmp/Market _ SuperRare_files/QmYvnX9ZMFGf1XxmNi42G3BUXanYKDfu9BvZK9o4QusGva" className="md-avatar-img" />
									</div>
									<div className="user__username"> None </div>
								</a>
							</div>
							<div className="collectible-card__user-item">
								<div className="collectible-card__user-title">
									OWNER
								</div>
								<a className="user" href="#">
									<div className="md-inline-block md-avatar md-avatar--default user__avatar">
										<img src="/test/tmp/Market _ SuperRare_files/QmYvnX9ZMFGf1XxmNi42G3BUXanYKDfu9BvZK9o4QusGva" className="md-avatar-img" />
									</div>
									<div className="user__username">
										{asset.owner}
									</div>
								</a>
							</div>
						</div>
					</div>

				</div>
			</div>
		);
	}

}