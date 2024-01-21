import { Suspense } from "react";
import { getMovies } from "@/app/lib/actions";
import Layout from "@/components/Layout/index";
import Header from "@/components/Header/index";
import Loader from "@/components/Loader/index";
import NotFound from "@/app/movies/components/notFound";
import List from "@/app/movies/components/list";
type Props = {};

async function Movies({}: Props) {
  const moviesList = await getMovies();

  return (
    <Layout>
      {moviesList?.length > 0 ? (
        <div className="max-w-[1225px] m-auto md:pt-[120px] pt-[80px]">
          <Header
            title="My Movies"
            isHidden={moviesList?.length <= 0}
            logoutVisible={true}
          />
          <List movies={moviesList} />
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        </div>
      )}
    </Layout>
  );
}

export default Movies;
