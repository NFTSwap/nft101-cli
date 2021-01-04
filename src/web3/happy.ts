/**
 * @copyright © 2020 Copyright hardchain
 * @date 2021-01-04
 */

import somes from 'somes';
import web3 from './index';
import {AbiItem, AbiOutput} from 'web3-utils/types';
import { Contract, ContractSendMethod } from 'web3z';
// import * as cfg from '../../config';

export interface ContractMethod {
	<A extends any[]>(...args: A): ContractSendMethod;
}

export interface SolidityInfo {
	contractName: string;
	abi: any[];
	contractAddress: string;
}

export default class ContractHappy<T> {
	private _contract: Contract;
	private _methods: Dict<ContractMethod>;
	private _abis: Dict<AbiItem>;
	private _info: SolidityInfo;

	constructor(info: SolidityInfo) {
		this._info = info;
		somes.assert(this._info);
		this._abis = {};
		for (var abi of this._info.abi) {
			this._abis[String(abi.name)] = abi;
		}
		this._contract = web3.createContract(this._info.contractAddress, this._info.abi);
		this._methods = this._contract.methods;
	}

	get contract() {
		return this._contract;
	}

	private _parseOutputs(data: any, outputs: AbiOutput[]) {

		if (outputs.length === 0) {
			return data;
		}
		if (outputs.length == 1) {
			data = [data];
		}
		var new_data = [];

		for (var i = 0; i < outputs.length; i++) {
			var item = data[i];
			var out = outputs[i];
			switch(out.type) {
				case 'tuple':
					var touts = out.components as AbiOutput[];
					var tdatas = this._parseOutputs(item, touts);
					var obj = {} as Dict;
					for (var j = 0; j < touts.length; j++) {
						var tdata = tdatas[j];
						obj[touts[j].name] = tdata;
					}
					item = obj;
					break;
				case 'int256':
				case 'uint256':
					item = BigInt(item);
					break;
				case 'uint8':
				case 'uint16':
				case 'uint32':
				case 'int8':
				case 'int16':
				case 'int32':
					item = Number(item);
					break;
			}
			new_data.push(item);
		}

		return new_data;
	}

	happy(from?: string): T {
		return new Proxy(this, {
			get(target: ContractHappy<T>, p: PropertyKey, receiver: any) {
				var prop = String(p);
				var abi = target._abis[prop];
				var method = target._methods[prop];
				if (!method) {
					return;
				}
				return async function(...args: any[]) {

					if (abi.payable) {
						var receipt = await web3.enqueue(e=>method.apply(target._methods, args).sendSignTransaction(e), {from});
						return receipt;
					}
					else {
						var data = await method.apply(target._methods, args).call({from});

						var _data = target._parseOutputs(data, abi.outputs as AbiOutput[]);

						if (_data.length == 1) {
							return _data[0];
						} else if (_data.length === 0) {
							return void(0);
						} else {
							return _data;
						}
					}
				}
				// function end
			}
		}) as unknown as T;
	}

	private static _contracts: Dict<ContractHappy<any>> = {};

	static instance<T>(info: SolidityInfo): ContractHappy<T> {
		if (!this._contracts[info.contractName])
			this._contracts[info.contractName] = new ContractHappy<T>(info);
		return this._contracts[info.contractName];
	}

}