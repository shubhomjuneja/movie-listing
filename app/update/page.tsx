import MovieForm from "@/components/MovieForm/index";
import PrivateRoute from "@/components/ProtectedRoute/index";
import React from "react";

type Props = {};

function Update({}: Props) {
  return (
    <PrivateRoute>
      <MovieForm isUpdate={true} />
    </PrivateRoute>
  );
}

export default Update;
