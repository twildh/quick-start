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
  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      onClose();
    }
  };
  const onOuterWrapperClick = onClose;
  const onInnerWrapperClick = (event: MouseEvent): void =>
    event.stopPropagation();

  // - The outer wrapper fills the entire page and darkens the elements behind it. Clicking it
  //   closes the dialog
  // - The inner wrapper contains the actual dialog UI
  return (
    <div
      role="presentation"
      className={styles.modalOuterWrapper}
      onClick={onOuterWrapperClick}
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        role="dialog"
        className={styles.modalInnerWrapper}
        onClick={onInnerWrapperClick}
        onKeyDown={onKeyDown}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
