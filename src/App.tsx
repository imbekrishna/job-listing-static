import { useEffect, useRef, useState } from "react";
import jobData from "../data.json";
import JobCard from "./components/JobCard";
import SearchBar from "./components/SearchBar";

const App = () => {
  const serachBarRef = useRef<HTMLDivElement | null>(null);
  const [divHeight, setDivHeight] = useState(0);
  const [filters, useFilters] = useState([
    "Frontend",
    "Sass",
    "React",
    "Fullstack",
  ]);

  useEffect(() => {
    if (!serachBarRef.current) return;
    const divHeight = serachBarRef.current.offsetHeight;
    setDivHeight(divHeight);
  }, [filters]);

  return (
    <div className="h-screen">
      <div className="bg-primary">
        <img
          src="/src/assets/images/bg-header-mobile.svg"
          alt=""
          className="h-auto w-full md:hidden"
        />
        <img
          src="/src/assets/images/bg-header-desktop.svg"
          alt=""
          className="hidden h-auto w-full md:block"
        />
      </div>
      <div className="bg-background relative flex flex-col items-center px-6">
        <SearchBar ref={serachBarRef} tags={filters} />
        <div
          className="flex w-full flex-1 flex-col items-center gap-14 md:pt-4 lg:gap-6"
          style={{
            marginTop: `${divHeight <= 75 ? divHeight : divHeight / 2 + 50}px`,
          }}
        >
          {jobData.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default App;
