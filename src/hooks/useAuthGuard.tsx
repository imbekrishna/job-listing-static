import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

/**
 * Hook to prevent user from accessing protected routes without login.
 */
const useAuthGuard = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["finder_user"]);

  useEffect(() => {
    if (!cookies?.finder_user) {
      navigate("/auth");
    }
  }, [cookies?.finder_user, navigate]);
};

export default useAuthGuard;
