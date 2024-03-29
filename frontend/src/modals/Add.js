import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  Form,
  Button,
  Stack,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../slices/modalSlice';
import socket from '../socket';

const Add = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const hideModal = () => dispatch(closeModal());
  const channelsInfo = useSelector((state) => state.channelsInfo);

  const validate = (values) => {
    const errors = {};
    if (
      !channelsInfo.channels.every((channel) => channel.name !== values.name)
    ) {
      errors.name = t('modal.mustBeUnique');
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: { name: '' },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      socket.emit('newChannel', {
        name: values.name,
      });
      hideModal();
    },
  });

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              autoFocus
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              id="name"
              autoComplete="off"
              isInvalid={formik.errors.name}
            />
            <Form.Label className="visually-hidden" htmlFor="name">
              {t('modal.name')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </FormGroup>
          <Stack direction="horizontal" className="mt-2" gap={2}>
            <Button
              type="button"
              variant="secondary ms-auto"
              onClick={hideModal}
            >
              {t('modal.cancel')}
            </Button>
            <Button type="submit" variant="primary">
              {t('modal.send')}
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
