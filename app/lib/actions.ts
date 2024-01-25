"use server";

import prisma from "./prismaDb";
import { revalidatePath } from "next/cache";
import { isHttpOrHttpsUrl } from "@/utils";
import {redirect} from "next/navigation";



export async function handleCreateMovie(
  form: any,
  id?: string
) {
  const bannerImage = form.bannerImage;
  const title = form.title;
  const publishingYear = form.publishingYear;
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
  redirect("/movies");
  // return { success: true };
}

export async function getMovies() {
  return prisma.movies.findMany({});
}

export async function getMoviesById(id: string) {
  return prisma.movies.findUnique({ where: { id } });
}
