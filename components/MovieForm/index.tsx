"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import UploadImageIcon from "../../assets/upload.svg";
import { updateMovie, createMovie, getMovies } from "../../services/movies";
import { useRouter, useSearchParams } from "next/navigation";
import { useMovieContext } from "../../context/MovieContext";
import { toast } from "react-toastify";
import Layout from "../Layout/index";
import Header from "../Header/index";
import Input from "../Input/index";
import Button from "../Button/index";
import { convertToBase64 } from "@/utils/index";

type Props = {
  isUpdate?: boolean;
};

function MovieForm({ isUpdate }: Props) {
  const { movieDetails, setMovieDetails } = useMovieContext();
  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [movieId, setMovieId] = useState<string | null>(null);
  const [titleError, setTitleError] = useState("");
  const [yearError, setYearError] = useState("");
  const [imageError, setImageError] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any>();
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const movies = await getMovies();
      const currentMovie = movies.movies?.find(
        (item: any) => item?._id === movieId
      );
      setMovieDetails(currentMovie);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
      router.push("/signin");
    }
  };
  useEffect(() => {
    if (movieId) {
      fetchMovies();
    }
  }, [movieId]);

  useEffect(() => {
    if (searchParams.get("id")) {
      setMovieId(searchParams.get("id"));
    }
  }, [searchParams]);

  useEffect(() => {
    if (movieDetails && searchParams.get("id")) {
      setTitle(movieDetails.title || "");
      setPublishingYear(movieDetails.publishingYear || "");
      setSelectedImage(movieDetails.bannerImage || null);
    }
  }, [movieDetails]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: any = event?.target?.files?.[0];
    setFile(file);
    if (file) {
      try {
        const base64Image = await convertToBase64(file);
        setSelectedImage(base64Image);
        setImageError("");
      } catch (error) {
        console.error("Error converting image to base64:", error);
        setImageError("Error converting image to base64");
      }
    }
  };

  const handleUpload = async () => {
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dtoyuugm1/image/upload";
    const CLOUDINARY_UPLOAD_PRESET = "zibnccul";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    return fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return data?.url;
      })
      .catch((err) => console.error(err));
  };

  const onSubmit = async () => {
    setLoading(true);
    setTitleError("");
    setYearError("");
    setImageError("");
    if (isUpdate) {
      try {
        if (title && publishingYear && selectedImage) {
          const image = await handleUpload();
          const movieData: any = {
            title,
            publishingYear,
            bannerImage: image,
            id: movieId,
          };
          await updateMovie({ ...movieData });
          router.replace("/movies");
          toast.success("Movie updated successfully!");
          setLoading(false);
        } else {
          setError("Please fill in all required fields.");
          onErrors();
          setLoading(false);
        }
      } catch (error) {
        setTitle("");
        setPublishingYear("");
        toast.error("Error updating movie. Please try again.");
      }
    } else {
      try {
        if (title && publishingYear && selectedImage) {
          const image = await handleUpload();
          const movieData: any = {
            title,
            publishingYear,
            bannerImage: image,
          };

          await createMovie(movieData);
          router.replace("/movies");
          toast.success("Movie created successfully!");
        } else {
          setError("Please fill in all required fields.");
          onErrors();
          setLoading(false);
        }
      } catch (error) {
        onReset();
        toast.error("Error creating movie. Please try again.");
        setLoading(false);
      }
    }
  };

  const onErrors = () => {
    if (!title) setTitleError("Please fill title.");
    if (!publishingYear) setYearError("Please fill publishing year.");
    if (!selectedImage) setImageError("Please upload an image.");
  };

  const onReset = () => {
    setTitle("");
    setPublishingYear("");
    setSelectedImage("");
  };
  const handleCancel = () => {
    onReset();
    setMovieDetails({});
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
        <div className="flex mt-[120px] mobileMax:flex-col mobileMax:mt-[80px]">
          <div
            className={`bg-input w-[473px] h-[504px] relative border-[2px] ${
              imageError ? "border-error" : "border-white "
            } border-dashed rounded-[10px] flex justify-center items-center mobileMax:w-[100%] mobileMax:order-1 mobileMax:mt-[24px]  mobileMax:h-[372px]`}
          >
            <input
              type="file"
              name=""
              id=""
              className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileUpload}
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
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError("");
              }}
              error={titleError?.length > 0}
            />
            <div className="w-[50%] mt-[24px]  mobileMax:w-[100%]">
              <Input
                placeholder="Publishing year"
                type="number"
                value={publishingYear}
                min={1900}
                max={2025}
                onChange={(e) => {
                  setPublishingYear(e.target.value);
                  setYearError("");
                }}
                error={yearError?.length > 0}
              />
            </div>
            <div className="mobileMax:hidden">
              {error && (
                <div className="mt-[8px] text-error md:text-[14px]">
                  <p>{error}</p>
                </div>
              )}
              <div className="flex justify-between mt-[64px] gap-[16px]">
                <Button
                  label="Cancel"
                  variant="secondary"
                  onClick={handleCancel}
                />
                <Button
                  label={isUpdate ? "Update" : "Submit"}
                  variant="primary"
                  onClick={onSubmit}
                  loading={loading}
                />
              </div>
            </div>
          </div>
          <div className="md:hidden mobileMax:order-2">
            {error && (
              <div className="mt-[8px] text-error md:text-[14px]">
                <p>{error}</p>
              </div>
            )}
            <div className="w-full">
              <div className="flex justify-between mt-[64px] gap-[16px]">
                <Button
                  label="Cancel"
                  variant="secondary"
                  onClick={handleCancel}
                />
                <Button
                  label={isUpdate ? "Update" : "Submit"}
                  variant="primary"
                  onClick={onSubmit}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MovieForm;
