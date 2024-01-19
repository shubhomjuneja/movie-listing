import axiosInstance from ".";

interface CreateMovieRequest {
  title: string;
  publishingYear: string;
  bannerImage: string;
}

interface Movie {
  id: string;
  title: string;
  publishingYear: string;
  bannerImage: string;
}

interface UpdateMovieRequest {
    id: string;
    title: string;
    publishingYear: string;
    bannerImage: string;
  }

export async function createMovie({
  title,
  publishingYear,
  bannerImage,
}: CreateMovieRequest) {
  try {
    const response = await axiosInstance.post("/movie", {
      title,
      publishingYear,
      bannerImage,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
}

export async function getMovies() {
  try {
    const response = await axiosInstance.get("/movie");
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
}

export async function updateMovie({
    id,
    title,
    publishingYear,
    bannerImage,
  }: UpdateMovieRequest) {
    try {
      const response = await axiosInstance.patch(`/movie`, {
        title,
        publishingYear,
        bannerImage,
        id
      });
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  }
  