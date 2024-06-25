import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  register: UseFormRegister<FieldValues>;
  id: string;
  type?: string;
  name?: string;
  label?: string;
  errors: FieldErrors;
  disabled?: boolean;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  disabled,
  required,
  errors,
  label,
  name,
  register,
  type,
}) => {
  return (
    <div className={"mt-2"}>
      <label htmlFor={id} className="text-md">
        {label}
      </label>
      <input
        className={clsx(
          `form-input block text-md w-full rounded-md border-0 py-2 text-black shadow-sm ring-1 ring-inset ring-silver placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-primary sn:leading-6`,
          errors[id] && "focus:ring-error",
          disabled && "opacity-50 cursor-pointer"
        )}
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
      />
    </div>
  );
};

export default Input;
