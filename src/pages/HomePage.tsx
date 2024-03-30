import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Job } from "../utils/types";
import SearchBar from "../components/FilterTab";
import MemoJobCard from "../components/JobCard";
import { getAllJobs } from "../api/jobs";
// import jobData from "../../data.json";

const HomePage = () => {
  const serachBarRef = useRef<HTMLDivElement | null>(null);

  const [jobData, setJobData] = useState<Job[]>([]);
  const [divHeight, setDivHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [filters, setFilters] = useState<string[]>([]);
  const [allJobs] = useState<Job[]>([]);
  const [params] = useSearchParams();

  const handleFilter = useCallback(
    function handleFilter(jobs: Job[], filters: string[] | undefined) {
      if (!filters) {
        return jobData;
      }

      const filteredJobs = jobs.filter(({ role, level, languages, skills }) => {
        const jobTags = [role, level, ...languages, ...skills];
        return filters.every((tag) => jobTags.includes(tag));
      });
      return filteredJobs;
    },
    [jobData],
  );

  const jobs = filters?.length < 1 ? jobData : handleFilter(allJobs, filters);

  const fetchAllJobs = async () => {
    const res = await getAllJobs();
    setJobData(res);
  };

  useEffect(() => {
    if (jobData.length === 0) {
      fetchAllJobs();
    }
  }, [jobData]);

  useEffect(() => {
    const tags = params.get("tag")?.split(",");
    setFilters(tags ?? []);
  }, [params]);

  useEffect(() => {
    if (!serachBarRef.current) return;
    const divHeight = serachBarRef.current.offsetHeight;
    setDivHeight(divHeight);
    const { innerWidth: width } = window;
    setWindowWidth(width);
  }, [filters]);

  function getContainerMargin() {
    if (windowWidth < 1024) {
      return divHeight / 2 + 50;
    } else {
      return divHeight;
    }
  }

  return (
    <>
      <SearchBar ref={serachBarRef} hidden={filters.length < 1} />
      <div
        className="mb-4 flex w-full flex-1 flex-col items-center gap-14 md:py-4 lg:gap-6"
        style={{
          marginTop: `${getContainerMargin()}px`,
        }}
      >
        {jobs && jobs.map((job) => <MemoJobCard key={job.id} job={job} />)}
      </div>
    </>
  );
};
export default HomePage;
