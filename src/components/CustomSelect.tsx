import Select from "react-select";
import { useField } from "formik";
import clsx from "clsx";

type Props = {
  selectOptions: object;
  formikFieldName: string;
  placeholder?: string;
  label: string;
};

/**
 * React Select but hooked into Formik
 * @returns {JSX.Element}
 * @constructor
 */
const FormikSelect = ({
  selectOptions,
  formikFieldName,
  placeholder,
  label,
}: Props) => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(formikFieldName);
  const { setValue } = helpers;
  const options = Object.entries(selectOptions).map(([key, val]) => ({
    value: key,
    label: val,
  }));

  return (
    <div className="flex flex-col gap-1">
      <label className="text-primary" htmlFor={formikFieldName}>
        {label}
      </label>

      <Select
        defaultValue={options.find((option) => option.value === field.value)}
        options={options}
        placeholder={placeholder}
        onBlur={field.onBlur}
        onChange={(option) => setValue(option?.value)}
        unstyled
        classNames={{
          clearIndicator: ({ isFocused }) =>
            clsx(
              isFocused ? "text-neutral-600" : "text-neutral-200",
              "p-2",
              isFocused ? "hover:text-neutral-800" : "hover:text-neutral-400",
            ),
          // container: () => clsx(),
          control: ({ isDisabled, isFocused }) =>
            clsx(
              isDisabled ? "bg-neutral-50" : "bg-white",
              isDisabled
                ? "border-neutral-100"
                : isFocused
                  ? "border-primary"
                  : "border-neutral-200",
              "rounded",
              "border-solid",
              "border",
              isFocused ? "hover:border-primary" : "hover:border-neutral-300",
            ),
          dropdownIndicator: ({ isFocused }) =>
            clsx(
              isFocused ? "text-neutral-600" : "text-neutral-300",
              "p-2",
              isFocused ? "hover:text-neutral-800" : "hover:text-neutral-400",
            ),
          group: () => clsx("py-2"),
          groupHeading: () =>
            clsx(
              "text-neutral-400",
              "text-xs",
              "font-medium",
              "mb-1",
              "px-3",
              "uppercase",
            ),
          // indicatorsContainer: () => clsx(),
          indicatorSeparator: ({ isDisabled }) =>
            clsx(isDisabled ? "bg-neutral-100" : "bg-neutral-200", "my-2"),
          input: () => clsx("m-0.5", "py-0.5", "text-neutral-800"),
          loadingIndicator: ({ isFocused }) =>
            clsx(isFocused ? "text-neutral-600" : "text-neutral-200", "p-2"),
          loadingMessage: () => clsx("text-neutral-400", "py-2", "px-3"),
          menu: () =>
            clsx(
              "bg-white",
              "rounded",
              "shadow-[0_0_0_1px_rgba(0,0,0,0.1)]",
              "my-1",
            ),
          menuList: () => clsx("py-1"),
          // menuPortal: () => clsx(),
          multiValue: () => clsx("bg-neutral-100", "rounded-sm", "m-0.5"),
          multiValueLabel: () =>
            clsx(
              "rounded-sm",
              "text-neutral-800",
              "text-sm",
              "p-[3]",
              "pl-[6]",
            ),
          multiValueRemove: ({ isFocused }) =>
            clsx(
              "rounded-sm",
              isFocused && "bg-red-500",
              "px-1",
              "hover:bg-red-500",
              "hover:text-red-800",
            ),
          noOptionsMessage: () => clsx("text-neutral-400", "py-2", "px-3"),
          option: ({ isDisabled, isFocused, isSelected }) =>
            clsx(
              isSelected
                ? "bg-primary"
                : isFocused
                  ? "bg-background text-gray-400"
                  : "bg-transparent text-gray-600",
              isDisabled
                ? "text-neutral-200"
                : isSelected
                  ? "text-white"
                  : "text-inherit",
              "py-2",
              "px-3",
              !isDisabled &&
                (isSelected
                  ? "active:bg-primary active:text-white"
                  : "active:bg-primary active:text-white"),
            ),
          placeholder: () => clsx("text-neutral-500", "mx-0.5"),
          singleValue: ({ isDisabled }) =>
            clsx(isDisabled ? "text-neutral-400" : "text-vDGCyan", "mx-0.5"),
          valueContainer: () => clsx("py-0.5", "px-2"),
        }}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

FormikSelect.defaultProps = {
  placeholder: "",
};

export default FormikSelect;
