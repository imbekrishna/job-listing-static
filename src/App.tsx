import { useCallback, useEffect, useRef, useState } from "react";
import jobData from "../data.json";
import JobCard from "./components/JobCard";
import SearchBar from "./components/FilterTab";
import { useSearchParams } from "react-router-dom";
import { Job } from "./utils/types";

import bgHeaderDesktop from "./assets/images/bg-header-desktop.svg";
import bgHeaderMobile from "./assets/images/bg-header-mobile.svg";

const App = () => {
  const serachBarRef = useRef<HTMLDivElement | null>(null);

  const [divHeight, setDivHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [filters, setFilters] = useState<string[]>([]);
  const [allJobs] = useState<Job[]>(jobData);
  const [params] = useSearchParams();

  const handleFilter = useCallback(function handleFilter(
    jobs: Job[],
    filters: string[] | undefined,
  ) {
    if (!filters) {
      return jobData;
    }

    const filteredJobs = jobs.filter(({ role, level, languages, tools }) => {
      const jobTags = [role, level, ...languages, ...tools];
      return filters.every((tag) => jobTags.includes(tag));
    });
    return filteredJobs;
  }, []);

  const jobs = filters?.length < 1 ? jobData : handleFilter(allJobs, filters);

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
    <div className="min-h-screen">
      <div className="bg-primary">
        <img src={bgHeaderMobile} alt="" className="h-full w-full md:hidden" />
        <img
          src={bgHeaderDesktop}
          alt=""
          className="hidden h-full w-full md:block"
        />
      </div>
      <div className="relative flex min-h-screen flex-col items-center bg-background px-6">
        <SearchBar ref={serachBarRef} hidden={filters.length < 1} />
        <div
          className="flex w-full flex-1 flex-col items-center gap-14 md:py-4 lg:gap-6"
          style={{
            marginTop: `${getContainerMargin()}px`,
          }}
        >
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default App;
