import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  danger,
  disabled,
  fullWidth,
  onClick,
  secondary,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `flex justify-center rounded-md px-3 py-2 text-md font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
        disabled && "opacity-50 cursor-pointer",
        fullWidth && "w-full",
        secondary ? "text-gray" : "text-white",
        danger && "bg-error hover:bg-opacity-80 focus-visible:opacity-80",
        !secondary &&
          !danger &&
          "bg-silver hover:opacity-80 focus-visible:outline-silver"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
