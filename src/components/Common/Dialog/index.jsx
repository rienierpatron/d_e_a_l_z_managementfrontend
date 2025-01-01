/**
 * External dependencies
 */
import { Modal } from "flowbite-react";
import classNames from "classnames";

const Dialog = ({
  show,
  header,
  headerClassName,
  footer,
  footerClassName,
  onClose,
  children,
  className,
  contentClassName,
  size
}) => {
  return (
    <Modal show={show} onClose={onClose} className={className} size={size}>
      <Modal.Header className={classNames("border-none", headerClassName)}>
        {header}
      </Modal.Header>
      <Modal.Body className={contentClassName}>{children}</Modal.Body>
      {footer && (
        <Modal.Footer className={classNames("border-none", footerClassName)}>
          {footer}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default Dialog;
