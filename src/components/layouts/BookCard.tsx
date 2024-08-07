import { useEffect, useState } from "react";
import {
  GetAuthorByIdBook,
  RecentlyAndMostBook,
  SearchBook,
  getAllFavsBook,
} from "../../types/types.model";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
interface BookCardProps {
  book: RecentlyAndMostBook | SearchBook | GetAuthorByIdBook | getAllFavsBook;
  // handleChangeBook: () => void;
}
const BookCard = ({ book }: BookCardProps) => {
  useEffect(() => {
    window.addEventListener("scroll", () => {});

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const navigate = useNavigate();

  const [value] = useState<number | null>(2);
  return (
    <div
      onClick={() => (navigate(`/book/${book.id}`), scrollToTop())}
      className=" px-1 cursor-pointer gap-1 py-2 flex flex-col items-center justify-between bg-white shadow-sm hover:shadow-lg hover:scale-[1.04] hover:border-[1px] hover:border-teal-200  transition border-2 rounded-md"
    >
      <div>
        <Rating name="read-only" value={value} readOnly />
      </div>
      <div>
        <img src={book.coverUrl} alt="" className=" w-[80%] m-auto" />
      </div>
      <h3 className=" mt-1 text-center leading-4 text-gray-900 font-semibold capitalize">
        {book.title}
      </h3>
      <h5 className="text-teal-600 font-medium text-[14px] capitalize">
        {" "}
        {book?.author.authorName}
      </h5>
    </div>
  );
};

export default BookCard;
