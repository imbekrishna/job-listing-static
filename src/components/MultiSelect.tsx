import clsx from "clsx";
import { FieldProps } from "formik";
import Select, { Options } from "react-select";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends FieldProps {
  options: Options<Option>;
  isMulti?: boolean;
  placeholder?: string;
  label: string;
}

export const CustomMultiSelect = ({
  placeholder,
  field,
  form,
  options,
  label,
  isMulti = false,
}: CustomSelectProps) => {
  const onChange = (option: Option | Option[]) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value,
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-primary" htmlFor={field.name}>
        {label}
      </label>
      <Select
        name={field.name}
        value={getValue()}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        isMulti={isMulti}
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
      {form.touched[field.name] && form.errors[field.name] ? (
        <div className="text-red-500">
          {form.errors[field.name]?.toString()}
        </div>
      ) : null}
    </div>
  );
};

export default CustomMultiSelect;
