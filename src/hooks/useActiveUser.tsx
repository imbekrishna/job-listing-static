import { useCookies } from "react-cookie";

const useActiveUser = () => {
  const [cookies, , removeCookie] = useCookies(["finder_user"]);

  const logout = () => removeCookie("finder_user");

  if (!cookies.finder_user) {
    return null;
  }

  const { firstName, lastName, id, accessToken } = cookies.finder_user;

  return { firstName, lastName, id, accessToken, logout };
};

export default useActiveUser;
