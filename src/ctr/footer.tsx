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

import { ViewController, React } from 'webpkit';

export default class extends ViewController {

	render() {
		return (
			<div className="footer-container">

				<div className="md-grid footer">
					<div className="md-cell md-cell--12">
						<div className="subscribe-container">
							<div className="subscribe-center-wrapper">
								<h3>Subscribe to our newsletter</h3>
								<div className="form-container">
									{/* rel="noopener noreferrer" */}
									<form action="https://blockchainjobs.us15.list-manage.com/subscribe/post?u=5dfce9177b2176b567e783c36&amp;id=6bf850e75d"
										method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"
										className="validate contact_form" target="_blank"
									>
										<input className="subscribe-input" type="email" name="EMAIL" id="email" placeholder="Email address" aria-label="Enter your e-mail address" aria-describedby="email-addon" required={true} />
										<span className="input-group-text signup-addon" id="email-addon"><button className="submit-email" style={{ display: 'none' }}></button></span>
									</form>
									<button>Subscribe</button>
								</div>
							</div>
						</div>
					</div>
					<div className="md-cell md-cell--3 md-cell--12-tablet">
						<div className="footer-link-container">
							<a className="footer-sr-logo" href="https://superrare.co/">SuperRare</a>
							<p className="footer-copyright">© 2020 SuperRare</p>
						</div>
					</div>
					<div className="md-cell md-cell--3 md-cell--12-tablet">
						<div className="footer-link-container">
							<p className="footer-column-title">Community</p>
							<a className="footer-link" href="https://editorial.superrare.co/" target="_blank" rel="noopener noreferrer">Editorial</a>
							<a className="footer-link" href="https://discord.gg/pGeAWrP" target="_blank" rel="noopener noreferrer">Discord</a>
							<a className="footer-link" href="https://www.instagram.com/superrare.co/" target="_blank" rel="noopener noreferrer">Instagram</a>
							<a className="footer-link" href="https://twitter.com/SuperRare" target="_blank" rel="noopener noreferrer">Twitter</a>
							<a className="footer-link" href="https://medium.com/@SuperRare_co" target="_blank" rel="noopener noreferrer">Blog</a>
							<a className="footer-link" href="https://help.superrare.co/" target="_blank" rel="noopener noreferrer">Help
								Center</a>
						</div>
					</div>
					<div className="md-cell md-cell--3 md-cell--12-tablet">
						<div className="footer-link-container">
							<p className="footer-column-title">For Artists</p>
							<a className="footer-link" href="https://docs.google.com/forms/d/e/1FAIpQLScTZhB9On31j-uoFzMD3hg0gGNf3hgjVyBz1xwCHsOBSydvPw/viewform" target="_blank" rel="noopener noreferrer">Submit artist profile</a>
						</div>
					</div>
					<div className="md-cell md-cell--3 md-cell--12-tablet">
						<div className="footer-link-container">
							<p className="footer-column-title">Legal</p>
							<a className="footer-link" href="https://www.notion.so/SuperRare-Community-Guidelines-b9c4fc521f4344a39cac7bd13d44a56f" target="_blank" rel="noopener noreferrer">Community Guidelines</a>
							<a className="footer-link" href="https://www.notion.so/SuperRare-Terms-of-Service-075a82773af34aab99dde323f5aa044e" target="_blank" rel="noopener noreferrer">Terms of Service</a>
							<a className="footer-link" href="https://www.notion.so/SuperRare-Privacy-Policy-30db13e22c3648099a785b99afc7c584" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
							<a className="footer-link" href="mailto:ip@superrare.com">Report content</a>
						</div>
					</div>
				</div>

			</div>

		);
	}

}