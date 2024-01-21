import Link from "next/link";
import Button from "@/components/Button";

function NotFound({ message = "Your movie list is empty" }) {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex justify-center items-center">
        <h1 className="text-[32px] text-white font-[600] md:text-[48px] text-center">
          {message}
        </h1>
      </div>
      <Link href="/movies/create">
        <div className="w-[202px] mt-[40px]">
          <Button label="Add a new movie" variant="primary" />
        </div>
      </Link>
    </div>
  );
}

export default NotFound;
