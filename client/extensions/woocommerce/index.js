/**
 * External dependencies
 */
import config from 'config';
import page from 'page';
import React from 'react';

/**
 * Internal dependencies
 */
import App from './app';
import { navigation, siteSelection } from 'my-sites/controller';
import { renderWithReduxStore } from 'lib/react-helpers';
import installActionHandlers from './state/data-layer';
import Order from './app/order';
import Orders from './app/orders';
import Products from './app/products';
import ProductCreate from './app/products/product-create';
import ProductUpdate from './app/products/product-update';
import Dashboard from './app/dashboard';
import SettingsPayments from './app/settings/payments';
import SettingsTaxes from './app/settings/taxes';
import Shipping from './app/settings/shipping';
import ShippingZone from './app/settings/shipping/shipping-zone';
import StatsController from './app/store-stats/controller';
import StoreSidebar from './store-sidebar';

function initExtension() {
	installActionHandlers();
}

const getStorePages = () => {
	return [
		{
			container: Dashboard,
			configKey: 'woocommerce/extension-dashboard',
			path: '/store/:site',
		},
		{
			container: Products,
			configKey: 'woocommerce/extension-products',
			path: '/store/products/:site',
		},
		{
			container: ProductCreate,
			configKey: 'woocommerce/extension-products',
			path: '/store/product/:site',
		},
		{
			container: ProductUpdate,
			configKey: 'woocommerce/extension-products',
			path: '/store/product/:site/:product',
		},
		{
			container: Orders,
			configKey: 'woocommerce/extension-orders',
			path: '/store/orders/:site',
		},
		{
			container: Order,
			configKey: 'woocommerce/extension-orders',
			path: '/store/order/:site/:order',
		},
		{
			container: SettingsPayments,
			configKey: 'woocommerce/extension-settings',
			path: '/store/settings/:site',
		},
		{
			container: SettingsPayments,
			configKey: 'woocommerce/extension-settings-payments',
			path: '/store/settings/payments/:site',
		},
		{
			container: Shipping,
			configKey: 'woocommerce/extension-settings-shipping',
			path: '/store/settings/shipping/:site',
		},
		{
			container: ShippingZone,
			configKey: 'woocommerce/extension-settings-shipping',
			path: '/store/settings/shipping/zone/:site/:zone?',
		},
		{
			container: SettingsTaxes,
			configKey: 'woocommerce/extension-settings-tax',
			path: '/store/settings/taxes/:site',
		},
	];
};

function addStorePage( storePage, storeNavigation ) {
	page( storePage.path, siteSelection, storeNavigation, function( context ) {
		const component = React.createElement( storePage.container, { params: context.params } );
		renderWithReduxStore(
			React.createElement( App, {}, component ),
			document.getElementById( 'primary' ),
			context.store
		);
	} );
}

function createStoreNavigation( context, next, storePage ) {
	renderWithReduxStore(
		React.createElement( StoreSidebar, {
			path: context.path,
			page: storePage,
		} ),
		document.getElementById( 'secondary' ),
		context.store
	);

	next();
}

export default function() {
	// Add pages that use the store navigation
	getStorePages().forEach( function( storePage ) {
		if ( config.isEnabled( storePage.configKey ) ) {
			addStorePage( storePage, ( context, next ) => createStoreNavigation( context, next, storePage ) );
		}
	} );

	// Add pages that use my-sites navigation instead
	if ( config.isEnabled( 'woocommerce/extension-stats' ) ) {
		page( '/store/stats/:type/:unit/:site', siteSelection, navigation, StatsController );
	}
}

// TODO: This could probably be done in a better way through the same mechanisms
// that bring in the rest of the extension code. Maybe extension-loader?
initExtension();
