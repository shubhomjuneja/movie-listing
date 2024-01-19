import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import Movies, { IMovies } from "../../../model/Movies";
import jwt from "jsonwebtoken";

const secretKey = "JWT-SCERET";

// Middleware function to validate JWT token
const authenticateToken = (request: NextRequest) => {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new Error("Unauthorized: Token missing");
  }

  try {
    jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Unauthorized: Invalid token");
  }
};

export async function POST(request: NextRequest) {
  try {
    authenticateToken(request);

    await connectDB();
    const newMovieDetails: IMovies = await request.json();
    const newMovie = await Movies.create(newMovieDetails);

    return new NextResponse(
      JSON.stringify({
        message: "Movie created successfully",
        movie: newMovie,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error:any) {
    console.error("Error creating user:", error);
    return new NextResponse(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    authenticateToken(request);

    await connectDB();
    const moviesList: IMovies[] = await Movies.find();

    return new NextResponse(
      JSON.stringify({
        message: "Movies retrieved successfully",
        movies: moviesList,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error:any) {
    console.error("Error retrieving movies:", error);
    return new NextResponse(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function PATCH(request: any) {
  try {
    authenticateToken(request);

    await connectDB();

    const { id, ...rest }: IMovies = await request.json();
    console.debug({ id });

    const updatedMovie = await Movies.findByIdAndUpdate(id, rest, {
      new: true,
    });

    if (!updatedMovie) {
      return new NextResponse(
        JSON.stringify({ error: "Movie not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Movie updated successfully",
        movie: updatedMovie,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error:any) {
    console.error("Error updating movie:", error);
    return new NextResponse(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
