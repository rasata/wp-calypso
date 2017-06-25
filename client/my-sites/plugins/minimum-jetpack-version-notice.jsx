/**
 * External dependencies
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import config from 'config';
import notices from 'notices';
import { getSelectedSiteId, getSelectedSite } from 'state/ui/selectors';

import {
	isJetpackSite,
	siteHasMinimumJetpackVersion
} from 'state/sites/selectors';

class MinimumJetpackVersionNotice extends Component {

	static propTypes = {
		translate: PropTypes.func.isRequired,
		minimumJetpackVersionFailed: PropTypes.bool.isRequired,
		site: PropTypes.object,
	};

	showWarning() {
		const { minimumJetpackVersionFailed, site, siteId, translate } = this.props;
		if ( site && minimumJetpackVersionFailed ) {
			notices.warning(
				translate(
					'Jetpack %(version)s is required to take full advantage of plugin management in %(site)s.',
					{
						args: {
							version: config( 'jetpack_min_version' ),
							site: site.domain
						}
					}
				), {
					button: translate( 'Update now' ),
					href: site.options.admin_url + 'plugins.php?plugin_status=upgrade',
					dismissID: 'allSitesNotOnMinJetpackVersion' + config( 'jetpack_min_version' ) + '-' + siteId
				}
			);
		}
	}

	componentDidMount() {
		this.showWarning();
	}

	componentDidUpdate() {
		this.showWarning();
	}

	render() {
		return null;
	}
}

export default connect(
	state => {
		const selectedSiteId = getSelectedSiteId( state );
		return {
			minimumJetpackVersionFailed: !! isJetpackSite( state, selectedSiteId ) &&
				! siteHasMinimumJetpackVersion( state, selectedSiteId ),
			site: getSelectedSite( state ),
			siteId: selectedSiteId,
		};
	}
)( localize( MinimumJetpackVersionNotice ) );
