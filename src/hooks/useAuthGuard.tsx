import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

/**
 * Hook to prevent user from accessing protected routes without login.
 */
const useAuthGuard = () => {
  const navigate = useNavigate();
  const data = Cookies.get("finder_user");

  useEffect(() => {
    if (!data) {
      navigate("/auth");
    }
  }, [data, navigate]);
};

export default useAuthGuard;
