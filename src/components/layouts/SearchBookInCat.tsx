import { useParams } from "react-router-dom";
import { useSearchBookInCatMutation } from "../store/apislice";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { ThreeDots } from "react-loader-spinner";
import { BookResponseBooksInCatByName } from "../../types/types.model";

const SearchBookInCat = () => {
  const [books, setBooks] = useState<BookResponseBooksInCatByName | void>();
  const { name, id } = useParams();
  console.log(name, id);

  const [searchBookInCat, { isLoading, error }] = useSearchBookInCatMutation();
  // console.log(dataBooks, error);
  useEffect(() => {
    setBooks();
    const body = {
      categoryId: id,
      title: name,
    };
    searchBookInCat(body)
      .unwrap()
      .then((fulfilled) => {
        setBooks(fulfilled);
      })
      .catch((rejected) => {
        console.error(rejected);
      });
  }, [name, id]);
  return (
    <div className="grid gap-4 px-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {isLoading ? (
        <div className=" flex items-center justify-center col-span-2 md:col-span-3 xl:col-span-4">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#115e59"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {error?.status == 500 ? (
            <div className="col-span-2 md:col-span-3 xl:col-span-4 py-[180px] flex items-center justify-center text-center text-[#B10707] px-2 font-raleway font-bold text-[24px]  leading-5">
              Server error, <br /> try again
            </div>
          ) : (
            <>
              {books?.payload.books.length == 0 ? (
                <p className=" text-center text-[18px] font-medium text-custom-teal col-span-2 md:col-span-3 xl:col-span-4">
                  Not books founded
                </p>
              ) : (
                <>
                  {books?.payload.books?.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchBookInCat;
