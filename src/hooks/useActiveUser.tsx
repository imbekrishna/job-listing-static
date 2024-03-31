import Cookies from "js-cookie";

const useActiveUser = () => {
  const cookies = Cookies.get("finder_user");
  const logout = () => Cookies.remove("finder_user");

  if (!cookies) {
    return null;
  }

  const userData = JSON.parse(cookies);

  return { ...userData, logout };
};

export default useActiveUser;
