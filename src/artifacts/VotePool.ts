/**
 * @copyright © 2021 Copyright hardchain
 * @date 2021-01-05
 */

import {TransactionPromise} from 'web3z';
import {Address,Uint256} from 'web3z/solidity_types'
import * as json from './VotePool.json';

export const abi = json.abi;
export const contractName = json.contractName;
export const contractAddress = '0x8Ec6D4Eb6629B332A58d15BD8c71b45A77972fbE';

// 投票质押信息，用于记录每一张投票信息
export interface Vote {
	voter: Address; // 投票人
	orderId: Uint256; // 所参与的竞拍活动
	votes: Uint256; // 投票质押数量
	weight: Uint256; // 投票质押系数
	blockNumber: Uint256; // 投票区块搞定
}

// 竞拍活动的投票质押信息总览
export interface OrderSummary {
	totalVotes: Uint256;// 总投票质押数量
	totalCanceledVotes: Uint256;
	fixedRate: Uint256;
	totalShares: Uint256; // 当前有效投票质押总股份（凭证）
	commission: Uint256; // 竞拍成功时质押投票分成佣金额
	stoped: boolean;
}

export default interface VotePool {
	owner(): Promise<Address>;
	// initialize(exchange_: Address, ledger_: Address): Promise<void>; // TransactionPromise;
	MAX_WEIGTH(): Promise<Uint256>;
	MIN_WEIGTH(): Promise<Uint256>;
	MAX_PENDING_VOTES(): Promise<Uint256>;
	MAX_FIXED_AROR(): Promise<Uint256>;
	MIN_VOTE(): Promise<Uint256>;
	YEAR_DAYS(): Promise<Uint256>;
	Voteing(): Promise<Uint256>;
	lastVoteId(): Promise<Uint256>;
	exchange(): Promise<Address>;
	ledger(): Promise<Address>;
	voteLockTime(): Promise<Uint256>;
	votesByVoter(account: Address): Promise<Uint256[]>;
	votesById(voteId: Uint256): Promise<Vote>;
	ordersById(orderId: Uint256): Promise<OrderSummary>;
	marginVote(orderId: Uint256): Promise<Uint256>; // TransactionPromise;
	cancelVote(voteId: Uint256): Promise<void>; // TransactionPromise;
	// subCommission(orderId: Uint256): TransactionPromise;
	settle(holder: Address): TransactionPromise;
	orderTotalVotes(orderId: Uint256): Promise<Uint256>;
	canRelease(holder: Address): Promise<Uint256>;
	tryRelease(holder: Address): Promise<Uint256>; // TransactionPromise;
	unlockAllowed(voteId: Uint256, voter: Address): Promise<boolean>;
	allVotes(voter: Address): Promise<Uint256[]>;
}