import { useState } from "react";
import BookCard from "./BookCard";
import { useParams } from "react-router-dom";
import { useGetBooksByCatQuery } from "../store/apislice";
interface AllBooksInCatProps {
  handleChangeBook: () => void;
}
const AllBooksInCat = ({ handleChangeBook }: AllBooksInCatProps) => {
  const [page] = useState<number>(1);
  const { id } = useParams();
  const { data: dataBooks } = useGetBooksByCatQuery({
    pageCat: page,
    id: id,
  });
  return (
    <div className="grid gap-4 px-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {dataBooks?.payload.books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          handleChangeBook={handleChangeBook}
        />
      ))}{" "}
    </div>
  );
};

export default AllBooksInCat;
