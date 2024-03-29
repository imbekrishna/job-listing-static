import { Outlet } from "react-router-dom";
import bgHeaderDesktop from "../assets/images/bg-header-desktop.svg";
import bgHeaderMobile from "../assets/images/bg-header-mobile.svg";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-primary">
        <img src={bgHeaderMobile} alt="" className="h-full w-full md:hidden" />
        <img
          src={bgHeaderDesktop}
          alt=""
          className="hidden h-full w-full md:block"
        />
      </div>
      <div className="relative flex min-h-screen flex-col items-center bg-background px-6">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
