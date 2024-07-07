"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";
import SettingModal from "./SettingModal";
import { useState } from "react";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
interface MobileFooterProps {
  currentUser: User;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const routes = useRoutes();
  const { isOpen } = useConversation();
  if (isOpen) return null;
  return (
    <>
      <SettingModal
        isOpen={isOpenModal}
        currentUser={currentUser}
        onClose={() => setIsOpenModal(false)}
      />
      <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-bgPrimary border-t-[1px] border-silver lg:hidden ">
        <div
          onClick={() => setIsOpenModal(true)}
          className="cursor-pointer hover:opacity-75 transition ml-6 p-4"
        >
          <Avatar user={currentUser} />
        </div>
        {routes.map((item) => (
          <MobileItem
            key={item.label}
            label={item.label}
            href={item.href}
            active={item.active}
            icon={item.icon}
            onClick={item.onClick}
          />
        ))}
      </div>
    </>
  );
};

export default MobileFooter;
