import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { PermissionFlag } from "../utils/types";

interface IActiveUser {
  id: string;
  accessToken: string;
  refreshToken: string;
  permissionFlags: number;
  firstName: string;
  lastName: string;
}

const useActiveUser = () => {
  const [activeUser, setActiveUser] = useState<IActiveUser | null>(null);

  const cookies = Cookies.get("finder_user");

  useEffect(() => {
    if (cookies) {
      const userData = JSON.parse(cookies);
      if (!activeUser) {
        setActiveUser(userData);
      }
    }
  }, [activeUser, cookies]);

  const isRecruiterOrAdmin = activeUser
    ? activeUser.permissionFlags === PermissionFlag.RECRUITER_PERMISSION ||
      activeUser.permissionFlags === PermissionFlag.ADMIN_PERMISSION
    : false;

  const logout = () => {
    setActiveUser(null);
    Cookies.remove("finder_user");
  };

  return { user: activeUser, isRecruiterOrAdmin, logout };
};

export default useActiveUser;
