"use client";

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data?.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const [imageModalOpen, setImageModalOpen] = useState(false);

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-bgSender text-textPrimary" : "bg-bgSeen text-textPrimary",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-base font-semibold text-textUser">
            {data.sender.name}
          </div>
          {/* <div className="text-xs text-silver">
            {format(new Date(data.createdAt), "p")}
          </div> */}
        </div>
        <div className={message}>
          <ImageModal
            isOpen={imageModalOpen}
            src={data.image}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              onClick={() => setImageModalOpen(true)}
              src={data.image}
              alt=""
              width={288}
              height={288}
              className="object-cover cursor-pointer hover:scale-100 transition translate"
            />
          ) : (
            <div className="text-md text-textPrimary">{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-silver">{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
