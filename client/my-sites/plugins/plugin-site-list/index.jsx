/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { compact } from 'lodash';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import PluginSite from 'my-sites/plugins/plugin-site/plugin-site';
import SectionHeader from 'components/section-header';
import PluginsStore from 'lib/plugins/store';
import { isConnectedSecondaryNetworkSite, getNetworkSites } from 'state/selectors';

export class PluginSiteList extends Component {
	static propTypes = {
		sites: PropTypes.array,
		plugin: PropTypes.object,
		notices: PropTypes.object,
		title: PropTypes.string,
		sitesWithSecondarySites: PropTypes.array,
	};

	getSecondaryPluginSites = function( site, secondarySites ) {
		const secondaryPluginSites = site.plugin
			? PluginsStore.getSites( secondarySites, this.props.plugin.slug )
			: secondarySites;
		return compact( secondaryPluginSites );
	};

	renderPluginSite = function( { site, secondarySites } ) {
		return <PluginSite
				key={ 'pluginSite' + site.ID }
				site={ site }
				secondarySites={ this.getSecondaryPluginSites( secondarySites ) }
				plugin={ this.props.plugin }
				wporg={ this.props.wporg }
				notices={ this.props.notices } />;
	};

	render = function() {
		if ( ! this.props.sites || this.props.sites.length === 0 ) {
			return null;
		}
		const classes = classNames( 'plugin-site-list', this.props.className ),
			pluginSites = this.props.sitesWithSecondarySites.map( function( siteWithSecondarySites ) {
				return this.renderPluginSite( siteWithSecondarySites );
			}, this );

		return (
			<div className={ classes } >
				<SectionHeader label={ this.props.title } />
				{ pluginSites }
			</div>
		);
	}
}

export default connect(
	( state, props ) => {
		const sitesWithSecondarySites = props.sites
		.filter( ( site ) => ! isConnectedSecondaryNetworkSite( state, site.ID )	)
		.map( ( site ) => ( {
			site,
			secondarySites: getNetworkSites( state, site.ID )
		} ) );

		return {
			sitesWithSecondarySites
		};
	}
)( PluginSiteList );
