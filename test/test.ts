
import {check} from '../src/models/web3/artifacts';
import test_sol from './test-sol';
import test_mod from './test-mod';
import test_substrate from './test-substrate';
// require('./test-tx').default();
// require('./test-metamask').default();

async function test() {
	// await test_sol();
	// await test_mod();
	// await test_substrate();
	await check();
}

test();

export {}