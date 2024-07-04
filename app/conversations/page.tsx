"use client";

import EmptyState from "../components/EmptyState/EmptyState";
import useConversation from "../hooks/useConversation";
import clsx from "clsx";

const Home = () => {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx(
        "h-full lg:block lg:pl-[400px]",
        isOpen ? "block" : "hidden"
      )}
    >
      <EmptyState />
    </div>
  );
};

export default Home;
