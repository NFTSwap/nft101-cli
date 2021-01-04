/**
 * @copyright © 2020 Copyright hardchain
 * @date 2021-01-04
 */

import Happy from '../../src/web3/happy';

import * as Users from './Users';
import * as Logs from './Logs';
import * as LicenseTypes from './LicenseTypes';
import * as Organizations from './Organizations';

export default {
	get users() { return Happy.instance<Users.default>(Users) },
	get organizations() { return Happy.instance<Organizations.default>(Organizations) },
	get license_types() { return Happy.instance<LicenseTypes.default>(LicenseTypes) },
	get logs() { return Happy.instance<Logs.default>(Logs) },
}