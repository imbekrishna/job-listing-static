import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { CreateJob } from "../utils/types";

const url = "http://localhost:3000";

export const addNewJob = async (jobDetails: CreateJob) => {
  try {
    const res = await axios.post(`${url}/jobs`, jobDetails);
    return res.data;
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
