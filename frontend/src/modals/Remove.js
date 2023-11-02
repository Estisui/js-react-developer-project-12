import { Modal, Button, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { closeModal } from "../slices/modalSlice";
import { socket } from "../socket";

const Remove = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const hideModal = () => dispatch(closeModal());
  const removeChannel = () => {
    socket.emit("removeChannel", {
      id: id,
    });
    hideModal();
  };

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <Stack direction="horizontal" className="mt-2" gap={2}>
          <Button type="button" variant="secondary ms-auto" onClick={hideModal}>
            Отменить
          </Button>
          <Button type="button" variant="danger" onClick={removeChannel}>
            Удалить
          </Button>
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
