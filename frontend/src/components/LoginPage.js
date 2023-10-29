import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Header from "./Header";
import UserContext from "../slices/UserContext";

const LoginPage = () => {
  const SignupForm = () => {
    const { setCurrentUser } = useContext(UserContext);
    const [authFailed, setAuthFailed] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      onSubmit: (values) => {
        axios
          .post("/api/v1/login", values)
          .then((response) => {
            const { data } = response;
            setAuthFailed(false);
            localStorage.setItem("user", JSON.stringify(data));
            setCurrentUser(data);
            navigate("/");
          })
          .catch(() => {
            setAuthFailed(true);
          });
      },
    });

    return (
      <Form className="col-12 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
        <h1 className="text-center mb-4">Войти</h1>
        <Form.Group className="form-floating mb-3">
          <Form.Control
            name="username"
            autoComplete="username"
            required
            placeholder="Ваш ник"
            id="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            isInvalid={authFailed}
          />
          <Form.Label htmlFor="username">Ваш ник</Form.Label>
        </Form.Group>
        <Form.Group className="form-floating mb-4">
          <Form.Control
            name="password"
            autoComplete="current-password"
            required
            placeholder="Пароль"
            type="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            isInvalid={authFailed}
          />
          <Form.Control.Feedback type="invalid">
            Неверные имя пользователя или пароль
          </Form.Control.Feedback>
          <Form.Label htmlFor="password">Пароль</Form.Label>
        </Form.Group>
        <Button type="submit" className="w-100 mb-3">
          Войти
        </Button>
      </Form>
    );
  };

  return (
    <div className="login d-flex flex-column h-100 text-light">
      <Header />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card border-light shadow-sm">
              <div className="card-body row p-5">
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
