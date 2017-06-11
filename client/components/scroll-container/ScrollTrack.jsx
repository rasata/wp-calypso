/**
 * External Dependencies
 */
import React, { PropTypes, PureComponent } from 'react';
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import { BASE_CLASS } from './helpers/constants';

export default class ScrollTrack extends PureComponent {
	render() {
		const { className, direction, puckHovered, puckOffset, puckSize, style, trackHovered } = this.props;
		const isVertical = direction === 'vertical';
		const isHorizontal = direction === 'horizontal';
		const hoverClass = `${ BASE_CLASS }-is-hovered`;
		const puckStyles = {
			height: isVertical ? `${ puckSize }px` : null,
			left: isHorizontal ? `${ puckOffset }px` : null,
			top: isVertical ? `${ puckOffset }px` : null,
			width: isHorizontal ? `${ puckSize }px` : null,
		};
		const trackClasses = classnames( `${ BASE_CLASS }__track ${ BASE_CLASS }__track-${ direction }`, className, {
			[ hoverClass ]: trackHovered,
		} );
		const puckClasses = classnames( `${ BASE_CLASS }__puck ${ BASE_CLASS }__puck-${ direction }`, {
			[ hoverClass ]: puckHovered,
		} );
		return (
			<div ref={ this.props.refFn } className={ trackClasses } style={ style }>
				<div
					className={ puckClasses }
					style={ puckStyles }
				/>
			</div>
		);
	}
}

ScrollTrack.propTypes = {
	className: PropTypes.string,
	direction: PropTypes.oneOf( [ 'vertical', 'horizontal' ] ),
	refFn: PropTypes.func,
	puckHovered: PropTypes.bool,
	puckOffset: PropTypes.number.isRequired,
	puckSize: PropTypes.number.isRequired,
	style: PropTypes.object,
	trackHovered: PropTypes.bool,
};

ScrollTrack.defaultProps = {
	puckHovered: false,
	trackHovered: false,
};
