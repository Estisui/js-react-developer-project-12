import Header from "./Header";

const Page404 = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="d-flex align-items-center justify-content-center vh-100">
        <h1 className="display-1 fw-bold text-white">404</h1>
      </div>
    </div>
  );
};

export default Page404;
