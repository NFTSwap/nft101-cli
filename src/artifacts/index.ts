/**
 * @copyright © 2020 Copyright hardchain
 * @date 2021-01-04
 */

import web3 from '../web3';
import Happy from 'web3z/happy';

import * as Exchange from './Exchange';
import * as FeePlan from './FeePlan';
import * as Ledger from './Ledger';
import * as VotePool from './VotePool';

const ex_ = {
	get exchange() { return Happy.instance<Exchange.default>(Exchange, web3).api },
	get fee_plan() { return Happy.instance<FeePlan.default>(FeePlan, web3).api },
	get ledger() { return Happy.instance<Ledger.default>(Ledger, web3).api },
	get vote_pool() { return Happy.instance<VotePool.default>(VotePool, web3).api },
}

export default ex_;