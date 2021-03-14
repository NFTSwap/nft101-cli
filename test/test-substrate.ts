
// Import the API
import { ApiPromise, WsProvider } from '@polkadot/api';
// import { IKeyringPair } from '@polkadot/types/types';
// import { Keyring } from '@polkadot/keyring';
// import keyring from '@polkadot/ui-keyring';
import { web3Enable, web3Accounts, web3FromSource, isWeb3Injected } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import somes from 'somes';

import {LazySigner} from '../src/models/substrate';

const type_ = {
	"Address": "MultiAddress",
	"LookupSource": "MultiAddress",
	"Nft": "String",
	"NftId": "u128",
	"OrderId": "u128",
	"OrderOf": {
		"order_id": "u128",
		"start_price": "Balance",
		"end_price": "Balance",
		"nft_id": "u128",
		"keep_block_num": "u32",
		"owner": "Hash"
	},
	"BidOf": {
		"order_id": "u128",
		"price": "Balance",
		"owner": "Hash"
	},
	"VoteOf": {
		"order_id": "u128",
		"amount": "Balance",
		"owner": "Hash"
	}
};

// Our address for Alice on the dev chain
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const FERDIE = '5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL';
const wsProvider = new WsProvider('ws://127.0.0.1:9944'); // wss://rpc.polkadot.io

async function _test(api: ApiPromise, accounts: InjectedAccountWithMeta[]) {

	// The actual address that we will use
	const ADDR = '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE';
	const ADDR1 = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
	const ADDR2 = '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY';

	{
		// RPC queries
		// Retrieve the chain name
		const chain = await api.rpc.system.chain();

		// Retrieve the latest header
		const lastHeader = await api.rpc.chain.getHeader();

		// Log the information
		console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

		// Subscriptions
		// Subscribe to the new headers
		await api.rpc.chain.subscribeNewHeads((lastHeader) => {
			console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
		});

		let count = 0;

		// Subscribe to the new headers
		const unsubHeads = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
			console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
		
			if (++count === 10) {
				unsubHeads();
			}
		});

		// Detour into derives

		await api.derive.chain.subscribeNewHeads((lastHeader) => {
			console.log(`#${lastHeader.number} was authored by ${lastHeader.author}`);
		});

		// Retrieve the current timestamp via subscription
		await api.query.timestamp.now((moment) => {
			console.log(`The last block has a timestamp of ${moment}`);
		});

		// Subscribe to balance changes for our account
		await api.query.system.account(ADDR, ({ nonce, data: balance }) => {
			console.log(`free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`);
		});

		// Subscribe to balance changes for 2 accounts, ADDR1 & ADDR2 (already defined)
		await api.query.system.account.multi([ADDR1, ADDR2], (balances) => {
			// const [{ data: balance1 }, { data: balance2 }] = balances;

			// console.log(`The balances are ${balance1.free} and ${balance2.free}`);

			console.log(`The nonce and free balances are: ${balances.map((e) => e.toHuman())}`);
		});

	}

	{

		// Retrieve the last timestamp
		const now = await api.query.timestamp.now();

		// Retrieve the account balance & nonce via the system module
		const { nonce, data: balance } = await api.query.system.account(ADDR);

		console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);

		// Do something
		console.log('genesisHash', api.genesisHash.toHex());
	}

}

async function _test2(api: ApiPromise, accounts: InjectedAccountWithMeta[]) {

	{
		// The length of an epoch (session) in Babe
		console.log(api.consts.babe.epochDuration.toHuman());

		// The amount required to create a new account
		console.log(api.consts.balances.creationFee.toHuman());

		// The amount required per byte on an extrinsic
		console.log(api.consts.balances.transactionByteFee.toHuman());
	}

	const { nonce: accountNonce } = await api.query.system.account(ALICE);
	const now = await api.query.timestamp.now();
	const validators = await api.query.session.validators();

	// Make our basic chain state/storage queries, all in one go
	// const [{ nonce: accountNonce }, now, validators] = await Promise.all([
	// 	api.query.system.account(ALICE),
	// 	api.query.timestamp.now(),
	// 	api.query.session.validators()
	// ]);

	console.log(`accountNonce(${ALICE}) ${accountNonce}`);
	console.log(`last block timestamp ${now.toBigInt()}`);

	if (validators && validators.length > 0) {
		// Retrieve the balances for all validators
		const validatorBalances = await Promise.all(
			validators.map((authorityId: any) =>
				api.query.system.account(authorityId)
			)
		);

		// Print out the authorityIds and balances of all validators
		console.log('validators', validators.map((authorityId, index) => {
			return ({
				address: authorityId.toString(),
				validatorBalance: validatorBalances[index].toHuman(),
				// balance: validatorBalances[index].data.free.toHuman(),
				// nonce: validatorBalances[index].nonce.toHuman()
			})
		}));
	}
}

