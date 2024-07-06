"use client";

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface IUserBox {
  data: User;
}

const UserBox: React.FC<IUserBox> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        body: JSON.stringify({ userId: data?.id }),
      });
      const result = await res.json();
      router.push(`/conversations/${result?.id}`);
    } catch (error) {
      return error;
    }
  }, []);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="w-full relative flex items-center space-x-3 bg-bgSecondary p-3 hover:bg-bgTertiary rounded-lg transition cursor-pointer my-2"
      >
        <Avatar user={data} />
        <h1 className="text-md text-textPrimary font-semibold">{data.name}</h1>
      </div>
    </>
  );
};

export default UserBox;
