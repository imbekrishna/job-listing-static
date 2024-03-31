import { Link, useNavigate, useParams } from "react-router-dom";
import { CONTRACT, LANGUAGES, LEVEL, SKILLS } from "../utils/constants";
import { getTagLabel, parseTimeString } from "../utils/helpers";
import { deleteJobById, getJobById } from "../api/jobs";
import { useCallback, useEffect, useState } from "react";
import { Job } from "../utils/types";
import useActiveUser from "../hooks/useActiveUser";

const DetailsPage = () => {
  const navigate = useNavigate();
  const { user, isRecruiterOrAdmin } = useActiveUser();
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | undefined>();
  const [loading, setLoading] = useState(false);

  const isSameAuthor = user?.id === job?.refUserId;

  const fetchJobById = useCallback(async (id: string) => {
    setLoading(true);
    const data = await getJobById(id);
    setJob(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!jobId) {
      return navigate("/");
    }
    fetchJobById(jobId);
  }, [fetchJobById, jobId, navigate]);

  if (loading || !job) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="my-8 flex max-w-screen-md flex-col gap-y-3 lg:p-8 lg:shadow-custom ">
      <div className="flex items-center gap-3 text-dGCyan">
        <span className="capitalize">
          {parseTimeString(job.postedAt, false)}
        </span>
        <span className="h-1 w-1 rounded-full bg-dGCyan"></span>
        <span> {getTagLabel(CONTRACT, job.contract)}</span>
        <span className="h-1 w-1 rounded-full bg-dGCyan"></span>
        <span>{job.location}</span>
      </div>
      <div className="flex items-end justify-between md:items-start">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">{job.position}</h1>
          <p className="text-lg text-primary">
            {job.role} | {getTagLabel(LEVEL, job.level)}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img src={job.logo} alt="" className="aspect-square w-14" />
          <p>{job.company}</p>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-xl font-semibold">About company</p>
        <p className="text-lg leading-normal text-vDGCyan">
          {job.aboutCompany}
        </p>
      </div>
      <div className="mt-2">
        <p className="text-xl font-semibold">About position</p>
        <p className="text-lg leading-normal text-vDGCyan">
          {job.aboutPosition}
        </p>
      </div>
      <div className="mt-2">
        <p className="text-xl font-semibold">Skills / Tools</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded-sm bg-primary px-2 py-1 font-medium text-white">
            {job.role}
          </span>
          <span className="rounded-sm bg-primary px-2 py-1 font-medium text-white">
            {getTagLabel(LEVEL, job.level)}
          </span>
          {job.languages.map((lang) => (
            <span
              key={lang}
              className="rounded-sm bg-primary px-2 py-1 font-medium text-white"
            >
              {getTagLabel(LANGUAGES, lang)}
            </span>
          ))}
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-sm bg-primary px-2 py-1 font-medium text-white"
            >
              {getTagLabel(SKILLS, skill)}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-xl font-semibold">Additional Information</p>
        <p className="text-lg leading-normal text-vDGCyan">
          {job.additionalInfo}
        </p>
      </div>
      <button className="btn primary mt-4">Apply Now</button>
      {isRecruiterOrAdmin && isSameAuthor && (
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => deleteJobById(job.id)}
            className="btn danger flex-1"
          >
            Delete Job
          </button>
          <Link to="/edit" state={job} className="btn secondary flex-1">
            Edit Job
          </Link>
        </div>
      )}
    </div>
  );
};
export default DetailsPage;
