/**
 * @copyright © 2020 Copyright hardchain
 * @date 2021-01-04
 */

import web3 from '../web3';
import Happy from 'web3z/happy';

import * as Exchange from './Exchange';

export default {
	get exchange() { return Happy.instance<Exchange.default>(Exchange, web3) },
}