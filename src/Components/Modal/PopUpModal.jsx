import { Modal } from 'react-bootstrap';

const PopUpModal = ({ title, show, handleClose, children }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{typeof children === 'function' ? children() : children}</Modal.Body>
        </Modal>
    );
};

export default PopUpModal;
