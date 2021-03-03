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
import './index.scss';

export default class extends Page {

	render() {
		return (
			<div className="profile-page app-page">

				<Nav />

				<div className="md-grid profile-container">
					<div className="md-cell md-cell--12 md-cell--2-desktop profile__first-section">
						<div className=""><i className="profile__placeholder-avatar" data-fa-i2svg=""><svg
									className="svg-inline--fa fa-user-circle fa-w-16" aria-hidden="true" data-prefix="fal" data-icon="user-circle"
									role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" data-fa-i2svg="">
									<path fill="currentColor"
										d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z">
									</path>
								</svg></i></div>
						<div className="profile__account-own-following">
							<p>Followers: 0</p>
							<p>Following: 0</p>
						</div>
						<div className="profile__account-actions"><a href="https://superrare.co/chuxuewen/edit"
								style={{marginLeft: 'auto', marginRight: 'auto'}}><button type="button"
									className="md-btn md-btn--flat md-btn--text md-pointer--hover md-background--primary md-background--primary-hover md-inline-block sr-button profile__edit-btn">Edit
									Profile</button></a></div>
					</div>
					<div className="md-cell md-cell--12 md-cell--3-desktop profile__second-section">
						<div className="profile__info-container"><span className="profile__username">@chuxuewen</span><a
								href="https://superrare.co/chuxuewen/collection">
								<div className="profile__collection-creations-stats-container">
									<p className="profile__collection-creations-stats-text">Collection</p>
									<p className="profile__collection-creations-stats-number"><span>0</span></p>
								</div>
							</a><br/>
						</div>
					</div>
					<div className="md-cell md-cell--12 md-cell--7-desktop profile__third-section">
						<section className="md-tabs-container">
							<ul className="md-tabs md-tabs--centered" role="tablist"><span aria-hidden="true"></span>
								<li id="collection" role="tab" aria-controls="simple-tab-panel-0" aria-selected="true"
									className="md-fake-btn md-pointer--hover md-fake-btn--no-outline md-tab md-tab--active" tabIndex={0}
									aria-pressed="false">
									<div className="md-tab-label">Collection</div>
								</li>
								<li id="favorites" role="tab" aria-controls="simple-tab-panel-1" aria-selected="false"
									className="md-fake-btn md-pointer--hover md-fake-btn--no-outline md-tab md-tab--inactive profile__favorites"
									tabIndex={0} aria-pressed="false">
									<div className="md-tab-label">Favorites</div>
								</li><span className="md-tab-indicator"
									style={{height: '2px', width: '160px', transform: 'translate3d(173px, 0px, 0px)'}}></span>
							</ul>
							<div className="md-tabs-content" style={{overflowX: 'hidden'}}>
								<div className="react-swipeable-view-container"
									style={{transform: 'translate(0%, 0px)', flexDirection: 'row', transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s', direction: 'ltr', display: 'flex'}}>
									<div aria-hidden="false" data-swipeable="true"
										style={{width: '100%', flexShrink: 0, overflow: 'auto', height: 'auto'}}>
										<div id="simple-tab-panel-1" className="md-tab-panel md-grid" role="tabpanel" aria-hidden="true"
											aria-labelledby="collection"><span aria-hidden="true"></span>
											<div style={{width: '100%'}}>
												<div style={{marginTop: '2em', fontFamily: 'Founders Grotesk Regular'}}>
													<p className="lead" style={{fontFamily: 'Founders Grotesk Regular'}}>Looks like there's
														nothing in this collection yet!</p>
													<p className="lead" style={{fontFamily: 'Founders Grotesk Regular'}}> See what's being created
														and collected in the <a href="https://superrare.co/activity">activity feed.</a></p>
												</div>
											</div>
											<div className="profile__view-more"><a href="https://superrare.co/chuxuewen/collection">View all artworks collected by @chuxuewen</a></div>
										</div>
									</div>
									<div aria-hidden="true" data-swipeable="true"
										style={{width: '100%', flexShrink: 0, overflow: 'auto', height: 'auto'}}>
										<div id="simple-tab-panel-2" className="md-tab-panel md-grid" role="tabpanel" aria-hidden="true"
											aria-labelledby="favorites"><span aria-hidden="true"></span></div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>

				<Footer />

			</div>
		);
	}

}