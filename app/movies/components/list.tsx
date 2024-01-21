"use client";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import Input from "@/components/Input/index";
import NotFound from "@/app/movies/components/notFound";
import Link from "next/link";
import MovieCard from "@/components/MovieCard";
const ITEMS_PER_PAGE = 8;
function MovieList(props: { movies: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredMovies, setFilteredMovies] = useState(props.movies);

  const handleSearch = (queryString: string) => {
    const filtered = props.movies?.filter(
      (movie: any) =>
        movie.title.toLowerCase().includes(queryString.toLowerCase()) ||
        movie.publishingYear.toString().includes(queryString)
    );
    setFilteredMovies(filtered);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedMovies = filteredMovies?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="mt-[12px] pr-[30px] tabletMax:p-[18px] mobileMax:p-0">
        <Input
          type="text"
          id={"searchInput"}
          placeholder="Search by name or year"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {filteredMovies?.length > 0 ? (
        <div className="mt-[3rem] mb-[5rem]">
          <div className="w-full mx-[-12px] tabletMax:mx-[0] mobileMax:mx-[0px]">
            <div className="2xl:h-[1082px] w-full flex flex-wrap laptopMax:h-unset mobileMax:h-unset mobileMax:justify-between">
              {paginatedMovies?.map((movie, idx) => (
                <Link
                  href={`movies/${movie.id}/edit`}
                  key={idx}
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
                totalItems={filteredMovies?.length || 0}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="mt-[5rem] mb-[12rem] flex justify-center items-center">
          <NotFound message={"Movie Not Found"} />
        </div>
      )}
    </>
  );
}

export default MovieList;
