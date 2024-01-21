import MovieForm from "@/components/MovieForm/index";
import { getMoviesById } from "@/app/lib/actions";

async function Update({ params }: { params: { id: string } }) {
  const movieDetails = await getMoviesById(params.id);
  return (
    <MovieForm isUpdate={true} defaultValues={movieDetails ?? undefined} />
  );
}

export default Update;
