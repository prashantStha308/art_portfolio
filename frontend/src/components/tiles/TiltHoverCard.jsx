/* eslint-disable react/prop-types */
import * as React from 'react';

export default function TiltHoverCard ({
	children,
	max = 3,
	perspective = 800,
	scale = 1,
	speed = 1500,
	easing = 'cubic-bezier(.03,.98,.52,.99)',
	isReverse = false,
}){
	const cardRef = React.useRef(null);

	// set the transition
	const setTransition = () => {
		const card = cardRef.current;

		clearTimeout(card.transitionTimeoutId);
		card.style.transition = `transform ${speed}ms ${easing}`;

		card.transitionTimeoutId = setTimeout(() => {
			card.style.transition = '';
		}, speed);
	};

	// handle mouse enter event
	const handleMouseEnter = () => {
		setTransition();
	};

	// handle mouse move event
	const handleMouseMove = (event) => {
		const {
			offsetWidth,
			offsetHeight,
			offsetLeft,
			offsetTop,
			style: cardStyles,
		} = cardRef.current;

		const cardWidth = offsetWidth;
		const cardHeight = offsetHeight;

		const centerX = offsetLeft + cardWidth / 2;
		const centerY = offsetTop + cardHeight / 2;

		const mouseX = event.clientX - centerX;
		const mouseY = event.clientY - centerY;

		const rotateXUncapped = (+1 * max * mouseY) / (cardHeight / 2);
		const rotateYUncapped = (-1 * max * mouseX) / (cardWidth / 2);

		const getRotateDeg = (direction) => {

			const rotateUnCappedObj = {
				X: rotateXUncapped,
				Y: rotateYUncapped,
			};

			const rotateUnCapped = rotateUnCappedObj[direction];

			if (rotateUnCapped < -max) {
				return -max;
			}

			if (rotateUnCapped > max) {
				return rotateUnCapped > max;
			}

			return rotateUnCapped;
		};

		const rotateX = getRotateDeg('X');
		const rotateY = getRotateDeg('Y');

		// get transform styles
		const getTransformStyles = () => {
			const perspectiveStyle = `perspective(${perspective}px)`;
			const xDeg = isReverse ? -rotateX : rotateX;
			const yDeg = isReverse ? -rotateY : rotateY;
			const rotateXStyle = `rotateX(${xDeg}deg)`;
			const rotateYStyle = `rotateY(${yDeg}deg)`;
			const scaleStyle = `scale3d(${scale}, ${scale}, ${scale})`;

			return perspectiveStyle + rotateXStyle + rotateYStyle + scaleStyle;
		};

		// apply transform styles
		cardStyles.transform = getTransformStyles();
	};

	// handle mouse leave event
	const handleMouseLeave = () => {
		const card = cardRef.current;
		// reset transform styles
		card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
		setTransition();
	};

	return (
		<div
			ref={cardRef}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
			style={{ transformStyle: 'preserve-3d' }}
		>
			{children}
		</div>
	);
};