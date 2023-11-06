import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import UserContext from '../slices/UserContext';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';

const SignUpForm = () => {
  const { t } = useTranslation();
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('signUp.usernameLength'))
      .max(20, t('signUp.usernameLength'))
      .required(t('signUp.required')),
    password: Yup.string()
      .min(6, t('signUp.passwordLength'))
      .required(t('signUp.required')),
    confirmPassword: Yup.string()
      .required(t('signUp.required'))
      .oneOf([Yup.ref('password')], t('signUp.wrong')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: ({ username, password }, { setFieldError }) => {
      axios
        .post('/api/v1/signup', { username, password })
        .then((response) => {
          const { data } = response;
          localStorage.setItem('user', JSON.stringify(data));
          setCurrentUser(data);
          navigate('/');
        })
        .catch((e) => {
          if (e.code === 'ERR_NETWORK') {
            toast.error(t('error.connection'), { theme: 'dark' });
          } else {
            setFieldError('username', t('signUp.userExists'));
          }
        });
    },
  });

  return (
    <Form className="col-12 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('signUp.registration')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          name="username"
          autoComplete="username"
          required
          placeholder={t('signUp.username')}
          id="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={formik.errors.username}
        />
        <Form.Label htmlFor="username">{t('signUp.username')}</Form.Label>
        <Form.Control.Feedback type="invalid">
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          name="password"
          autoComplete="new-password"
          required
          placeholder={t('signUp.password')}
          type="password"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={formik.errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
        <Form.Label htmlFor="password">{t('signUp.password')}</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          name="confirmPassword"
          autoComplete="new-password"
          required
          placeholder={t('signUp.confirmPassword')}
          type="password"
          id="confirmPassword"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          isInvalid={formik.errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.confirmPassword}
        </Form.Control.Feedback>
        <Form.Label htmlFor="confirmPassword">
          {t('signUp.confirmPassword')}
        </Form.Label>
      </Form.Group>
      <Button type="submit" className="w-100 mb-3">
        {t('signUp.signUp')}
      </Button>
    </Form>
  );
};

const SignUp = () => {
  return (
    <div className="login d-flex flex-column h-100 text-light">
      <Header />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card border-light shadow-sm">
              <div className="card-body row p-5">
                <SignUpForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
