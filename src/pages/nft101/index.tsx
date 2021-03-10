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

import { Page, React } from 'webpkit';
import Nav from '../../com/nav';
import Footer from '../../com/footer';
import NftItem from '../../com/nft_item';
import ex, {NFTAsset} from '../../models/exchange';
import './index.scss';

export default class extends Page {

	state: { assets?: NFTAsset[] } = {};

	async triggerLoad() {
		this.setState({ assets: await ex.getNFT101() });
	}

	renderContent() {
		return (
			<div className="row new-grid-row-margin-l-r">
				<div className="collectible-card col-sm-6 col-md-4">
					<a href="https://superrare.co/artwork-v2/ultra-solem-17573">
						<section className="md-media md-media--1-1">
							<div>
								<div>
									<div className="new-grid-img" style={{ width: '640px', height: '360px' }}>
										<video src="https://ipfs.pixura.io/ipfs/QmSvZR32rfCDaKAPweFNa6ik8zoFkaGcMB5KYRNLgVMCwN/ultra-solem.mp4" preload="auto" autoPlay={true} loop={true} playsInline={true} webkit-playsinline="" x5-playsinline="" style={{ width: '100%', height: '100%' }}></video>
									</div>
								</div>
							</div>
						</section>
					</a>
					<div className="collectible-card__info-container">
						<div className="collectible-card__first-section" style={{ width: '95%' }}>
							<a className="collectible-card__name" href="https://superrare.co/artwork-v2/ultra-solem-17573">Ultra Solem</a>
						</div>
						<div className="collectible-card__price-item-container">
							<div className="collectible-card__price-item">
								<a className="collectible-card__price-number" href="https://superrare.co/artwork-v2/ultra-solem-17573">
									<div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
										<span>1.288</span>
										<span className="eth-symbol" style={{ fontSize: '15px' }}>Ξ</span> ($
										<span>728</span>)
									</div>
								</a>
								<p className="collectible-card__price-text ">List price</p>
							</div>
							<div className="collectible-card__price-item">
								<a className="collectible-card__price-number" href="https://superrare.co/artwork-v2/ultra-solem-17573"><span>0.7</span><span className="eth-symbol" style={{ fontSize: '15px' }}>Ξ</span> ($<span>408</span>)</a>
								<p className="collectible-card__price-text">Current offer by<a className="collectible-card__price-username" href="https://superrare.co/collin2">@collin2</a>
								</p>
							</div>
						</div>
						<div className="collectible-card__user-section" style={{ visibility: 'visible' }}>
							<hr className="collectible-card__user-section-divider" />
							<div className="collectible-card__user-container">
								<div className="collectible-card__user-item">
									<div className="collectible-card__user-title"> ARTIST </div>
									<a className="user" href="https://superrare.co/garycartlidge">
										<div className="md-inline-block md-avatar md-avatar--default user__avatar">
											<img src="/test/tmp/Market _ SuperRare_files/QmYvnX9ZMFGf1XxmNi42G3BUXanYKDfu9BvZK9o4QusGva" className="md-avatar-img" />
										</div>
										<div className="user__username"> garycartlidge </div>
									</a>
								</div>
								<div className="collectible-card__user-item">
									<div className="collectible-card__user-title">
										OWNER
									</div>
									<a className="user" href="https://superrare.co/garycartlidge">
										<div className="md-inline-block md-avatar md-avatar--default user__avatar">
											<img src="/test/tmp/Market _ SuperRare_files/QmYvnX9ZMFGf1XxmNi42G3BUXanYKDfu9BvZK9o4QusGva" className="md-avatar-img" />
										</div>
										<div className="user__username">
											garycartlidge
										</div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="collectible-card col-sm-6 col-md-4">
					<a href="https://superrare.co/artwork-v2/still-drunk-13085">
						<section className="md-media md-media--1-1">
							<div>
								<img src="/test/tmp/Market _ SuperRare_files/still-drunk.png" className="new-grid-img" alt="STILL DRUNK - mixed media from brush pen on paper. part two of a series. " />
							</div>
						</section>
					</a>
					<div className="collectible-card__info-container">
						<div className="collectible-card__first-section" style={{ width: '95%' }}>
							<a className="collectible-card__name" href="https://superrare.co/artwork-v2/still-drunk-13085">STILL DRUNK</a>
						</div>
						<div className="collectible-card__price-item-container">
							<div className="collectible-card__price-item">
								<a className="collectible-card__price-number" href="https://superrare.co/artwork-v2/still-drunk-13085">
									<div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
										<span>0.412</span>
										<span className="eth-symbol" style={{ fontSize: '15px' }}>Ξ</span> ($
										<span>233</span>)
									</div>
								</a>
								<p className="collectible-card__price-text ">List price</p>
							</div>
						</div>
						<div className="collectible-card__user-section" style={{ visibility: 'visible' }}>
							<hr className="collectible-card__user-section-divider" />
							<div className="collectible-card__user-container">
								<div className="collectible-card__user-item">
									<div className="collectible-card__user-title"> ARTIST </div>
									<a className="user" href="https://superrare.co/sauce_k">
										<div className="md-inline-block md-avatar md-avatar--default user__avatar">
											<img src="/test/tmp/Market _ SuperRare_files/SAUCEEEEpng.png" className="md-avatar-img" />
										</div>
										<div className="user__username"> sauce_k </div>
									</a>
								</div>
								<div className="collectible-card__user-item">
									<div className="collectible-card__user-title"> OWNER </div>
									<a className="user" href="https://superrare.co/collin2">
										<div className="md-inline-block md-avatar md-avatar--default user__avatar">
											<img src="/test/tmp/Market _ SuperRare_files/NASA_NFTs_still.png" className="md-avatar-img" />
										</div>
										<div className="user__username"> collin2 </div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="collectible-card col-sm-6 col-md-4">
					<a href="https://superrare.co/artwork-v2/distraction-every-day-17533">
						<section className="md-media md-media--1-1">
							<div>
								<div className="loading__media-container">
									<img src="/test/tmp/Market _ SuperRare_files/distraction-every-day.png" className="new-grid-img" />
									<div className="loading__media-shimmer new-grid-img"> &nbsp; </div>
								</div>
							</div>
						</section>
					</a>
					<div className="collectible-card__info-container">
						<div className="collectible-card__first-section" style={{ width: '95%' }}>
							<a className="collectible-card__name" href="https://superrare.co/artwork-v2/distraction-every-day-17533">Distraction every day</a>
						</div>
						<div className="collectible-card__price-item-container">
							<div className="collectible-card__price-item">
								<a className="collectible-card__price-number" href="https://superrare.co/artwork-v2/distraction-every-day-17533">
									<div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
										<span>0.412</span>
										<span className="eth-symbol" style={{ fontSize: '15px' }}>Ξ</span> ($
										<span>233</span>)
									</div>
								</a>
								<p className="collectible-card__price-text ">List price</p>
							</div>
						</div>
						<div className="collectible-card__user-section" style={{ visibility: 'visible' }}>
							<hr className="collectible-card__user-section-divider" />
							<div className="collectible-card__user-container">
								<div className="collectible-card__user-item">
									<div className="collectible-card__user-title"> ARTIST </div>
									<a className="user" href="https://superrare.co/suryanto">
										<div className="md-inline-block md-avatar md-avatar--default user__avatar">
											<img src="/test/tmp/Market _ SuperRare_files/-4sy2l5.jpg" className="md-avatar-img" />
										</div>
										<div className="user__username"> suryanto </div>
									</a>
								</div>
								<div className="collectible-card__user-item">
									<div className="collectible-card__user-title"> OWNER </div>
									<a className="user" href="https://superrare.co/collin2">
										<div className="md-inline-block md-avatar md-avatar--default user__avatar">
											<img src="/test/tmp/Market _ SuperRare_files/NASA_NFTs_still.png" className="md-avatar-img" />
										</div>
										<div className="user__username">
											collin2
										</div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="collectible-card col-sm-6 col-md-4">
					<a href="https://superrare.co/artwork-v2/freedom-17367">
						<section className="md-media md-media--1-1">
							<div>
								<img src="/test/tmp/Market _ SuperRare_files/freedom.jpg" className="new-grid-img" alt="Freedom - Astro looking into THE FACE OF FREEDOM #bitcoin A popular selection from [Astro In Cryptoland]. [Bonus] Digital still render to be included print ready. " />
							</div>
						</section>
					</a>
					<div className="collectible-card__info-container">
						<div className="collectible-card__first-section" style={{ width: '75%' }}>
							<a className="collectible-card__name" href="https://superrare.co/artwork-v2/freedom-17367">Freedom</a>
							<div className="sc-fzoxKX craeZe">
								<a className="user" href="https://superrare.co/mbsjq">
									<div className="md-inline-block md-avatar md-avatar--default user__avatar">
										<img src="/test/tmp/Market _ SuperRare_files/SR-Profile_8.gif" className="md-avatar-img" />
									</div>
								</a>
								<a className="user" href="https://superrare.co/mbsjq">
									<div className="md-inline-block md-avatar md-avatar--default user__avatar">
										<img src="/test/tmp/Market _ SuperRare_files/SR-Profile_8.gif" className="md-avatar-img" />
									</div>
								</a>
							</div>
							{/* <div id="container" className="sc-fzqNqU bCfhgK"> */}
							<div id="container" className="sc-fzqNqU jJAOtC">
								<div>
									<p>Auction starts in -19249 blocks<img alt="tooltip" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAN5JREFUOBGtlcENgzAMRWtEbp2g167AIGEtpmEQRuiZBdpbD+F/GktFQIISWzKW7OTFAdvI7UBCCA5uH7WDfcRlM+wEHaki8o3+cwNYD31Bc8I1/SkJwQY65CgHce5pduBCmPKHDRBeXrNWftcHxUGT70xPz5xIhuPd+TWfuqnCkuFbPnIQZpZbE+OeGbLOrKQTHP4G7Z4iooCF8QuZfvb1kyJfiBHIdrKSmUD2ppVMBLLRrWTkizYt7DUzQO1aT+8KaMmkYSVRtsOBUDhtx9dfplUDdu0AhalFtsW/gAV+eo9ElrVKagAAAABJRU5ErkJggg=="
										style={{ width: '10px', marginLeft: '8px', position: 'relative', top: '-1px' }} /></p>
									<span className="count"><span>
										<p className="count-value">2</p>
										<p className="count-label">Days</p>
									</span><span>
											<p className="count-value">22</p>
											<p className="count-label">Hours</p>
										</span><span>
											<p className="count-value">34</p>
											<p className="count-label">Minutes</p>
										</span><span>
											<p className="count-value">13</p>
											<p className="count-label">Seconds</p>
										</span></span>
								</div>
							</div>
						</div>
						<div className="collectible-card__price-item-container">
							<div className="collectible-card__price-item">
								<span className="collectible-card__price-number collectible-card__price-number--inactive">–</span>
								<p className="collectible-card__price-text collectible-card__price-text--inactive">Current bid</p>
							</div>
						</div>
						<div className="collectible-card__user-section" style={{ visibility: 'hidden' }}>
							<hr className="collectible-card__user-section-divider" />
							<div className="collectible-card__user-container">
								<div className="collectible-card__user-item">
									<div className="collectible-card__user-title">
										ARTIST
									</div>
									<a className="user" href="https://superrare.co/mbsjq">
										<div className="md-inline-block md-avatar md-avatar--default user__avatar">
											<img src="/test/tmp/Market _ SuperRare_files/SR-Profile_8.gif" className="md-avatar-img" />
										</div>
										<div className="user__username">
											mbsjq
										</div>
									</a>
								</div>
								<div className="collectible-card__user-item">
									<div className="collectible-card__user-title">
										OWNER
									</div>
									<a className="user" href="https://superrare.co/mbsjq">
										<div className="md-inline-block md-avatar md-avatar--default user__avatar">
											<img src="/test/tmp/Market _ SuperRare_files/SR-Profile_8.gif" className="md-avatar-img" />
										</div>
										<div className="user__username">
											mbsjq
										</div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="collectible-card col-sm-6 col-md-4">
					<a href="/artwork-v2/no-stone-unturned-17642">
						<section className="md-media md-media--1-1">
							<div><img src="https://ipfs.pixura.io/ipfs/Qme7jmgEKjievWYiWp4wjHmHuM78PjLcckVZjQeKF4j32v/no-stone-unturned.png"
									className="new-grid-img"
									alt="No Stone Unturned - Exploring is endless. This is where creativity starts, and what an adventure it is." />
							</div>
						</section>
					</a>
					<div className="collectible-card__info-container">
						<div className="collectible-card__first-section" style={{width: '75%'}}><a className="collectible-card__name"
								href="https://superrare.co/artwork-v2/no-stone-unturned-17642">No Stone Unturned</a><span className="sc-fzqPZZ gXikXG">RESERVE
								MET</span>
							<div className="sc-fzoxKX craeZe"><a className="user" href="https://superrare.co/animatttic">
									<div className="md-inline-block md-avatar md-avatar--default user__avatar"><img
											src="https://ipfs.pixura.io/ipfs/QmanKayArjpEkS8Q2s6nBr4iQupK8XAgEW79Ss2z7yzN1A/A7085847-4AB4-4965-A359-CD289E46F202.jpeg"
											className="md-avatar-img" /></div>
								</a><a className="user" href="https://superrare.co/animatttic">
									<div className="md-inline-block md-avatar md-avatar--default user__avatar"><img
											src="https://ipfs.pixura.io/ipfs/QmanKayArjpEkS8Q2s6nBr4iQupK8XAgEW79Ss2z7yzN1A/A7085847-4AB4-4965-A359-CD289E46F202.jpeg"
											className="md-avatar-img" /></div>
								</a></div>
							<div id="container" className="sc-fzqNqU jJAOtC">
								<div>
									<p>Auction ends in 2,730 blocks<img alt="tooltip"
											src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAN5JREFUOBGtlcENgzAMRWtEbp2g167AIGEtpmEQRuiZBdpbD+F/GktFQIISWzKW7OTFAdvI7UBCCA5uH7WDfcRlM+wEHaki8o3+cwNYD31Bc8I1/SkJwQY65CgHce5pduBCmPKHDRBeXrNWftcHxUGT70xPz5xIhuPd+TWfuqnCkuFbPnIQZpZbE+OeGbLOrKQTHP4G7Z4iooCF8QuZfvb1kyJfiBHIdrKSmUD2ppVMBLLRrWTkizYt7DUzQO1aT+8KaMmkYSVRtsOBUDhtx9dfplUDdu0AhalFtsW/gAV+eo9ElrVKagAAAABJRU5ErkJggg=="
											style={{width: '10px', marginLeft: '8px', position: 'relative', top: '-1px'}} /></p><span className="count"><span>
											<p className="count-value">0</p>
											<p className="count-label">Days</p>
										</span><span>
											<p className="count-value">10</p>
											<p className="count-label">Hours</p>
										</span><span>
											<p className="count-value">0</p>
											<p className="count-label">Minutes</p>
										</span><span>
											<p className="count-value">10</p>
											<p className="count-label">Seconds</p>
										</span></span>
								</div><button className="sc-fzoyTs jZUSDr bid-button">Place a Bid</button>
							</div>
						</div>
						<div className="collectible-card__price-item-container">
							<div className="collectible-card__price-item"><a className="collectible-card__price-number"
									href="https://superrare.co/artwork-v2/no-stone-unturned-17642"><span>1.25</span><span className="eth-symbol"
										style={{fontSize: '15px'}}>Ξ</span> ($<span>916</span>)</a>
								<p className="collectible-card__price-text">Current high bid by<a className="collectible-card__price-username"
										href="https://superrare.co/deej">@deej</a></p>
							</div>
						</div>
						<div className="collectible-card__user-section" style={{visibility: 'visible'}}>
							<hr className="collectible-card__user-section-divider" />
							<div className="collectible-card__user-container">
								<div className="collectible-card__user-item">
									<div className="collectible-card__user-title">ARTIST</div><a className="user" href="/animatttic">
										<div className="md-inline-block md-avatar md-avatar--default user__avatar"><img
												src="https://ipfs.pixura.io/ipfs/QmanKayArjpEkS8Q2s6nBr4iQupK8XAgEW79Ss2z7yzN1A/A7085847-4AB4-4965-A359-CD289E46F202.jpeg"
												className="md-avatar-img" /></div>
										<div className="user__username">animatttic</div>
									</a>
								</div>
								<div className="collectible-card__user-item">
									<div className="collectible-card__user-title">OWNER</div><a className="user" href="/animatttic">
										<div className="md-inline-block md-avatar md-avatar--default user__avatar"><img
												src="https://ipfs.pixura.io/ipfs/QmanKayArjpEkS8Q2s6nBr4iQupK8XAgEW79Ss2z7yzN1A/A7085847-4AB4-4965-A359-CD289E46F202.jpeg"
												className="md-avatar-img" /></div>
										<div className="user__username">animatttic</div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="collectible-card col-sm-6 col-md-4">
					<a href="https://superrare.co/artwork-v2/you-must-bite-before-you-can-chew-16914">
						<section className="md-media md-media--1-1">
							<div><img
									src="https://ipfs.pixura.io/ipfs/QmX3Y5cZJwKmRKbpWta3fYqbgrXBmoSmUdJZX7PpH3atWL/you-must-bite-before-you-can-chew.jpg"
									className="new-grid-img" alt="You Must Bite Before You Can Chew - Ah man, not another nosebleed!" /></div>
						</section>
					</a>
					<div className="collectible-card__info-container">
						<div className="collectible-card__first-section" style={{width: '95%'}}><a className="collectible-card__name"
								href="https://superrare.co/artwork-v2/you-must-bite-before-you-can-chew-16914">You Must Bite Before You Can Chew</a><span
								className="sc-fzqPZZ gXikXG">
								<div><span>RESERVE:</span> <span>3.2</span><span className="eth-symbol" style={{fontSize: '11px'}}>Ξ</span></div>
							</span></div>
						<div className="collectible-card__price-item-container">
							<div className="collectible-card__price-item"><span
									className="collectible-card__price-number collectible-card__price-number--inactive">–</span>
								<p className="collectible-card__price-text collectible-card__price-text--inactive">Current bid</p>
							</div>
						</div>
						<div className="collectible-card__user-section" style={{visibility: 'visible'}}>
							<hr className="collectible-card__user-section-divider" />
							<div className="collectible-card__user-container">
								<div className="collectible-card__user-item">
									<div className="collectible-card__user-title">ARTIST</div><a className="user" href="https://superrare.co/sea_well">
										<div className="md-inline-block md-avatar md-avatar--default user__avatar"><img
												src="https://ipfs.pixura.io/ipfs/QmSsxtDxy4kS7Bf3hgF5FgFSVq4ffd9b2s5hBL3CvxJzka/IMG_0298.jpg"
												className="md-avatar-img" /></div>
										<div className="user__username">sea_well</div>
									</a>
								</div>
								<div className="collectible-card__user-item">
									<div className="collectible-card__user-title">OWNER</div><a className="user" href="https://superrare.co/sea_well">
										<div className="md-inline-block md-avatar md-avatar--default user__avatar"><img
												src="https://ipfs.pixura.io/ipfs/QmSsxtDxy4kS7Bf3hgF5FgFSVq4ffd9b2s5hBL3CvxJzka/IMG_0298.jpg"
												className="md-avatar-img" /></div>
										<div className="user__username">sea_well</div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="collectible-card col-sm-6 col-md-4">
					<a href="https://superrare.co/artwork-v2/exhibition-17473">
						<section className="md-media md-media--1-1">
							<div><img src="https://ipfs.pixura.io/ipfs/QmSeFXmrjEtEW9P6ouvKs7sFRv9JeYpSdrZz9Lzz6ow2hy/exhibition.png"
									className="new-grid-img" alt="Exhibition - Early morning exhibition in a remote area" /></div>
						</section>
					</a>
					<div className="collectible-card__info-container">
						<div className="collectible-card__first-section" style={{width: '75%'}}><a className="collectible-card__name"
								href="https://superrare.co/artwork-v2/exhibition-17473">Exhibition</a><span className="sc-fzqPZZ gXikXG">RESERVE MET</span>
							<div className="sc-fzoxKX craeZe"><a className="user" href="https://superrare.co/manards">
									<div className="md-inline-block md-avatar md-avatar--default user__avatar"><img
											src="https://ipfs.pixura.io/ipfs/QmaNuLLHzuaxLB8sCTYJoMkzh1hTSNFbgEPg7QrCWqkQAm" className="md-avatar-img" />
									</div>
								</a><a className="user" href="https://superrare.co/manards">
									<div className="md-inline-block md-avatar md-avatar--default user__avatar"><img
											src="https://ipfs.pixura.io/ipfs/QmaNuLLHzuaxLB8sCTYJoMkzh1hTSNFbgEPg7QrCWqkQAm" className="md-avatar-img" />
									</div>
								</a></div>
							<div id="container" className="sc-fzqNqU jJAOtC">
								<div>
									<p>Auction ends in 1,389 blocks<img alt="tooltip"
											src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAN5JREFUOBGtlcENgzAMRWtEbp2g167AIGEtpmEQRuiZBdpbD+F/GktFQIISWzKW7OTFAdvI7UBCCA5uH7WDfcRlM+wEHaki8o3+cwNYD31Bc8I1/SkJwQY65CgHce5pduBCmPKHDRBeXrNWftcHxUGT70xPz5xIhuPd+TWfuqnCkuFbPnIQZpZbE+OeGbLOrKQTHP4G7Z4iooCF8QuZfvb1kyJfiBHIdrKSmUD2ppVMBLLRrWTkizYt7DUzQO1aT+8KaMmkYSVRtsOBUDhtx9dfplUDdu0AhalFtsW/gAV+eo9ElrVKagAAAABJRU5ErkJggg=="
											style={{width: '10px', marginLeft: '8px', position: 'relative', top: '-1px'}} /></p><span className="count"><span>
											<p className="count-value">0</p>
											<p className="count-label">Days</p>
										</span><span>
											<p className="count-value">4</p>
											<p className="count-label">Hours</p>
										</span><span>
											<p className="count-value">57</p>
											<p className="count-label">Minutes</p>
										</span><span>
											<p className="count-value">46</p>
											<p className="count-label">Seconds</p>
										</span></span>
								</div><button className="sc-fzoyTs jZUSDr bid-button">Place a Bid</button>
							</div>
						</div>
						<div className="collectible-card__price-item-container">
							<div className="collectible-card__price-item"><a className="collectible-card__price-number"
									href="https://superrare.co/artwork-v2/exhibition-17473"><span>1.5</span><span className="eth-symbol" style={{fontSize: '15px'}}>Ξ</span>
									($<span>1,086</span>)</a>
								<p className="collectible-card__price-text">Current high bid by<a className="collectible-card__price-username"
										href="https://superrare.co/wmpeaster">@wmpeaster</a></p>
							</div>
						</div>
						<div className="collectible-card__user-section" style={{visibility: 'visible'}}>
							<hr className="collectible-card__user-section-divider" />
							<div className="collectible-card__user-container">
								<div className="collectible-card__user-item">
									<div className="collectible-card__user-title">ARTIST</div><a className="user" href="https://superrare.co/manards">
										<div className="md-inline-block md-avatar md-avatar--default user__avatar"><img
												src="https://ipfs.pixura.io/ipfs/QmaNuLLHzuaxLB8sCTYJoMkzh1hTSNFbgEPg7QrCWqkQAm" className="md-avatar-img" />
										</div>
										<div className="user__username">manards</div>
									</a>
								</div>
								<div className="collectible-card__user-item">
									<div className="collectible-card__user-title">OWNER</div><a className="user" href="https://superrare.co/manards">
										<div className="md-inline-block md-avatar md-avatar--default user__avatar"><img
												src="https://ipfs.pixura.io/ipfs/QmaNuLLHzuaxLB8sCTYJoMkzh1hTSNFbgEPg7QrCWqkQAm" className="md-avatar-img" />
										</div>
										<div className="user__username">manards</div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="collectible-card col-sm-6 col-md-4">
					<a href="https://superrare.co/artwork-v2/vaccine-is-imminent-nº3-17635">
						<section className="md-media md-media--1-1">
							<div className="artwork-thumbnail__container">
								<div>
									<div>
										<div className="artwork-thumbnail__img new-grid-img" style={{width: '640px', height: '360px'}}><video
												src="https://ipfs.pixura.io/ipfs/QmQEt2pQ1HkoPs9m2FCz6MDw4MtxswMM8VpfZ8iUh2zYbK/vaccine-is-imminent-n-3.mp4"
												preload="auto" autoPlay={true} loop={true} playsInline={true} webkit-playsinline="" x5-playsinline=""
												style={{width: '100%', 'height': '100%'}}></video></div>
									</div>
								</div><span className="artwork-thumbnail__icon icon-size-16"><i className="" data-fa-i2svg=""><svg
											className="svg-inline--fa fa-video fa-w-18" aria-hidden="true" data-prefix="fas" data-icon="video" role="img"
											xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg="">
											<path fill="currentColor"
												d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z">
											</path>
										</svg></i></span>
							</div>
						</section>
					</a>
					<div className="collectible-card__info-container">
						<div className="collectible-card__first-section" style={{width: '95%'}}><a className="collectible-card__name"
								href="https://superrare.co/artwork-v2/vaccine-is-imminent-nº3-17635">Vaccine is Imminent Nº3</a><span className="sc-fzqPZZ gXikXG">
								<div><span>RESERVE:</span> <span>1.25</span><span className="eth-symbol" style={{fontSize: '11px'}}>Ξ</span></div>
							</span></div>
						<div className="collectible-card__price-item-container">
							<div className="collectible-card__price-item"><span
									className="collectible-card__price-number collectible-card__price-number--inactive">–</span>
								<p className="collectible-card__price-text collectible-card__price-text--inactive">Current bid</p>
							</div>
						</div>
						<div className="collectible-card__user-section" style={{visibility: 'visible'}}>
							<hr className="collectible-card__user-section-divider" />
							<div className="collectible-card__user-container">
								<div className="collectible-card__user-item">
									<div className="collectible-card__user-title">ARTIST</div><a className="user" href="https://superrare.co/apoxia">
										<div className="md-inline-block md-avatar md-avatar--default user__avatar"><img
												src="https://ipfs.pixura.io/ipfs/QmVFAWmq18nfPCaNKgUb42vCFP6nixXan1D69VHhCaYVBi/Comp 2(0-00-00-00).png"
												className="md-avatar-img" /></div>
										<div className="user__username">apoxia</div>
									</a>
								</div>
								<div className="collectible-card__user-item">
									<div className="collectible-card__user-title">OWNER</div><a className="user" href="https://superrare.co/apoxia">
										<div className="md-inline-block md-avatar md-avatar--default user__avatar"><img
												src="https://ipfs.pixura.io/ipfs/QmVFAWmq18nfPCaNKgUb42vCFP6nixXan1D69VHhCaYVBi/Comp 2(0-00-00-00).png"
												className="md-avatar-img" /></div>
										<div className="user__username">apoxia</div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}

	renderSettings() {
		return (
			<div className="user-collection__filter-sort-container row">
				<div className="col-md-7">
					<h6 className="user-collection__filter-sort-label">Filter by:</h6>
					<div>
						<div className="md-selection-control-container md-switch-container user-collection__filter-switch">
							<input id="price-filter" type="checkbox" className="md-selection-control-input" name="price" aria-hidden="true" value="" />
							<label htmlFor="price-filter" className="md-selection-control-label md-pointer--hover md-text">
								<div className="md-switch-track md-pointer--hover md-switch-track--off">
									<div role="button" className="md-fake-btn md-pointer--hover md-fake-btn--no-outline md-switch-thumb md-switch-thumb--off" tabIndex={0} aria-pressed="false"></div>
								</div><span>Has list price</span>
							</label>
						</div>
						<div className="md-selection-control-container md-switch-container user-collection__filter-switch">
							<input id="bid-filter" type="checkbox" className="md-selection-control-input" name="bid" aria-hidden="true" value="" />
							<label htmlFor="bid-filter" className="md-selection-control-label md-pointer--hover md-text">
								<div className="md-switch-track md-pointer--hover md-switch-track--off">
									<div role="button" className="md-fake-btn md-pointer--hover md-fake-btn--no-outline md-switch-thumb md-switch-thumb--off" tabIndex={0} aria-pressed="false"></div>
								</div><span>Has open offer</span>
							</label>
						</div>
						<div className="md-selection-control-container md-switch-container user-collection__filter-switch">
							<input id="owned-by-creator-filter" type="checkbox" className="md-selection-control-input" name="ownedByCreator" aria-hidden="true" value="" />
							<label htmlFor="owned-by-creator-filter" className="md-selection-control-label md-pointer--hover md-text">
								<div className="md-switch-track md-pointer--hover md-switch-track--off">
									<div role="button" className="md-fake-btn md-pointer--hover md-fake-btn--no-outline md-switch-thumb md-switch-thumb--off" tabIndex={0} aria-pressed="false"></div>
								</div><span>Owned by creator</span>
							</label>
						</div>
						<div className="md-selection-control-container md-switch-container user-collection__filter-switch">
							<input id="sold-filter" type="checkbox" className="md-selection-control-input" name="hasSold" aria-hidden="true" value="" />
							<label htmlFor="sold-filter" className="md-selection-control-label md-pointer--hover md-text">
								<div className="md-switch-track md-pointer--hover md-switch-track--off">
									<div role="button" className="md-fake-btn md-pointer--hover md-fake-btn--no-outline md-switch-thumb md-switch-thumb--off" tabIndex={0} aria-pressed="false"></div>
								</div><span>Has sold</span>
							</label>
						</div>
					</div>
				</div>
				<div className="col-md-5">
					<div className="user-collection__sort-container">
						<h6 className="user-collection__filter-sort-label">Sort by:</h6>
						<div className="select-dropdown-container">
							<select className="select-dropdown select-bg-chevron-down">
								<option value="activity">Recently Active</option>
								<option value="auctionsEndingSoon">Ending Soon</option>
								<option value="lowestPrice">Lowest Price</option>
								<option value="highestPrice">Highest Price</option>
								<option value="highestTokenId">Newest</option>
								<option value="lowestTokenId">Oldest</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderPaging() {
		return (
			<div className="pagination-btn-container">
				<span role="button">

					{/* xmlns:xlink="http://www.w3.org/1999/xlink" */}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
						aria-describedby="desc" role="img" width="256" height="256"
						className="pagination-btn pagination-btn--left ">
						<title>Arrow Left Circle</title>
						<desc>A line styled icon from Orion Icon Library.</desc>
						<circle data-name="layer2" cx="32" cy="32" r="30" fill="none" stroke="#202020" strokeMiterlimit="10"
							strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></circle>
						<path data-name="layer1" fill="none" stroke="#202020" strokeMiterlimit="10" strokeWidth="2"
							d="M49.998 32.002h-35M28 21L15 32l13 11" strokeLinejoin="round" strokeLinecap="round"></path>
					</svg>
					
				</span>
				<span role="button">
					{/* xmlns:xlink="http://www.w3.org/1999/xlink" */}
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-describedby="desc"
						role="img" width="256" height="256"
						className="pagination-btn pagination-btn--right ">
						<title>Arrow Right Circle</title>
						<desc>A line styled icon from Orion Icon Library.</desc>
						<circle data-name="layer2" cx="32" cy="32" r="30" fill="none" stroke="#202020" strokeMiterlimit="10"
							strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></circle>
						<path data-name="layer1" fill="none" stroke="#202020" strokeMiterlimit="10" strokeWidth="2"
							d="M14.002 32.002h35M36 21l13 11-13 11" strokeLinejoin="round" strokeLinecap="round">
						</path>
					</svg>
				</span>

			</div>
		);
	}

	render() {
		var {assets} = this.state;
		return (
			<div className="marketplace-page app-page nft101">

				<Nav />

				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="marketplace__title">NFT101</h1>
						</div>
					</div>

					{/* {this.renderSettings()} */}

					{/* <div className="row">
						<hr style={{ marginBottom: '48px' }} />
					</div> */}

					{/* {this.renderContent()} */}

					{
						assets ? assets.length == 0 ? <div>Empty data</div> : assets.map((e,j)=>
							<NftItem assets={e} key={j} />
						):
						<div>Loading...</div>
					}

					{/* {this.renderPaging()} */}

				</div>

				<Footer />

			</div>
		);
	}

}