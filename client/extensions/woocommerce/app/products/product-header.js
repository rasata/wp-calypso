/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { localize } from 'i18n-calypso';
import Gridicon from 'gridicons';
import { isObject } from 'lodash';

/**
 * Internal dependencies
 */
import ActionHeader from 'woocommerce/components/action-header';
import Button from 'components/button';
import { getLink } from 'woocommerce/lib/nav-utils';

function renderViewButton( product, translate ) {
	const url = product && product.permalink;
	return (
		// TODO: Do more to validate this URL?
		<a href={ url } className="products__header-view-link" target="_blank" rel="noopener noreferrer">
			<Button borderless><Gridicon icon="visible" /><span> { translate( 'View' ) } </span></Button>
		</a>
	);
}

function renderTrashButton( onTrash, product, isBusy, translate ) {
	return onTrash && (
		<Button borderless scary onClick={ onTrash }>
			<Gridicon icon="trash" />
			<span>{ translate( 'Delete' ) } </span>
		</Button>
	);
}

function renderSaveButton( onSave, product, isBusy, translate ) {
	const saveExists = 'undefined' !== typeof onSave;
	const saveDisabled = false === onSave;

	const saveLabel = ( product && ! isObject( product.id )
		? translate( 'Update' )
		: translate( 'Save & Publish' )
	);

	return saveExists && (
		<Button primary onClick={ onSave } disabled={ saveDisabled } busy={ isBusy }>
			{ saveLabel }
		</Button>
	);
}

const ProductHeader = ( { viewEnabled, onTrash, onSave, isBusy, translate, site, product } ) => {
	const existing = product && ! isObject( product.id );

	const viewButton = viewEnabled && renderViewButton( product, translate );
	const trashButton = renderTrashButton( onTrash, product, isBusy, translate );
	const saveButton = renderSaveButton( onSave, product, isBusy, translate );

	const currentCrumb = product && existing
		? ( <span>{ translate( 'Edit Product' ) }</span> )
		: ( <span>{ translate( 'Add New' ) }</span> );

	const breadcrumbs = [
		( <a href={ getLink( '/store/products/:site/', site ) }> { translate( 'Products' ) } </a> ),
		currentCrumb,
	];

	return (
		<ActionHeader breadcrumbs={ breadcrumbs }>
			{ trashButton }
			{ viewButton }
			{ saveButton }
		</ActionHeader>
	);
};

ProductHeader.propTypes = {
	site: PropTypes.shape( {
		slug: PropTypes.string,
	} ),
	product: PropTypes.shape( {
		id: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.object,
		] ),
	} ),
	viewEnabled: PropTypes.bool,
	onTrash: PropTypes.func,
	onSave: PropTypes.oneOfType( [
		React.PropTypes.func,
		React.PropTypes.bool,
	] ),
};

export default localize( ProductHeader );
