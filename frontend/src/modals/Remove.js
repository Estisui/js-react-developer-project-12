import { Modal, Button, Stack } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { closeModal } from "../slices/modalSlice";
import { socket } from "../socket";
import { useTranslation } from "react-i18next";

const Remove = (props) => {
  const { id } = props;
  const { t } = useTranslation();
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
        <Modal.Title>{t("modal.removeChannel")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t("modal.sure")}</p>
        <Stack direction="horizontal" className="mt-2" gap={2}>
          <Button type="button" variant="secondary ms-auto" onClick={hideModal}>
            {t("modal.cancel")}
          </Button>
          <Button type="button" variant="danger" onClick={removeChannel}>
            {t("modal.delete")}
          </Button>
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
