import { useState } from "react";
import BookCard from "./BookCard";
import { useParams } from "react-router-dom";
import { useGetBooksByCatQuery } from "../store/apislice";
import { ThreeDots } from "react-loader-spinner";

const AllBooksInCat = () => {
  const [page] = useState<number>(1);
  const { id } = useParams();
  const {
    data: dataBooks,
    isFetching,
    isLoading,
    error,
  } = useGetBooksByCatQuery({
    pageCat: page,
    id: id,
  });
  console.log(error);
  return (
    <div className="grid gap-4 px-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {isFetching || isLoading ? (
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
              {" "}
              {dataBooks?.payload.books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AllBooksInCat;
