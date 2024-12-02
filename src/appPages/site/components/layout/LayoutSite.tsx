import { FC, ReactNode } from "react";
import scss from "./LayoutSite.module.scss";
import Header from "./header/Header";
import Footer from "./footer/Footer";

interface LayoutSiteProps {
  children: ReactNode;
}

const LayoutSite: FC<LayoutSiteProps> = ({ children }) => {
  return (
    <div className={scss.LayoutSite}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutSite;
