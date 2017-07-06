/**
 * External dependencies
 */
import { renderWithReduxStore } from 'lib/react-helpers';
import React from 'react';
import page from 'page';

/**
 * Internal dependencies
 */
import CommentsManagement from './main';
import config from 'config';
import route from 'lib/route';
import controller from 'my-sites/controller';

export const comments = function( context ) {
	const siteSlug = route.getSiteFragment( context.path );
	const status = context.params.status === 'pending' ? 'unapproved' : context.params.status;

	if ( ! config.isEnabled( 'comments/management/all-list' ) && 'all' === status ) {
		return page.redirect( `/comments/pending/${ siteSlug }` );
	}

	renderWithReduxStore(
		<CommentsManagement
			basePath={ context.path }
			siteSlug={ siteSlug }
			status={ status }
		/>,
		'primary',
		context.store
	);
};

export const sites = function( context ) {
	const { status } = context.params;
	const siteSlug = route.getSiteFragment( context.path );

	if ( ! config.isEnabled( 'comments/management/all-list' ) && 'all' === status ) {
		return page.redirect( '/comments/pending' );
	}

	if ( status === siteSlug ) {
		return page.redirect( `/comments/pending/${ siteSlug }` );
	}
	controller.sites( context );
};
