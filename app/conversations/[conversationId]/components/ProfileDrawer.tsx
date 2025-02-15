"use client";

import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import ConfirmModal from "@/app/components/ConfirmModal";
import Modal from "@/app/components/Modal";
import useActiveList from "@/app/hooks/useActiveList";
import useOtherUser from "@/app/hooks/useOtherUser";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";

interface ProfileDrawerProps {
  data: Conversation & { users: User[] };
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const otherUser = useOtherUser(data);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);
  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (data.isGroup) return `${data.users.length} members`;
    return isActive ? "Online" : "Offline";
  }, [data, isActive]);

  return (
    <>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Dialog open={isOpen} className={"relative z-50"} onClose={onClose}>
        <DialogBackdrop className="fixed inset-0 bg-bgPrimary opacity-90" />
        <div className="flex min-h-full fixed w-screen items-center justify-center right-0 top-0 p-4">
          <DialogPanel
            transition
            className={
              "w-full h-full max-w-md bg-bgModal absolute right-0 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            }
          >
            <div className="flex h-full flex-col overflow-y-scroll bg-bgModal py-6 shadow-xl">
              <div className="px-4 sm:px-6">
                <div className="flex items-start justify-end">
                  <div className="flex ml-3 h-7 items-center">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md bg-bgSecondary text-textSecondary hover:text-textPrimary focus:outline-none focus:ring-2 focus:ring-bgTertiary focus:ring-offset-2"
                    >
                      <span className="sr-only">Close panel</span>
                      <IoClose size={24} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="relative mt-6 flex-1 px-4 sm:px-6">
                <div className="flex flex-col items-center">
                  <div className="mb-2">
                    {data.isGroup ? (
                      <AvatarGroup users={data.users} />
                    ) : (
                      <Avatar user={otherUser} />
                    )}
                  </div>
                  <div className="text-textPrimary text-md">{title}</div>
                  <div className="text-sm text-textSecondary">{statusText}</div>
                  <div
                    className="flex gap-10 my-8"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <div className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-80">
                      <div className="w-10 h-10 bg-bgSecondary rounded-full flex items-center justify-center">
                        <IoTrash size={20} className="text-textSecondary" />
                      </div>
                      <div className="text-sm font-light text-error">
                        Delete
                      </div>
                    </div>
                  </div>
                  <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                    <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                      {data.isGroup && (
                        <div>
                          <dt className="text-sm font-medium text-textPrimary sm:w-40 sm:flex-shrink-0">
                            Email
                          </dt>
                          <dd className="mt-1 text-sm text-textPrimary sm:col-span-2">
                            {data.users.map((user) => user.email).join(", ")}
                          </dd>
                        </div>
                      )}
                      {!data.isGroup && (
                        <div>
                          <dt className="text-sm font-medium text-textPrimary sm:w-40 sm:flex-shrink-0">
                            Email
                          </dt>
                          <dd className="mt-1 text-sm text-textPrimary sm:col-span-2">
                            {otherUser.email}
                          </dd>
                        </div>
                      )}
                      {!data.isGroup && (
                        <>
                          <hr className="text-textSecondary" />
                          <div>
                            <dt className="text-sm font-medium text-textPrimary sm:w-40 sm:flex-shrink-0">
                              Joined
                            </dt>
                            <dd className="mt-1 text-sm text-textPrimary sm:col-span-2">
                              <time dateTime={joinedDate}>{joinedDate}</time>
                            </dd>
                          </div>
                        </>
                      )}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ProfileDrawer;
