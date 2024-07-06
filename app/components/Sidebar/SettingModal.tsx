"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../input/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";
import { useTheme } from "next-themes";

interface SettingModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingModal: React.FC<SettingModalProps> = ({
  isOpen,
  onClose,
  currentUser,
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
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });
  const image = watch("image");
  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const { theme, setTheme } = useTheme();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      await fetch("/api/settings", {
        method: "POST",
        body: JSON.stringify(data),
      });
      router.refresh();
      onClose();
      setIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-bgTertiary pb-12">
            <h2 className="text-md font-semibold leading-7 text-textPrimary">
              Profile
            </h2>
            <p className="text-sm text-textSecondary font-light">
              Edit your public information
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label className="block text-md font-medium leading-6 text-textPrimary">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width={48}
                    height={48}
                    className="rounded-full"
                    src={
                      image || currentUser?.image || "/images/placeholder.jpg"
                    }
                    alt="Avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="glusl1sb"
                  >
                    <Button disabled={isLoading} secondary type="button">
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <h2 className="text-md font-semibold leading-7 text-textPrimary">
                  Theme
                </h2>
                <div className="flex gap-2 flex-wrap">
                  <Button secondary onClick={() => setTheme("light")}>
                    Light
                  </Button>
                  <Button secondary onClick={() => setTheme("dark")}>
                    Dark
                  </Button>
                  <Button secondary onClick={() => setTheme("pink")}>
                    Pink
                  </Button>
                  <Button secondary onClick={() => setTheme("sky")}>
                    Sky
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button disabled={isLoading} danger onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} secondary type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingModal;
