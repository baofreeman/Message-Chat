import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) return onClick();
  };

  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 hover:text-black hover:bg-opacity-80`,
        active ? "text-black" : "text-silver"
      )}
    >
      <Icon className="h-8 w-8" />
    </Link>
  );
};

export default MobileItem;
