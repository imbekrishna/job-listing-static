import { FieldHookConfig, useField } from "formik";
import { ClassAttributes, InputHTMLAttributes, ReactNode } from "react";

export interface OtherProps {
  children?: ReactNode;
  label: string;
}

export const TextInput = ({
  label,
  ...props
}: OtherProps &
  InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-1">
      <label className="text-lg text-primary" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className="rounded-sm p-2 indent-2 text-lg text-vDGCyan"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const TextArea = ({
  label,
  ...props
}: OtherProps &
  InputHTMLAttributes<HTMLTextAreaElement> &
  ClassAttributes<HTMLTextAreaElement> &
  FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-1">
      <label className="text-lg text-primary" htmlFor={props.id || props.name}>
        {label}
      </label>
      <textarea
        className="rounded-sm p-2 indent-2 text-lg text-vDGCyan"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const CheckBox = ({
  children,
  ...props
}: InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string>) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });

  return (
    <div className="my-3">
      <label className="text-lg text-primary">
        <input
          className="mr-2 accent-primary"
          type="checkbox"
          {...field}
          {...props}
        />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="text-red-400">{meta.error}</div>
      ) : null}
    </div>
  );
};
