"use client";

import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const handleUpload = async (result: any) => {
    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ image: result?.info?.secure_url, conversationId }),
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setValue("message", "", { shouldValidate: true });

      const newData = {
        ...data,
        conversationId,
      };

      await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify(newData),
      });
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="p-6 sm:p-4 bg-white border-t flex items-center gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="rncfa6vu"
      >
        <HiPhoto
          size={30}
          className="text-silver cursor-pointer hover:opacity-80"
        />
      </CldUploadButton>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-primary cursor-pointer hover:bg-opacity-80 transition"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
