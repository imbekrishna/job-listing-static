import { Field, Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { CONTRACT, LANGUAGES, LEVEL, SKILLS } from "../utils/constants";
import CustomMultiSelect from "./MultiSelect";
import { TextInput, TextArea } from "./FormikElements";
import useAuthGuard from "../hooks/useAuthGuard";
import { addNewJob, updateJob } from "../api/jobs";
import useActiveUser from "../hooks/useActiveUser";

const AddJobForm = () => {
  useAuthGuard();
  const { isRecruiterOrAdmin } = useActiveUser();

  const navigate = useNavigate();
  const { state } = useLocation();
  const btnText = state ? "Update" : "Submit";
  const titleText = state ? "Edit job" : "Add new";

  if (!isRecruiterOrAdmin) navigate("/");

  return (
    <div className="my-8 w-full max-w-screen-md">
      <h1 className="mb-4 text-3xl font-semibold tracking-wide">{titleText}</h1>
      <Formik
        initialValues={
          state
            ? state
            : {
                company: "",
                logo: "",
                new: true,
                featured: true,
                position: "",
                role: "",
                level: "",
                postedAt: Date.now(),
                contract: "",
                location: "",
                languages: [],
                skills: [],
                aboutCompany: "",
                aboutPosition: "",
                additionalInfo: "",
              }
        }
        validationSchema={Yup.object({
          company: Yup.string().required("Required"),
          logo: Yup.string().required("Required").url("Must be a valid url"),
          position: Yup.string().required("Required"),
          role: Yup.string().required("Required"),
          level: Yup.string()
            .required("Required")
            .oneOf(["senior", "junior", "midweight", "intern"]),
          contract: Yup.string()
            .required("Required")
            .oneOf(["full_time", "part_time", "contract"]),
          location: Yup.string().required("Required"),
          languages: Yup.array()
            .of(Yup.string())
            .min(2, "Select at least 2 languages"),
          skills: Yup.array()
            .of(Yup.string())
            .min(2, "Select at least 2 skills"),
          aboutCompany: Yup.string()
            .required("Required")
            .min(50, "Minimum 50 chars required"),
          aboutPosition: Yup.string()
            .required("Required")
            .min(50, "Minimum 50 chars required"),
          additionalInfo: Yup.string().min(10, "Minimum 10 chars required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          if (state) {
            const data = await updateJob(state.id, values);
            console.log(data);
          } else {
            const data = await addNewJob(values);
            console.log(data);
          }
          setSubmitting(false);
          navigate("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-y-3 text-white">
            <TextInput
              label="Company"
              name="company"
              type="text"
              placeholder="Company name"
            />
            <TextInput
              label="Logo"
              name="logo"
              type="text"
              placeholder="Logo URL"
            />
            <TextInput
              label="Position"
              name="position"
              type="text"
              placeholder="Job position"
            />
            <TextInput
              label="Role"
              name="role"
              type="text"
              placeholder="Job role"
            />
            <Field
              label="Level"
              name="level"
              options={LEVEL}
              component={CustomMultiSelect}
              placeholder="Select level"
              isMulti={false}
            />
            <Field
              label="Contract"
              name="contract"
              options={CONTRACT}
              component={CustomMultiSelect}
              placeholder="Select contract"
              isMulti={false}
            />
            <TextInput
              label="Location"
              name="location"
              type="text"
              placeholder="Location"
            />
            <Field
              label="Languages"
              name="languages"
              options={LANGUAGES}
              component={CustomMultiSelect}
              placeholder="Select languages"
              isMulti={true}
            />
            <Field
              label="Skills"
              name="skills"
              options={SKILLS}
              component={CustomMultiSelect}
              placeholder="Select skills"
              isMulti={true}
            />
            {/* TODO: Can we add markdown? */}
            <TextArea
              label="About Company"
              name="aboutCompany"
              type="text"
              placeholder="Write about the company"
            />
            <TextArea
              label="About position"
              name="aboutPosition"
              type="text"
              placeholder="Write about the position"
            />
            <TextArea
              label="Aditional Info"
              name="additionalInfo"
              type="text"
              placeholder="Everything else"
            />
            <button
              className={`btn primary mt-3 ${isSubmitting && "bg-gray-400"}`}
              disabled={isSubmitting}
              type="submit"
            >
              {btnText}
            </button>
            <button
              className={`btn secondary ${isSubmitting && "bg-gray-400"}`}
              disabled={isSubmitting}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddJobForm;
