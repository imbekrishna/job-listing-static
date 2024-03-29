import axios from "axios";

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
  const res = await axios.post(`${url}/auth`, {
    email,
    password,
  });

  console.log(res.data);

  return res.data;
};
