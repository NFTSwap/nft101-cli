
import test_sol from './test-sol';
import test_mod from './test-mod';
// require('./test-tx').default();
// require('./test-metamask').default();

async function test() {
	await test_sol();
	await test_mod();
}

test();

export {}