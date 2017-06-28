/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import createSelector from 'lib/create-selector';
import { isMainSiteToSecondarySiteConnection } from 'state/selectors';
import { isJetpackSiteSecondaryNetworkSite } from 'state/sites/selectors';

/**
 * Returns true if site with id equal to siteId is a connected secondary network site and false otherwise
 * Returns null if with the information available it's not possible to determine if site is a connected secondary site or not
 *
 * @param  {Object}    state     Global state tree
 * @param  {Number}    siteId    The ID of the site we're querying
 * @return {?Boolean}            Whether site with id equal to siteId is a connected secondary network site
 */
export default createSelector(
	( state, siteId ) => {
		const isSecondaryNetworkSite = isJetpackSiteSecondaryNetworkSite( state, siteId );
		if ( isSecondaryNetworkSite == null ) {
			return null;
		}
		if ( ! isSecondaryNetworkSite ) {
			return false;
		}
		const siteIds = Object.keys( get( state, 'sites.items', {} ) );
		return siteIds.reduce( ( previousResult, mainSiteId ) => {
			if ( previousResult ) {
				return previousResult;
			}
			const newResult = isMainSiteToSecondarySiteConnection( state, mainSiteId, siteId );
			if ( newResult || newResult == null ) {
				return newResult;
			}
			return previousResult;
		}, false );
	},
	( state ) => state.sites.items
);