async function _test3(_api: ApiPromise, accounts: InjectedAccountWithMeta[]) {
	console.log('api.consts.nftModule', _api.consts.nftModule);
	console.log('api.errors.nftModule', _api.errors.nftModule);
	console.log('api.events.nftModule', _api.events.nftModule);
	console.log('api.query.nftModule', _api.query.nftModule);
	console.log('api.tx.nftModule', _api.tx.nftModule);

	console.log('_api.consts.nftModule.maxKeepBlockNumber', _api.consts.nftModule.maxKeepBlockNumber.toString());
}

async function test5(_api: ApiPromise, accounts: InjectedAccountWithMeta[]) {

	var louistru = accounts[0];

	//keyring.loadAll({ isDevelopment: false }, allAccounts);

	//console.log(keyring);

	//keyring.getAddresses().forEach((e)=>console.log('forEach getAddresses', e));

	// keyring.getAccounts().forEach((e)=>console.log('forEach getAccounts', e));

	// console.log('keyring.getAddresses()', keyring.getAddresses());

	// var __ = keyring.getAccounts();

	// const unsub = await 
	// console.log(_api.events.nftModule.NftCreated);

	var injected = await web3FromSource(louistru.meta.source);

	// _api.tx.nftModule
	var txHash = await _api.tx.balances.transfer(FERDIE, 1 * 1e12).signAndSend(louistru.address, {signer: injected.signer});

	// Show the hash
	console.log(`Submitted with hash ${txHash}`);
}

async function _test4(_api: ApiPromise, accounts: InjectedAccountWithMeta[]) {

	var account = accounts[0];

	var injected = await web3FromSource(account.meta.source);

	var uri = 'https://img20.360buyimg.com/pop/s1180x940_jfs/t1/141199/10/14094/60678/60482694E2b1f76db/554fbbd50e4dbb97.jpg.webp';

	var signer = new LazySigner(injected.signer, account.address);

	var call = await _api.tx.nftModule.create(uri).signAsync(account.address, {signer});
	// var call = await _api.tx.nftModule.remove(100).signAsync(account.address, {signer});

	var r = await call.dryRun(account.address, signer.options);

	somes.assert(r.asOk.isOk, r.asOk.toString());

	await call.send(({ events = [], status }) => {
		if (status.isInBlock) {
			console.log('Included at block hash', status.asInBlock.toHex());
			console.log('Events:');
			events.forEach(({ event: { data, method, section }, phase }) => {
				console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
			});
		}
	});
}

async function _test5(_api: ApiPromise, accounts: InjectedAccountWithMeta[]) {

	var account = accounts[0];

	var injected = await web3FromSource(account.meta.source);

	var uri = 'https://img20.360buyimg.com/pop/s1180x940_jfs/t1/141199/10/14094/60678/60482694E2b1f76db/554fbbd50e4dbb97.jpg.webp';

	await _api.tx.nftModule.create(uri).signAndSend(account.address, {signer: injected.signer}, ({ events = [], status }) => {
		debugger;
		console.log('Transaction status:', status.type);

		if (status.isInBlock) {
			console.log('Included at block hash', status.asInBlock.toHex());
			console.log('Events:');

			events.forEach(({ event: { data, method, section }, phase }) => {
				console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
			});
		} else if (status.isFinalized) {
			console.log('Finalized block hash', status.asFinalized.toHex());
		}
	});
}

export default async function() {

	// Create our API with a default connection to the local node
	var api = await ApiPromise.create({ provider: wsProvider, types: type_ });

	await api.isReady;

	// debugger

	// console.log(isWeb3Injected);

	var InjectedExtension = await web3Enable('NFTSwap');

	debugger

	var accounts = await web3Accounts();

	(globalThis as any)._api = api;

	// await _test(api, accounts);
	// await _test2(api, accounts);
	await _test3(api, accounts);
	await _test4(api, accounts);
	// await somes.sleep(1e4);
	// await _test5(api, accounts);
}