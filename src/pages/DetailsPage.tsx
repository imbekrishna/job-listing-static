import { Navigate, useParams } from "react-router-dom";
import jobData from "../../data.json";

const DetailsPage = () => {
  const { jobId } = useParams();

  if (!jobId) {
    return <Navigate to={"/"} />;
  }

  const job = jobData.find((job) => job.id == +jobId);

  if (!job) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="my-8 flex max-w-screen-md flex-col gap-y-3 lg:p-8 lg:shadow-custom ">
      <div className="flex items-center gap-3 text-dGCyan">
        <span>{job.postedAt}</span>
        <span className="h-1 w-1 rounded-full bg-dGCyan"></span>
        <span>{job.contract}</span>
        <span className="h-1 w-1 rounded-full bg-dGCyan"></span>
        <span>{job.location}</span>
      </div>
      <div className="flex items-end justify-between md:items-start">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">{job.position}</h1>
          <p className="text-lg text-primary">
            {job.role} | {job.level}
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
          officiis deleniti a explicabo nobis ullam dolorum tempora ipsa vel
          perferendis. Voluptatem, cum commodi doloribus consequatur fuga
          asperiores expedita quae ex velit fugit ipsa reiciendis cumque soluta
          delectus qui tempora neque.
        </p>
      </div>
      <div className="mt-2">
        <p className="text-xl font-semibold">About position</p>
        <p className="text-lg leading-normal text-vDGCyan">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
          officiis deleniti a explicabo nobis ullam dolorum tempora ipsa vel
          perferendis. Voluptatem, cum commodi doloribus consequatur fuga
          asperiores expedita quae ex velit fugit ipsa reiciendis cumque soluta
          delectus qui tempora neque.
        </p>
      </div>
      <div className="mt-2">
        <p className="text-xl font-semibold">Skills / Tools</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded-sm bg-primary px-2 py-1 font-medium text-white">
            {job.role}
          </span>
          <span className="rounded-sm bg-primary px-2 py-1 font-medium text-white">
            {job.level}
          </span>
          {job.languages.map((lang) => (
            <span
              key={lang}
              className="rounded-sm bg-primary px-2 py-1 font-medium text-white"
            >
              {lang}
            </span>
          ))}
          {job.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-sm bg-primary px-2 py-1 font-medium text-white"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-xl font-semibold">Additional Information</p>
        <p className="text-lg leading-normal text-vDGCyan">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
          officiis deleniti a explicabo nobis ullam dolorum tempora ipsa vel
          perferendis.
        </p>
      </div>
      <button className="btn-primary mt-4">Apply Now</button>
    </div>
  );
};
export default DetailsPage;
