import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import UserContext from "../slices/UserContext";

const SignUpForm = () => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "От 3 символов")
      .max(20, "До 20 символов")
      .required("Обязательное поле"),
    password: Yup.string()
      .min(6, "От 6 символов")
      .required("Обязательное поле"),
    confirmPassword: Yup.string()
      .required("Обязательное поле")
      .oneOf([Yup.ref("password")], "Пароли не совпадают"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: ({ username, password }, { setFieldError }) => {
      axios
        .post("/api/v1/signup", { username, password })
        .then((response) => {
          const { data } = response;
          localStorage.setItem("user", JSON.stringify(data));
          setCurrentUser(data);
          navigate("/");
        })
        .catch(() =>
          setFieldError("username", "Такой пользователь уже существует"),
        );
    },
  });

  return (
    <Form className="col-12 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Регистрация</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          name="username"
          autoComplete="username"
          required
          placeholder="Имя пользователя"
          id="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={formik.errors.username}
        />
        <Form.Label htmlFor="username">Имя пользователя</Form.Label>
        <Form.Control.Feedback type="invalid">
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          name="password"
          autoComplete="new-password"
          required
          placeholder="Пароль"
          type="password"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={formik.errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
        <Form.Label htmlFor="password">Пароль</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          name="confirmPassword"
          autoComplete="new-password"
          required
          placeholder="Подтвердите пароль"
          type="password"
          id="confirmPassword"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          isInvalid={formik.errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.confirmPassword}
        </Form.Control.Feedback>
        <Form.Label htmlFor="password">Подтвердите пароль</Form.Label>
      </Form.Group>
      <Button type="submit" className="w-100 mb-3">
        Зарегистрироваться
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
    </div>
  );
};

export default SignUp;
