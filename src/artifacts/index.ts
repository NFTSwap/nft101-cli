/**
 * @copyright © 2020 Copyright hardchain
 * @date 2021-01-04
 */

import Happy from '../web3/happy';

import * as Exchange from './Exchange';

export default {
	get exchange() { return Happy.instance<Exchange.default>(Exchange) },
}