"use client";

import Modal from "@/app/components/Modal";
import Input from "@/app/components/input/Input";
import { Select } from "@headlessui/react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface GroupChatModalProp {
  isOpen?: boolean;
  users: User[];
  onClose: () => void;
}

const GroupChatModal: React.FC<GroupChatModalProp> = ({
  onClose,
  users,
  isOpen,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });
  const members = watch("members");
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      await fetch("/api/conversations", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          isGroup: true,
        }),
      });
      router.refresh();
      onClose();
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong!");
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray pb-12">
            <h2 className="font-semibold text-md leading-7 text-gray">
              Create a group chat
            </h2>
            <p className="text-sm mt-1 leading-6 text-silver">
              Create a group chat with more than 2 people
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                label="Name"
                id="name"
                register={register}
                errors={errors}
                disabled={isLoading}
              />
              <Select
                label="Members"
                disabled={isLoading}
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, { shouldValidate: true })
                }
                value={members}
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
