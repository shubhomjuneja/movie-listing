
import MovieForm from "@/components/MovieForm/index"
import PrivateRoute from "@/components/ProtectedRoute/index"

type Props = {}

function Create({}: Props) {
  return (
    <PrivateRoute>
      <MovieForm />
    </PrivateRoute>
  )
}

export default Create