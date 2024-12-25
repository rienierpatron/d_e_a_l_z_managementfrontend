import { Modal } from "flowbite-react";
import Typography from "../Typography";
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
}) => {
  return (
    <Modal show={show} onClose={onClose} className={className}>
      <Modal.Header className={classNames("border-none", headerClassName)}>
        {header}
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footer && (
        <Modal.Footer className={classNames("border-none", footerClassName)}>
          {footer}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default Dialog;
