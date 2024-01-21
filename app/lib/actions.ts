"use server";

import prisma from "./prismaDb";
import { revalidatePath } from "next/cache";
import { isHttpOrHttpsUrl } from "@/utils";

export async function handleCreateMovie(
  form: FormData,
  selectedImage: string | null,
  id?: string
) {
  let bannerImage = selectedImage;
  const file = form.get("bannerImage");
  if (!isHttpOrHttpsUrl(selectedImage) && file) {
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dtoyuugm1/image/upload";
    const CLOUDINARY_UPLOAD_PRESET = "zibnccul";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    bannerImage = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return data?.url;
      })
      .catch((err) => console.error(err));
  }

  const title = form.get("title") as string;
  const publishingYear = form.get("publishingYear") as string;
  if (title && publishingYear && bannerImage) {
    const data = {
      title,
      publishingYear,
      bannerImage,
    };
    if (id) {
      await prisma.movies.update({ data, where: { id } });
    } else {
      await prisma.movies.create({
        data,
      });
    }
  }

  revalidatePath("/");
  return { success: true };
}

export async function getMovies() {
  return prisma.movies.findMany({});
}

export async function getMoviesById(id: string) {
  return prisma.movies.findUnique({ where: { id } });
}
