import { useNavigate, useParams } from "react-router-dom";
import { useGetAllCatsQuery, useSearchBookQuery } from "../store/apislice";
import { ThreeDots } from "react-loader-spinner";
import { FaSearch } from "react-icons/fa";
import { GiWhiteBook } from "react-icons/gi";
import Searchbook from "../../assets/SearchBook.png";
import BookCard from "../layouts/BookCard";
import AsideAuthors from "../layouts/AsideAuthors";

const SearchBook = () => {
  const navigate = useNavigate();

  const {
    data: dataCats,
    isLoading: loadingCat,
    isError: isErrorGetAllCats,
  } = useGetAllCatsQuery();
  // const famousEnglishAuthors: string[] = [
  //   "Harper Lee",
  //   "George Orwell",
  //   "F. Scott Fitzgerald",
  //   "Jane Austen",
  //   "J.D. Salinger",
  // ];
  const { name } = useParams();
  const {
    data: dataBook,
    isLoading: loadingDataBook,
    isFetching,
    isError,
  } = useSearchBookQuery(name);
  console.log(dataBook);
  return (
    <div className=" container m-auto px-4 pt-[71px]">
      <h1 className=" text-teal-800 font-semibold text-[28px] mt-3">
        {loadingDataBook || isFetching ? (
          <div className=" flex items-center">
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
            {dataBook?.payload.books.length} results for{" "}
            <span className=" capitalize">{name}</span>
          </>
        )}
      </h1>
      <div className="flex gap-8 lg:gap-0 flex-col-reverse lg:flex-row py-8 items-start justify-between">
        <div className="flex flex-col gap-6 w-full lg:w-[28%] xl:w-[22%] ">
          <div className="  py-4 px-3 rounded-sm shadow-lg bg-white">
            <h1 className=" font-medium text-[18px] text-gray-900 flex items-center justify-between">
              Categories
              <span className=" text-[14px] text-teal-600">
                <FaSearch />
              </span>{" "}
            </h1>
            <ul className=" mt-2">
              {loadingCat ? (
                <li className=" flex items-center justify-center">
                  {" "}
                  <ThreeDots
                    visible={true}
                    height="60"
                    width="60"
                    color="#115e59"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </li>
              ) : (
                <>
                  {isErrorGetAllCats ? (
                    <>
                      {" "}
                      <li className="flex items-center justify-center text-center text-[#B10707] px-2 font-raleway font-bold text-[14px]  leading-5">
                        Server error, <br /> try again
                      </li>
                    </>
                  ) : (
                    <>
                      {" "}
                      {dataCats?.payload.categories.map((cat) => (
                        <li
                          onClick={() => navigate(`/category/${cat.id}`)}
                          key={cat.id}
                          className="hover:underline transition underline-offset-1 text-[18px] text-gray-900  flex items-center justify-between cursor-pointer my-1"
                        >
                          {cat.categoryName}
                          <span className=" text-[16px] text-teal-600">
                            <GiWhiteBook />
                          </span>
                        </li>
                      ))}
                    </>
                  )}
                </>
              )}
            </ul>
          </div>
          {/* <div className="  py-4 px-3 rounded-sm shadow-lg bg-white">
            <h1 className=" font-medium text-[18px] text-gray-900 flex items-center justify-between">
              Authors
              <span className=" text-[14px] text-teal-600">
                <FaSearch />
              </span>{" "}
            </h1>
            <ul className=" mt-2">
              {famousEnglishAuthors.map((name, i) => (
                <li
                  onClick={() => navigate(`/author/${i + 1}`)}
                  key={name}
                  className="hover:underline transition underline-offset-1 text-[18px] text-gray-900  flex items-center justify-between cursor-pointer my-1"
                >
                  {name}
                  <span className=" text-[16px] text-teal-600">
                    <GiWhiteBook />
                  </span>
                </li>
              ))}
            </ul>
          </div> */}
          <AsideAuthors />
        </div>
        <div className=" w-full  lg:w-[68%] xl:w-[75%]">
          <div className="bg-white mb-4   rounded-md">
            {" "}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const inputValue = (e.target as HTMLFormElement)
                  .elements[0] as HTMLInputElement;
                // handleClick();
                if (inputValue.value.trim() !== "") {
                  navigate(`/searchBook/${inputValue.value}`);
                }
              }}
              action=""
              className="rounded-md relative  w-full h-[40px]"
            >
              <input
                required
                className="rounded-md pl-2 w-full h-full"
                type="text"
                placeholder="Search"
              />
              <button
                className=" rounded-md flex right-[2px] top-[50%] translate-y-[-50%] h-[35px] w-[35px] text-teal-800 text-[18px] border-[1px] text-center items-center justify-center absolute"
                title="Submit"
                type="submit"
              >
                <FaSearch />
              </button>
            </form>
          </div>
          <div className="shadow-lg rounded-md bg-white py-3 flex items-center justify-evenly mb-8">
            <div className=" transition cursor-pointer font-medium text-[14px] text-gray-900 hover:text-teal-600  flex flex-col items-center justify-center gap-2">
              <div>
                <img src={Searchbook} alt="" className=" w-[60px]" />
              </div>
              <p
                className={` text-[18px] font-medium mt-[-10px] capitalize text-teal-600 transition`}
              >
                {name}
              </p>
            </div>
          </div>{" "}
          {loadingDataBook || isFetching ? (
            <div className=" flex items-center justify-center">
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
              {isError ? (
                <div className="  py-[80px] flex items-center justify-center text-center text-[#B10707] px-2 font-raleway font-bold text-[22px]  leading-5">
                  Server error, <br /> try again
                </div>
              ) : (
                <>
                  {" "}
                  {dataBook?.payload.books &&
                  dataBook?.payload.books.length < 1 ? (
                    <h1 className=" text-center font-semibold text-teal-700 text-[22px] mt-10">
                      No Books
                    </h1>
                  ) : (
                    <div className="grid gap-4 px-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                      {dataBook?.payload.books.map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>{" "}
      <div className="mb-4 bg-white py-2 px-2 border-b-[1px] h-[35px] border-teal-400 rounded-lg shadow-md rounded-t-none  flex items-center justify-start gap-1 text-teal-800"></div>
    </div>
  );
};

export default SearchBook;
