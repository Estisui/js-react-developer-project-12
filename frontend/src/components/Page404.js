import { useTranslation } from "react-i18next";
import Header from "./Header";

const Page404 = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="d-flex align-items-center justify-content-center vh-100">
        <h1 className="display-1 fw-bold text-white">{t("page404")}</h1>
      </div>
    </div>
  );
};

export default Page404;
