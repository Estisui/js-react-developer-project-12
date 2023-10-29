import { useFormik } from "formik";
import {
  Modal,
  FormGroup,
  FormControl,
  Form,
  Button,
  Stack,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { closeModal } from "../slices/modalSlice";
import { socket } from "../socket";
import { useSelector } from "react-redux";

const Rename = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const hideModal = () => dispatch(closeModal());
  const channelsInfo = useSelector((state) => state.channelsInfo);

  const validate = (values) => {
    const errors = {};
    if (
      !channelsInfo.channels.every((channel) => channel.name !== values.name)
    ) {
      errors.name = "Должно быть уникальным";
    }
    return errors;
  };

  const f = useFormik({
    initialValues: {
      name: channelsInfo.channels.find((channel) => channel.id === id).name,
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      socket.emit("renameChannel", {
        id: id,
        name: values.name,
      });
      hideModal();
    },
  });

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              autoFocus
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              name="name"
              id="name"
              autoComplete="off"
              isInvalid={f.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {f.errors.name}
            </Form.Control.Feedback>
          </FormGroup>
          <Stack direction="horizontal" className="mt-2" gap={2}>
            <Button
              type="button"
              variant="secondary ms-auto"
              onClick={hideModal}
            >
              Отменить
            </Button>
            <Button type="submit" variant="primary">
              Отправить
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
