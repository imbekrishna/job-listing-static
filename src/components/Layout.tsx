import { Link, Outlet } from "react-router-dom";
import bgHeaderDesktop from "../assets/images/bg-header-desktop.svg";
import bgHeaderMobile from "../assets/images/bg-header-mobile.svg";
import logoutIcon from "../assets/images/logout.svg";
import useActiveUser from "../hooks/useActiveUser";

const Layout = () => {
  const user = useActiveUser();
  return (
    <div className="min-h-screen">
      <div className="bg-primary">
        <img src={bgHeaderMobile} alt="" className="h-full w-full md:hidden" />
        <img
          src={bgHeaderDesktop}
          alt=""
          className="hidden h-full w-full md:block"
        />
        <div className="absolute left-0 top-0 flex h-auto w-full translate-y-1/2 items-center justify-between p-4 md:py-0 lg:px-16 lg:py-4 2xl:py-7">
          <Link
            to="/"
            className="font-serif text-4xl font-bold tracking-wide text-white"
          >
            Finder
          </Link>
          {!user ? (
            <Link to="/auth" className="btn light ml-auto mr-8">
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-x-4">
              <Link to="/new" className="btn light ml-auto">
                Add new
              </Link>
              <img
                src="https://picsum.photos/100"
                className="aspect-square h-min w-12 rounded-md"
                alt=""
              />
              <button onClick={user.logout}>
                <img className="w-12" src={logoutIcon} alt="" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="relative flex min-h-screen flex-col items-center bg-background px-6">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
