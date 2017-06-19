/**
 * External dependencies
 */
import React from 'react';
import { translate } from 'i18n-calypso';
import { overEvery as and } from 'lodash';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import {
	makeTour,
	Tour,
	Step,
	ButtonRow,
	Next,
	Quit,
	Continue
} from 'layout/guided-tours/config-elements';
import {
	isNewUser,
} from 'state/ui/guided-tours/contexts';
import { isDesktop } from 'lib/viewport';

export const MediaBasicsTour = makeTour(
	<Tour
		name="mediaBasicsTour"
		version="20170321"
		path="/media"
			when={ and(
			isDesktop,
			isNewUser,
			) }
		>
		<Step
			name="init"
			arrow="top-left"
			target=".media-library__upload-buttons"
			placement="below"
			>
			<p>
				{
					translate( 'Welcome to the Media Libary! You can add media by clicking ' +
									'the {{icon/}} {{strong}}Add New{{/strong}} button.',
						{
							components: {
								icon: <Gridicon icon="gridicons-add-image" />,
								strong: <strong />,
							}
						}
					)
				}
			</p>
			<ButtonRow>
				<Next step="drag-and-drop" />
				<Quit />
			</ButtonRow>
		</Step>

		<Step
			name="drag-and-drop"
			placement="right"
			>
			<p>
				{ translate( 'You can also drag-and-drop new media directly into your library as shown here.' ) }
			</p>
			<img
				src="https://cldup.com/AnA1V5AnoE.gif"
				style={ { marginBottom: '10px', border: '3px solid #00AADC', borderRadius: '4px' } }
				/>

			<ButtonRow>
				<Next step="select-image" />
				<Quit />
			</ButtonRow>
		</Step>

		<Step
			name="select-image"
			placement="below"
			arrow="top-left"
			target=".media-library__list-item"
			style={ { marginTop: '-10px' } }
			>

			<Continue click step="click-to-edit" target=".media-library__list-item-figure">
				{ translate( 'Click this image in your media library to continue.' ) }
			</Continue>
		</Step>

		<Step name="click-to-edit"
			placement="below"
			arrow="top-left"
			//when={ and( isImageSelected ) }
			target=".editor-media-modal__secondary-action"
			style={ { marginLeft: '-8px' } }
			>
			<Continue click step="launch-modal" target=".editor-media-modal__secondary-action">
				{ translate( 'Click the Edit button to edit your selected image.' ) }
			</Continue>
		</Step>

		<Step name="launch-modal"
			placement="beside"
			arrow="right-top"
			target=".editor-media-modal-detail__sidebar"
			>
			<p>{ translate( 'You can edit the title, add a caption, find the media URL, and see other details.' ) }
			</p>
			<ButtonRow>
				<Next step="edit-image" />
				<Quit />
			</ButtonRow>
		</Step>

		<Step name="edit-image"
			placement="below"
			arrow="top-left"
			target=".editor-media-modal-detail__edit"
			>
			<p>
				{
					translate( 'You can click the {{icon/}} {{strong}}Edit Image{{/strong}} button to crop, rotate, and ' +
									'perform basic edits to your images.',
						{
							components: {
								icon: <Gridicon icon="gridicons-pencil" />,
								strong: <strong />,
							}
						}
					)
				}
			</p>
			<ButtonRow>
				<Quit primary>{ translate( "Got it, I'm ready to explore!" ) }</Quit>
			</ButtonRow>
		</Step>
	</Tour>
);
