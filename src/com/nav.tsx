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

export default class extends ViewController {

	render() {
		return (
			<div className="nav-container">
				<div className="toolbar-nav-wrapper" style={{backgroundColor: 'rgb(255, 255, 255)'}}>
					<header className="md-paper md-paper--2 md-toolbar md-toolbar--fixed toolbar-nav"
						style={{boxShadow: 'none', backgroundColor: 'rgb(255, 255, 255)'}}>

						<button type="button"
							className="md-btn md-btn--icon md-pointer--hover md-inline-block md-btn--toolbar md-toolbar--action-left">
							<i className="md-icon material-icons md-text--inherit">menu</i>
						</button>

						<div className="md-cell--right md-toolbar--action-right">
							<div className="desktop-nav-container">
								<div className="desktop-nav">
									<Link className="desktop-nav-link home-nav-link active" to="/" style={{textDecoration: 'none'}}>
										<h3>NFTSwap</h3>
									</Link>
									{/* activeclassname="active" */}
									<Link className="desktop-nav-link" rel="noreferrer"
										to="/nft101"><button type="button"
											className="md-btn md-btn--flat md-btn--text md-pointer--hover md-text--theme-primary md-ink--primary md-inline-block">NFT101</button>
									</Link>
									<Link
										className="desktop-nav-link" to="/mynft"><button type="button"
											className="md-btn md-btn--flat md-btn--text md-pointer--hover md-text--theme-primary md-ink--primary md-inline-block">MYNFT</button>
									</Link>
									<Link
										className="desktop-nav-link" to="/income"><button type="button"
											className="md-btn md-btn--flat md-btn--text md-pointer--hover md-text--theme-primary md-ink--primary md-inline-block">INCOME</button>
									</Link>
									<Link
										className="desktop-nav-link active" to="/publish"><button type="button"
											className="md-btn md-btn--flat md-btn--text md-pointer--hover md-text--theme-primary md-ink--primary md-inline-block">PUBLISH</button>
									</Link>
									{/* <Link
										className="desktop-nav-link" to="/account"><button type="button"
											className="md-btn md-btn--flat md-btn--text md-pointer--hover md-text--theme-primary md-ink--primary md-inline-block">Account</button>
									</Link> */}
								</div>

								{/* <div className="desktop-nav loggedin">
									<a className="desktop-nav-link notifications-link" href="/chuxuewen/notifications">
										<button type="button"
											className="md-btn md-btn--flat md-btn--text md-pointer--hover md-text--theme-primary md-ink--primary md-inline-block desktop-nav-profile-btn">Notifications</button>
									</a>
									<div className="desktop-nav-profile-btn">
										<i className="desktop-nav-default-avatar" data-fa-i2svg="">
											<svg
												className="svg-inline--fa fa-user-circle fa-w-16" aria-hidden="true" data-prefix="fal"
												data-icon="user-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"
												data-fa-i2svg="">
												<path fill="currentColor"
													d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z">
												</path>
											</svg>
										</i>
										<img className=" desktop-nav--dropdown-toggle" src="https://superrare.co/static/media/ic-arrow-down.b807cb03.svg" />
									</div>
									<div className="sc-AxjAm poPni main-nav__dropdown" style={{display: 'none'}}>
										<ul style={{listStyle: 'none', padding: '0px'}}>
											<li className="sc-AxiKw eSbheu"><a className="sc-AxhCb eSwYtm" href="/chuxuewen">Profile</a></li>
											<li className="sc-AxiKw eSbheu"><a className="sc-AxhCb eSwYtm" href="/chuxuewen/dashboard">Dashboard</a></li>
											<li className="sc-AxiKw eSbheu"><a className="sc-AxhCb eSwYtm" href="/chuxuewen/collection">Collection</a></li>
											<li className="sc-AxiKw eSbheu"><a className="sc-AxhCb eSwYtm" href="/chuxuewen/settings">Settings</a></li>
											<hr style={{borderColor: 'black'}} />
											<li className="sc-AxiKw eSbheu">
												<div className="sc-AxirZ bJCmFu">Sign out</div>
											</li>
										</ul>
									</div>
								</div> */}

							</div>
						</div>
					</header>
				</div>

				<a className="mobile-nav-logo active" href="/">
					<h3>SuperRare</h3>
				</a>

				<a className="mobile-nav__notifications-link" href="/chuxuewen/notifications">
					<button type="button" className="md-btn md-btn--flat md-btn--text md-pointer--hover md-text--theme-primary md-ink--primary md-inline-block mobile-nav-notifications-btn border">
						<i className="" data-fa-i2svg="">
							<svg className="svg-inline--fa fa-bell fa-w-14" aria-hidden="true" data-prefix="fal"
								data-icon="bell" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
								<path fill="currentColor"
											d="M433.884 366.059C411.634 343.809 384 316.118 384 208c0-79.394-57.831-145.269-133.663-157.83A31.845 31.845 0 0 0 256 32c0-17.673-14.327-32-32-32s-32 14.327-32 32c0 6.75 2.095 13.008 5.663 18.17C121.831 62.731 64 128.606 64 208c0 108.118-27.643 135.809-49.893 158.059C-16.042 396.208 5.325 448 48.048 448H160c0 35.29 28.71 64 64 64s64-28.71 64-64h111.943c42.638 0 64.151-51.731 33.941-81.941zM224 480c-17.645 0-32-14.355-32-32h64c0 17.645-14.355 32-32 32zm175.943-64H48.048c-14.223 0-21.331-17.296-11.314-27.314C71.585 353.836 96 314.825 96 208c0-70.741 57.249-128 128-128 70.74 0 128 57.249 128 128 0 106.419 24.206 145.635 59.257 180.686C421.314 398.744 414.11 416 399.943 416z">
								</path>
							</svg>
						</i>
					</button>
				</a>

			</div>
		);
	}

}