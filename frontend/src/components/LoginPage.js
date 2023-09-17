import {
  useFormik,
} from 'formik';

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form className='col-12 mt-3 mt-mb-0' onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <div className='form-floating mb-3'>
        <input
          name="username"
          autoComplete="username"
          required
          placeholder="Ваш ник"
          id="username"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="username">Ваш ник</label>
      </div>
      <div className='form-floating mb-4'>
        <input
          name="password"
          autoComplete="current-password"
          required
          placeholder="Пароль"
          type='password'
          id='password'
          className='form-control'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <label className="form-label" htmlFor="password">Пароль</label>
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </form>
  );
};

const LoginPage = () => {
  return(
    <div className="login d-flex flex-column h-100 text-light">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand text-light" href="/">Chat</a>
        </div>
      </nav>
      <div className='container-fluid h-100'>
        <div className='row justify-content-center align-content-center h-100'>
          <div className='col-12 col-md-8 col-xxl-6'>
            <div className='card border-light shadow-sm'>
              <div className='card-body row p-5'>
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