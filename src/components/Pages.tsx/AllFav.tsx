import BookCard from "../layouts/BookCard";
import { useGetAllFavsQuery } from "../store/apislice";
interface AllFavProps {
  handleChangeBook: () => void;
}
const AllFav = ({ handleChangeBook }: AllFavProps) => {
  const { data: dataBooks, isLoading: loadingAllFav } = useGetAllFavsQuery();
  console.log(loadingAllFav);
  return (
    <div className="grid mt-4 gap-4  grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {dataBooks?.payload.books.map((book) => (
        <BookCard
          handleChangeBook={handleChangeBook}
          key={book.bookId}
          book={book.book}
        />
      ))}
    </div>
  );
};

export default AllFav;
