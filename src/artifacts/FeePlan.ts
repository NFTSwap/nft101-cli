/**
 * @copyright © 2021 Copyright hardchain
 * @date 2021-01-05
 */

import {Address,Uint256} from 'web3z/solidity_types'
import * as json from './FeePlan.json';

export const abi = json.abi;
export const contractName = json.contractName;
export const contractAddress = '0x99B42B2D0503ECDaB00393F95565A8B601899DcF';

export default interface FeePlan {
	owner(): Promise<Address>;
	// initialize(admin: Address): TransactionPromise;
	feeUnit(): Promise<Uint256>;
	feeToVoterAtFirst(): Promise<Uint256>;
	feeToTeamAtFirst(): Promise<Uint256>;
	feeToVoter(): Promise<Uint256>;
	feeToTeam(): Promise<Uint256>;
	voterShareRatio(firstAuction: boolean): Promise<Uint256>;
	formula(value: Uint256, firstBid: boolean, votes: Uint256): Promise<{ toSeller: Uint256; toVoter: Uint256; toTeam: Uint256 }>;
}