import { Job } from "../utils/types";
import { Link, useSearchParams } from "react-router-dom";
import { memo } from "react";
import { getTagLabel } from "../utils/helpers";
import { CONTRACT, LANGUAGES, LEVEL, SKILLS } from "../utils/constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function JobCard({ job }: { job: Job }) {
  const [params, setSearchParams] = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const values = new Set(params.get("tag")?.split(","));

    setSearchParams((prevParams) => {
      // const last = prevParams.get(key);
      if (value === null || value === "") {
        prevParams.delete(key);
      } else {
        values?.add(value);
        prevParams.set(key, Array.from(values).toString());
      }
      return prevParams;
    });
  };

  const parseTime = (timeString: string) => dayjs(timeString).fromNow(true);

  return (
    <div
      className={`relative flex w-full max-w-screen-lg flex-col gap-3 rounded-md shadow-custom ${job.featured ? "border-l-[5px] border-l-primary" : ""} bg-white p-5 lg:flex-row lg:items-center lg:gap-6 lg:p-6 lg:px-8`}
    >
      <img
        src={job.logo}
        alt=""
        className="absolute -top-[32px] aspect-square w-16 rounded-full lg:relative lg:top-0 lg:w-auto lg:max-w-24 "
      />
      <div className="flex flex-col gap-3 pt-6 lg:w-1/2 lg:gap-2 lg:p-0">
        <div className="flex items-center gap-2 font-bold">
          <span className="text-lg text-primary">{job.company}</span>
          {job.new && (
            <span className="ml-4 flex max-w-min items-center justify-center rounded-full bg-primary px-2 py-1 text-center text-sm text-white">
              NEW!
            </span>
          )}
          {job.featured && (
            <span className="flex max-w-min items-center justify-center rounded-full bg-black px-2 py-1 text-center text-sm text-white">
              FEATURED
            </span>
          )}
        </div>
        <p className="text-lg font-bold">{job.position}</p>
        <div className="flex items-center gap-3 font-bold text-dGCyan">
          <span>{parseTime(job.postedAt)}</span>
          {/* TODO: Refactor the separator */}
          <span className="h-1 w-1 rounded-full bg-dGCyan"></span>
          <span> {getTagLabel(CONTRACT, job.contract)}</span>
          <span className="h-1 w-1 rounded-full bg-dGCyan"></span>
          <span>{job.location}</span>
        </div>
      </div>
      <hr className="h-[2px] bg-dGCyan lg:hidden" />
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center lg:ml-auto lg:w-1/2 lg:flex-col lg:items-end">
        {/* TODO: Refactor this also */}
        <div className="flex flex-wrap items-center gap-2 lg:ml-auto lg:justify-end">
          <span
            className="tag"
            onClick={() => handleFilterChange("tag", job.role)}
          >
            {job.role}
          </span>
          <span
            className="tag"
            onClick={() => handleFilterChange("tag", job.level)}
          >
            {getTagLabel(LEVEL, job.level)}
          </span>
          {job.languages.map((lang) => (
            <span
              key={lang}
              className="tag"
              onClick={() => handleFilterChange("tag", lang)}
            >
              {getTagLabel(LANGUAGES, lang)}
            </span>
          ))}
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="tag"
              onClick={() => handleFilterChange("tag", skill)}
            >
              {getTagLabel(SKILLS, skill)}
            </span>
          ))}
        </div>
        <Link to={`/details/${job.id}`} className="btn primary">
          View Details
        </Link>
      </div>
    </div>
  );
}

const MemoJobCard = memo(JobCard);
export default MemoJobCard;
