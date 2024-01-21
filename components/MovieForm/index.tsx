"use client";
import React, { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { updateMovie, createMovie, getMovies } from "@/services/movies";
import { useRouter, useSearchParams } from "next/navigation";
// import { useMovieContext } from "@/context/MovieContext";
// import { toast } from "react-toastify";
import Layout from "../Layout/index";
import Header from "../Header/index";
import Input from "../Input/index";
import Button from "../Button/index";
import { convertToBase64 } from "@/utils";
import UploadImageIcon from "../../assets/upload.svg";
import { handleCreateMovie } from "@/app/lib/actions";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { titleValidation, publishingYearValidation } from "./validation";

type Props = {
  isUpdate?: boolean;
  defaultValues?: {
    title: string;
    bannerImage: string;
    publishingYear: string;
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
};

const initialValues = {
  title: "",
  bannerImage: "",
  publishingYear: "",
};

function MovieForm({ isUpdate, defaultValues = initialValues }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    defaultValues.bannerImage
  );
  const router = useRouter();
  const [pending, startTransaction] = useTransition();
  const setImage = async (file: File) => {
    const base64Image = await convertToBase64(file);
    setSelectedImage(base64Image);
  };

  const handleCancel = () => {
    router.back();
  };

  const {
    register,
    formState: { errors },
    control,
  } = useForm<FieldValues>({
    defaultValues,
  });

  const formSubmitAction = async (x: any) => {
    await handleCreateMovie(x, selectedImage, defaultValues?.id);
    router.back();
  };

  return (
    <Layout>
      <div className="max-w-[1225px] m-auto pt-[80px] pb-[30px]">
        <Header
          title={isUpdate ? "Edit" : "Create a new movie"}
          isHidden={false}
          logoutVisible={false}
        />
        <form
          action={(formData) =>
            startTransaction(() => formSubmitAction(formData))
          }
          // onSubmit={handleSubmit((data) => onMyFormSubmit(data))}
        >
          <div className="flex mt-[120px] mobileMax:flex-col mobileMax:mt-[80px]">
            <div
              className={`bg-input w-[473px] h-[504px] relative border-[2px] ${
                errors["image"] ? "border-error" : "border-white "
              } border-dashed rounded-[10px] flex justify-center items-center mobileMax:w-[100%] mobileMax:order-1 mobileMax:mt-[24px]  mobileMax:h-[372px]`}
            >
              <Controller
                control={control}
                name={"bannerImage"}
                rules={{ required: "Banner image is required" }}
                render={({ field: { value, onChange, ...field } }) => {
                  return (
                    <input
                      {...field}
                      value={value?.fileName}
                      className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(event) => {
                        if (event?.target?.files?.length) {
                          setImage(event?.target?.files?.[0]);
                          onChange(event?.target?.files?.[0]);
                        }
                      }}
                      type="file"
                      id="bannerImage"
                    />
                  );
                }}
              />
              {selectedImage ? (
                <div className="flex flex-col justify-center items-center p-2 w-full h-full rounded-[10px]">
                  <img
                    src={selectedImage}
                    alt="selectedImage"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <Image src={UploadImageIcon} alt="UploadImageIcon" />
                  <p className="text-[14px] text-white font-[400] mt-[8px]">
                    Upload an image here
                  </p>
                </div>
              )}
            </div>
            <div className="ml-[8rem] max-w-[362px] w-full mobileMax:ml-[0px] mobileMax:order-0 mobileMax:max-w-full">
              <Input
                placeholder="Title"
                id={"title"}
                type="text"
                // value={title}
                register={register}
                validation={titleValidation}
                errors={errors}
              />
              <div className="w-[50%] mt-[24px]  mobileMax:w-[100%]">
                <Input
                  placeholder="Publishing year"
                  type="string"
                  id={"publishingYear"}
                  maxLength={4}
                  pattern="\d*"
                  register={register}
                  validation={publishingYearValidation}
                  errors={errors}
                />
              </div>
              <div className="mobileMax:hidden">
                <div className="flex justify-between mt-[64px] gap-[16px]">
                  <Button
                    label="Cancel"
                    variant="secondary"
                    type={"reset"}
                    onClick={handleCancel}
                  />
                  <Button
                    label={isUpdate ? "Update" : "Submit"}
                    variant="primary"
                    // onClick={onSubmit}
                    loading={pending}
                  />
                </div>
              </div>
            </div>
            <div className="md:hidden mobileMax:order-2">
              <div className="w-full">
                <div className="flex justify-between mt-[64px] gap-[16px]">
                  <Button
                    label="Cancel"
                    type={"reset"}
                    variant="secondary"
                    onClick={handleCancel}
                  />
                  <Button
                    label={isUpdate ? "Update" : "Submit"}
                    variant="primary"
                    loading={pending}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default MovieForm;
