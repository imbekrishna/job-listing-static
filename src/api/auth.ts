import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const url = "http://localhost:3000";

export const register = async ({
  name,
  email,
  password,
  confirmPassword,
  acceptedTerms,
}: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}) => {
  const res = await axios.post(`${url}/users`, {
    name,
    email,
    password,
    confirmPassword,
    acceptedTerms,
  });

  return res.data;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${url}/auth`, {
      email,
      password,
    });

    Cookies.set("finder_user", JSON.stringify(res.data), {
      sameSite: "lax",
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error("Invalid Username or Password");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Login Failed");
      }
    }
  }
};
