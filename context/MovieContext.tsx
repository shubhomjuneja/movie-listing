"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

type MovieContextProps = {
  movieDetails: any;
  setMovieDetails: React.Dispatch<React.SetStateAction<any>>;
};

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [movieDetails, setMovieDetails] = useState<any>(null);

  return (
    <MovieContext.Provider value={{ movieDetails, setMovieDetails }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }

  return context;
};
