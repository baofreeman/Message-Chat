"use client";

import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface IUserList {
  items: User[];
}

const UserList: React.FC<IUserList> = ({ items }) => {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-[400px] bg-bgSecondary lg:block overflow-y-auto border-r border-bgTertiary block w-full left-0">
      <div className="px-5">
        <div className="flex-col">
          <div className="text-base font-bold text-textPrimary py-4">
            People
          </div>
          {items.map((item) => (
            <UserBox key={item.id} data={item} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default UserList;
