
import {Page, React} from 'webpkit';
import './index.scss';
import * as cfg from '../../../config';

export default class extends Page {

	triggerLoad() {
		// TODO ...
	}

	render() {
		return (
			<div style={{textAlign: 'center', paddingTop: '100px', fontSize: '18px' }}>{
				cfg.platform == 'eth'?
				<a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?utm_source=chrome-ntp-icon">Install metamask wallet</a>:
				<a href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd">Install polkdot wallet</a>
			}
			</div>
		);
	}
}