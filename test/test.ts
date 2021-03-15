
import {check} from '../src/models/web3/artifacts';
import test_sol from './test-sol';
import test_mod from './test-mod';
import test_substrate from './test-substrate';
import test_substrate2 from './test-substrate2';
import * as cfg from '../config';
// require('./test-tx').default();
// require('./test-metamask').default();

async function test() {

	if (cfg.platform == 'eth') {
		// await test_sol();
		// await test_mod();
		await check();
	} else {
		// await test_substrate();
		await test_substrate2();
	}

}

test();

export {}