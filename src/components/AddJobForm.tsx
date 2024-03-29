import { Field, FieldHookConfig, Form, Formik, useField } from "formik";
import { ClassAttributes, InputHTMLAttributes, ReactNode } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import CustomMultiSelect from "./MultiSelect";
import { CONTRACT, LANGUAGES, LEVEL, SKILLS } from "../utils/constants";

interface OtherProps {
  children?: ReactNode;
  label: string;
}

const TextInput = ({
  label,
  ...props
}: OtherProps &
  InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-1">
      <label className="text-primary" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className="rounded-sm py-2 indent-2 text-vDGCyan"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

const TextArea = ({
  label,
  ...props
}: OtherProps &
  InputHTMLAttributes<HTMLTextAreaElement> &
  ClassAttributes<HTMLTextAreaElement> &
  FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-1">
      <label className="text-primary" htmlFor={props.id || props.name}>
        {label}
      </label>
      <textarea
        className="rounded-sm py-2 indent-2 text-vDGCyan"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

const AddJobForm = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
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
      }}
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
        skills: Yup.array().of(Yup.string()).min(2, "Select at least 2 skills"),
        aboutCompany: Yup.string()
          .required("Required")
          .min(50, "Minimum 50 chars required"),
        aboutPosition: Yup.string()
          .required("Required")
          .min(50, "Minimum 50 chars required"),
        additionalInfo: Yup.string().min(10, "Minimum 10 chars required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          //   localStorage.setItem(
          //     "superapp-user-data",
          //     JSON.stringify(values, null, 2),
          //   );
          console.log(values);
          setSubmitting(false);
          navigate("/");
          return;
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="my-8 flex w-full max-w-screen-md flex-col gap-y-2 text-white">
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
            className={`btn-primary mt-3 ${isSubmitting && "bg-gray-400"}`}
            disabled={isSubmitting}
            type="submit"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddJobForm;
