
import {APIExchange} from './exchange';
import {APILedger} from './ledger';
import {APINFTs} from './nfts';
import {APIUser} from './user';
import {APIVotePool} from './vote_pool';
import * as cfg from '../../config';

export * from './exchange';
export * from './ledger';
export * from './nfts';
export * from './user';
export * from './vote_pool';

export var exchange: APIExchange;
export var ledger: APILedger;
export var nfts: APINFTs;
export var user: APIUser;
export var vote_pool: APIVotePool;

export var encodeParameters: (types: any[], paramaters: any[]) => string;

if (cfg.platform == 'substrate') {

	const _ex = require('./substrate/exchange').default;
	const _ledger = require('./substrate/ledger').default;
	const _nfts = require('./substrate/nfts').default;
	const _user = require('./substrate/user').default;
	const _vp = require('./substrate/vote_pool').default;
	const _substrate = require('./substrate');
	
	exchange = _ex;
	ledger = _ledger;
	nfts = _nfts;
	user = _user;
	vote_pool = _vp;

	encodeParameters = _substrate.encodeParameters;
} else {

	const _ex = require('./eth/exchange').default;
	const _ledger = require('./eth/ledger').default;
	const _nfts = require('./eth/nfts').default;
	const _user = require('./eth/user').default;
	const _vp = require('./eth/vote_pool').default;
	const _web3 = require('./eth/web3').default;
	
	exchange = _ex;
	ledger = _ledger;
	nfts = _nfts;
	user = _user;
	vote_pool = _vp;

	encodeParameters = _web3.eth.abi.encodeParameters;
}