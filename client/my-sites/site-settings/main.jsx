/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Main from 'components/main';
import DocumentHead from 'components/data/document-head';
import QueryProductsList from 'components/data/query-products-list';
import QuerySitePurchases from 'components/data/query-site-purchases';
import { getSelectedSiteId } from 'state/ui/selectors';
import { isJetpackSite, siteSupportsJetpackSettingsUi } from 'state/sites/selectors';
import GeneralSettings from './section-general';
import SiteSettingsNavigation from './navigation';
import SidebarNavigation from 'my-sites/sidebar-navigation';
import JetpackDevModeNotice from './jetpack-dev-mode-notice';
import Placeholder from 'my-sites/site-settings/placeholder';

const SiteSettingsComponent = ( {
	jetpackSettingsUiSupported,
	siteId,
	translate
} ) => {
	if ( ! siteId ) {
		return <Placeholder />;
	}

	return (
		<Main className="site-settings">
			<DocumentHead title={ translate( 'Site Settings' ) } />
			{ jetpackSettingsUiSupported && <JetpackDevModeNotice /> }
			<SidebarNavigation />
			{ siteId && <SiteSettingsNavigation section={ 'general' } /> }
			<QueryProductsList />
			{ siteId && <QuerySitePurchases siteId={ siteId } /> }
			{ siteId && <GeneralSettings /> }
		</Main>
	);
};

SiteSettingsComponent.propTypes = {
	// Connected props
	siteId: PropTypes.number,
	jetpackSettingsUiSupported: PropTypes.bool
};

export default connect(
	( state ) => {
		const siteId = getSelectedSiteId( state );
		const jetpackSite = isJetpackSite( state, siteId );
		const jetpackUiSupported = siteSupportsJetpackSettingsUi( state, siteId );

		return {
			siteId,
			jetpackSettingsUiSupported: jetpackSite && jetpackUiSupported,
		};
	}
)( localize( SiteSettingsComponent ) );
