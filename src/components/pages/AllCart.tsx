import { useGetAllcrtsQuery } from "../store/apislice";
import { ThreeDots } from "react-loader-spinner";
import BookCard from "../layouts/BookCard";
const AllCart = () => {
  const {
    data: dataBooks,
    isLoading: loadingAllFav,
    error,
  } = useGetAllcrtsQuery();
  return (
    <div className="grid min-h-[100vh] container mx-auto pt-[85px] px-2 gap-4  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {loadingAllFav ? (
        <div className="col-span-2   mx-auto pt-[85px] px-2 md:col-span-3 lg:col-span-4 xl:col-span-5">
          {" "}
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
          {error?.status == 403 ? (
            <p className="col-span-2   md:col-span-3 lg:col-span-4 xl:col-span-5 w-[80vw] m-auto lg:w-[65vw] py-[180px] flex items-center justify-center text-[20px] font-bold text-[#B10707]">
              You should login first!
            </p>
          ) : (
            <>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              {error?.status == 500 ? (
                <div className="col-span-2   md:col-span-3 lg:col-span-4 xl:col-span-5 w-[80vw] m-auto lg:w-[65vw] py-[180px] flex items-center justify-center text-[20px] font-bold text-[#B10707]">
                  Server error, <br /> try again
                </div>
              ) : (
                <>
                  {dataBooks?.payload.books.length == 0 && (
                    <div className="col-span-2   md:col-span-3 lg:col-span-4 xl:col-span-5 w-[80vw] m-auto lg:w-[65vw] py-[35vh] flex items-center justify-center text-[20px] font-bold text-teal-700">
                      {" "}
                      I'm Empty
                    </div>
                  )}
                  {dataBooks?.payload.books.map((book) => (
                    <BookCard key={book.bookId} book={book.book} />
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}
      <div className="mb-4 col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 bg-white py-2 px-2 border-b-[1px] h-[35px] border-teal-400 rounded-lg shadow-md rounded-t-none  flex items-center justify-start gap-1 text-teal-800"></div>
    </div>
  );
};

export default AllCart;
