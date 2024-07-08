"use client";

import ClipLoader from "react-spinners/ClipLoader";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import getMessages from "@/app/actions/getMessage";
import { FullMessageType } from "@/app/types";
import MessageBox from "./MessageBox";

let page = 0;

const LoadMore = ({ conversationId }: { conversationId: string }) => {
  const { ref, inView } = useInView();
  const [messages, setMessages] = useState<FullMessageType[]>([]);

  const fetchData = async () => {
    const result = await getMessages(conversationId, page);
    setMessages((currentMessages) => [...result, ...currentMessages]);
    page--;
  };

  useEffect(() => {
    if (inView) {
      fetchData();
      console.log("view");
    }
  }, [inView]);
  console.log("messages", messages);
  return (
    <>
      <div ref={ref} className="m-auto text-center">
        <ClipLoader size={35} color="#0284c7" />
      </div>
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          data={message}
          isLast={i === messages.length - 1}
        />
      ))}
    </>
  );
};

export default LoadMore;
