"use client";

import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import Select from "@/app/components/Select";
import Input from "@/app/components/input/Input";
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
          <div className="border-b border-bgTertiary pb-12">
            <h2 className="font-semibold text-md leading-7 text-textPrimary">
              Create a group chat
            </h2>
            <p className="text-sm mt-1 leading-6 text-textSecondary">
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
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button disabled={isLoading} secondary onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isLoading} secondary type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
