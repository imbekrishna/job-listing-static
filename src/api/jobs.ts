import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { CreateJob } from "../utils/types";
import Cookies from "js-cookie";

const url = "http://localhost:3000";
const cookies = Cookies.get("finder_user");

if (cookies) {
  const data = JSON.parse(cookies || "");
  axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
}

// TODO: Refactor to user Axios Interceptors

export const addNewJob = async (jobDetails: CreateJob) => {
  try {
    const res = await axios.post(`${url}/jobs`, jobDetails);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error("Bad Request");
      } else if (err.response?.status === 403) {
        toast.error("Action not allowed");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Something went wrong");
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
        toast.error("Bad Request");
      } else if (err.response?.status === 403) {
        toast.error("Action not allowed");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Something went wrong");
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
        toast.error("Bad Request");
      } else if (err.response?.status === 403) {
        toast.error("Action not allowed");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Something went wrong");
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
        toast.error("Bad Request");
      } else if (err.response?.status === 403) {
        toast.error("Action not allowed");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Something went wrong");
      }
    }
  }
};

export const deleteJobById = async (jobId: string) => {
  try {
    await axios.delete(`${url}/jobs/${jobId}`);
    toast.success("Job deleted");
  } catch (err) {
    if (err instanceof AxiosError) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error("Bad Request");
      } else if (err.response?.status === 403) {
        toast.error("Action not allowed");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Something went wrong");
      }
    }
  }
};
