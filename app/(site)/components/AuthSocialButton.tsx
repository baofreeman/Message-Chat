import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full justify-center rounded-md bg-bgTertiary px-4 py-3 text-gray shadow-sm ring-1 ring-inset ring-active hover:opacity-80 focus:outline-offset-0"
    >
      <Icon className="text-textPrimary" />
    </button>
  );
};

export default AuthSocialButton;
