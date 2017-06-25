/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Main from 'components/main';
import EmptyContent from 'components/empty-content';
import DocumentHead from 'components/data/document-head';
import SidebarNavigation from 'my-sites/sidebar-navigation';

function NotAvailableError( { translate } ) {
	return (
			<Main>
				<DocumentHead title={ translate( 'Plugins' ) } />
				<SidebarNavigation />
				<EmptyContent
					title={ translate( 'Not Available' ) }
					line= { translate( 'The page you requested could not be found' ) }
					illustration="/calypso/images/illustrations/illustration-404.svg" />
			</Main>
	);
}

NotAvailableError.propTypes = {
	translate: PropTypes.func.isRequired
};

export default localize( NotAvailableError );
