import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { CreateJob } from "../utils/types";
import Cookies from "js-cookie";

const url = "http://localhost:3000";
const cookies = Cookies.get("finder_user");
const data = JSON.parse(cookies ?? "");

axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

// TODO: Update error messages

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

export const getAllJobs = async () => {
  try {
    const res = await axios.get(`${url}/jobs`);
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

export const updateJob = async (jobId: string, jobDetails: CreateJob) => {
  try {
    const res = await axios.put(`${url}/jobs/${jobId}`, jobDetails);
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

export const getJobById = async (jobId: string) => {
  try {
    const res = await axios.get(`${url}/jobs/${jobId}`);
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
