import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput, CheckBox } from "../components/FormikElements";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const btnText = isLogin ? "Login" : "Register";
  const toggleText = isLogin
    ? "New Here? Create account."
    : "Already have an account?";
  const linkText = isLogin ? "Register" : "Login";

  const toggleForms = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLogin((prev) => !prev);
  };

  const registerSchema = Yup.object({
    name: Yup.string()
      .max(15, "Must be 15 character or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Must be 8 characters or more"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
    acceptedTerms: Yup.boolean()
      .required("Required")
      .oneOf([true], "You must accept the terms and conditions"),
  });

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Must be 8 characters or more"),
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 lg:px-14">
      <p className="self-start font-serif text-3xl text-primary">Finder</p>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          acceptedTerms: false,
        }}
        validationSchema={isLogin ? loginSchema : registerSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            isLogin
              ? console.log("login", values)
              : console.log("register", values);
            setSubmitting(false);
            navigate("/");
            return;
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex w-full max-w-screen-sm flex-1 flex-col justify-center gap-y-2 text-white lg:p-8">
            <h1 className="mb-4 text-3xl font-semibold text-vDGCyan lg:text-4xl">
              {toggleText}
            </h1>
            {!isLogin && (
              <TextInput
                label="Name"
                name="name"
                type="text"
                placeholder="Your name"
              />
            )}
            <TextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Your email"
            />
            <TextInput
              label="Password"
              name="password"
              type="password"
              placeholder="Your password"
            />

            {!isLogin && (
              <TextInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Your password again"
              />
            )}

            {!isLogin && (
              <CheckBox name="acceptedTerms">
                I accept the terms and conditions
              </CheckBox>
            )}

            <button
              className={`btn primary mt-2 text-white ${
                isSubmitting && "bg-gray-400"
              }`}
              disabled={isSubmitting}
              type="submit"
            >
              {btnText}
            </button>
            <p className="text-lg text-dGCyan">
              {toggleText}{" "}
              <button
                className="text-primary hover:underline"
                onClick={toggleForms}
              >
                {linkText}
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default AuthPage;
