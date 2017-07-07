/**
 * External dependencies
 */
import { translate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { isEnabled } from 'config';
import {
	COMMENTS_LIKE,
	COMMENTS_UNLIKE,
} from 'state/action-types';
import { http } from 'state/data-layer/wpcom-http/actions';
import { local } from 'state/data-layer/utils';
import { dispatchRequest } from 'state/data-layer/wpcom-http/utils';
import { changeCommentStatus } from 'state/comments/actions';
import { successNotice, errorNotice, removeNotice } from 'state/notices/actions';

export const likeComment = ( { dispatch }, action ) => {
	dispatch( http( {
		method: 'POST',
		apiVersion: '1.1',
		path: `/sites/${ action.siteId }/comments/${ action.commentId }/likes/new`
	}, action ) );
};

export const updateCommentLikes = ( { dispatch }, { siteId, postId, commentId, status }, next, { like_count } ) => {
	dispatch( local( {
		type: COMMENTS_LIKE,
		siteId,
		postId,
		commentId,
		like_count
	} ) );

	if ( isEnabled( 'comments/undo-in-datalayer' ) && 'unapproved' === status ) {
		const noticeId = `comment-notice-${ commentId }`;

		dispatch( removeNotice( noticeId ) );

		dispatch( successNotice( translate( 'Comment approved.' ), {
			duration: 5000,
			id: noticeId,
			isPersistent: true,
			button: translate( 'Undo' ),
			onClick: () => dispatch( changeCommentStatus( siteId, postId, commentId, 'unapproved' ) )
		} ) );
	}
};

/***
 * dispatches a error notice if creating a new comment request failed
 *
 * @param {Function} dispatch redux dispatcher
 */
export const handleLikeFailure = ( { dispatch }, { siteId, postId, commentId } ) => {
	// revert optimistic updated on error
	dispatch( local( { type: COMMENTS_UNLIKE, siteId, postId, commentId } ) );
	// dispatch a error notice
	dispatch( errorNotice( translate( 'Could not like this comment' ) ) );
};

export default {
	[ COMMENTS_LIKE ]: [ dispatchRequest( likeComment, updateCommentLikes, handleLikeFailure ) ]
};
