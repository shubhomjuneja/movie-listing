"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getMovies } from "../../services/movies";
import { useMovieContext } from "../../context/MovieContext";
import PrivateRoute from "@/components/ProtectedRoute/index";
import Layout from "@/components/Layout/index";
import Header from "@/components/Header/index";
import Input from "@/components/Input/index";
import MovieCard from "@/components/MovieCard/index";
import Pagination from "@/components/Pagination/index";
import Button from "@/components/Button/index";
import Loader from "@/components/Loader/index";
import { useRouter } from "next/navigation";
type Props = {};

const ITEMS_PER_PAGE = 8;

function Movies({}: Props) {
  const router = useRouter();
  const { setMovieDetails } = useMovieContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchMovies = async () => {
      try {
        const movies = await getMovies();
        setMoviesList(movies?.movies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
        router.push("/signin");
      }
    };

    fetchMovies();
  }, [router]);

  useEffect(() => {
    const filtered = moviesList.filter(
      (movie: any) =>
        movie.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        movie.publishingYear.toString().includes(searchInput)
    );
    setFilteredMovies(filtered);
  }, [moviesList, searchInput]);

  const totalMovies = moviesList.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedMovies = filteredMovies?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const handleMovieClick = (movie: any) => {
    setMovieDetails(movie);
  };

  return (
    <PrivateRoute>
      <Layout>
        {moviesList?.length > 0 ? (
          <div className="max-w-[1225px] m-auto md:pt-[120px] pt-[80px]">
            <Header
              title="My Movies"
              isHidden={moviesList?.length > 0 ? false : true}
              logoutVisible={true}
            />
            <div className="mt-[12px] pr-[30px] tabletMax:p-[18px] mobileMax:p-0">
              <Input
                type="text"
                placeholder="Search by name or year"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            {filteredMovies?.length > 0 ? (
              <div className="mt-[5rem] mb-[5rem]">
                <div className="w-full mx-[-12px] tabletMax:mx-[0] mobileMax:mx-[0px]">
                  <div className="2xl:h-[1082px] w-full flex flex-wrap laptopMax:h-unset mobileMax:h-unset mobileMax:justify-between">
                    {paginatedMovies.map((movie: any, index) => (
                      <Link
                        href={`/update?id=${movie._id}`}
                        key={index}
                        onClick={() => handleMovieClick(movie)}
                        className="mobileMax:w-[48%] tabletMax:w-[33%] laptopMax:w-[33%] laptopMax:px-2 laptopMax:pb-4 mobileMax:m-0 mobileMax:flex mobileMax:justify-center mobileMax:items-center tabletMax:flex tabletMax:justify-center tabletMax:items-center"
                      >
                        <MovieCard
                          banner={movie?.bannerImage}
                          title={movie?.title}
                          year={movie?.publishingYear}
                        />
                      </Link>
                    ))}
                  </div>
                  {filteredMovies?.length > ITEMS_PER_PAGE && (
                    <Pagination
                      totalItems={totalMovies}
                      itemsPerPage={ITEMS_PER_PAGE}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-[5rem] mb-[12rem] flex justify-center items-center">
                <div className="flex justify-center items-center flex-col">
                  <div className="flex justify-center items-center">
                    <h1 className="text-[32px] text-white font-[600] md:text-[48px] text-center">
                      Movie Not Found
                    </h1>
                  </div>
                  <Link href="/create">
                    <div className="w-[202px] mt-[40px]">
                      <Button label="Add a new movie" variant="primary" />
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-screen flex justify-center items-center">
            {loading ? (
              <Loader />
            ) : (
              <div className="flex justify-center items-center flex-col">
                <div className="flex justify-center items-center">
                  <h1 className="text-[32px] text-white font-[600] md:text-[48px] text-center">
                    Your movie list is empty
                  </h1>
                </div>
                <Link href="/create">
                  <div className="w-[202px] mt-[40px]">
                    <Button label="Add a new movie" variant="primary" />
                  </div>
                </Link>
              </div>
            )}
          </div>
        )}
      </Layout>
    </PrivateRoute>
  );
}

export default Movies;
