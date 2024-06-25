"use client";

import Avatar from "@/app/components/Avatar";
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
        body: JSON.stringify({ userId: data.id }),
      });
      const result = await res.json();
      router.push(`/conversations/${result?.id}`);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-light rounded-lg transition cursor-pointer"
    >
      <Avatar user={data} />
      <h1>{data.name}</h1>
    </div>
  );
};

export default UserBox;
