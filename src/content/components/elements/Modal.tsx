import React, { KeyboardEvent, MouseEvent, ReactElement } from "react";

import styles from "./Modal.module.scss";

interface Props {
	children: ReactElement | ReactElement[];
	onClose: () => void;
}

/**
 * Page overlay HOC
 */
const Modal = (props: Props): ReactElement => {
	const { children, onClose } = props;

	// Close modal when "ESC" key is pressed
	const onKeyPress = (event: KeyboardEvent): void => {
		if (event.key === "Escape") {
			onClose();
		}
	};
	const onOuterWrapperClick = onClose;
	const onInnerWrapperClick = (event: MouseEvent): void => event.stopPropagation();

	// - The outer wrapper fills the entire page and darkens the elements behind it. Clicking it
	//   closes the dialog
	// - The inner wrapper contains the actual dialog UI
	return (
		<div
			role="button"
			tabIndex={0}
			className={styles.modalOuterWrapper}
			onClick={onOuterWrapperClick}
			onKeyPress={onKeyPress}
		>
			<div
				role="button"
				tabIndex={0}
				className={styles.modalInnerWrapper}
				onClick={onInnerWrapperClick}
				onKeyPress={onKeyPress}
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;
