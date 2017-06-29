/**
 * Internal dependencies
 */
import { addQueryArgs } from 'lib/url';
import config, { isEnabled } from 'config';

export function login( { isNative, redirectTo, twoFactorAuthType, socialConnect } = {} ) {
	let url = config( 'login_url' );

	if ( isNative && isEnabled( 'login/wp-login' ) ) {
		url = '/log-in';

		if ( twoFactorAuthType ) {
			url += '/' + twoFactorAuthType;
		}

		if ( socialConnect ) {
			url += '/social-connect';
		}
	}

	return redirectTo
		? addQueryArgs( { redirect_to: redirectTo }, url )
		: url;
}
