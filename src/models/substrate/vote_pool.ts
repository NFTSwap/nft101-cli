
import * as vp from '../vote_pool';

export class ApiIMPL implements vp.APIVotePool {

	contractAddress = '';

	// 通过投票id返回投票信息
	votesById(voteId: bigint): Promise<vp.Vote> {
		return Promise.resolve({
			voter: '',
			orderId: BigInt(0),
			votes: BigInt(0),
			weight: BigInt(0),
			blockNumber: BigInt(0),
		});
	}

	// 通过订单返回竞拍活动的投票质押信息总览
	ordersById(orderId: bigint): Promise<vp.OrderSummary> {
		return Promise.resolve({
			totalVotes: BigInt(0),
			totalCanceledVotes: BigInt(0),
			fixedRate: BigInt(0),
			totalShares: BigInt(0),
			commission: BigInt(0),
			stoped: true,
		});
	}

	// vote
	marginVote(orderId: bigint, amount: bigint): Promise<{
		orderId: bigint;
		voter: string;
		voteId: bigint;
		votes: bigint;
		weight: bigint;
	}> {
		return Promise.resolve({
			orderId: BigInt(0),
			voter: '',
			voteId: BigInt(0),
			votes: BigInt(0),
			weight: BigInt(0),
		});
	}

	// 取消vote
	cancelVote(voteId: bigint): Promise<{
		orderId: bigint;
		voter: string;
		voteId: bigint;
	}> {
		return Promise.resolve({
			orderId: BigInt(0),
			voter: '',
			voteId: BigInt(0),
		});
	}

	// 返回订单的投票总量
	orderTotalVotes(orderId: bigint): Promise<bigint> {
		return Promise.resolve(BigInt(0));
	}

	// 要释放的金额,我的收益
	canRelease(holder: string): Promise<bigint> {
		return Promise.resolve(BigInt(0));
	}

	// 尝试释放结束的投票金额,释放我的收益
	tryRelease(holder: string): Promise<bigint> {
		return Promise.resolve(BigInt(0));
	}

}

export default new ApiIMPL;