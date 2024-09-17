import BookCard from "../layouts/BookCard";
import { GiWhiteBook } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllCatsQuery, useGetAuthorBuIdQuery } from "../store/apislice";
import { ThreeDots } from "react-loader-spinner";
import bookAuth from "../../assets/bookAuthor.svg";
import AsideAuthors from "../layouts/AsideAuthors";

const AuthorPage = () => {
  const { id } = useParams();
  const {
    data: dataAuthor,
    isLoading: loadingDataAuthor,
    isFetching,
    error,
  } = useGetAuthorBuIdQuery(id);
  const { data: dataCats } = useGetAllCatsQuery();

  const navigate = useNavigate();
  function formatDate(dateString: string | undefined): string {
    if (dateString) {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "2-digit",
      };
      return date.toLocaleDateString("en-US", options);
    }
    return "Undefined";
  }
  // const famousEnglishAuthors: string[] = [
  //   "Harper Lee",
  //   "George Orwell",
  //   "F. Scott Fitzgerald",
  //   "Jane Austen",
  //   "J.D. Salinger",
  // ];
  // console.log(error);
  return (
    <div className=" container m-auto px-4 pt-[71px]">
      <h1 className=" font-semibold text-[18px] bg-white flex-wrap py-2 px-2 border-t-[1px] border-teal-400 rounded-lg shadow-md rounded-b-none  flex items-center justify-start gap-1 text-teal-800  mt-5">
        {loadingDataAuthor || isFetching ? (
          <div className=" flex items-center justify-center">
            {" "}
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              color="#115e59"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <>{dataAuthor?.payload.author.authorName}</>
        )}
      </h1>
      <div className="flex mt-[-20px] gap-8 lg:gap-0 flex-col-reverse lg:flex-row py-8 items-start justify-between">
        <div className="flex  relative h-full flex-col gap-6 w-full lg:w-[28%] xl:w-[22%] ">
          <div className="sticky  py-4 px-3 rounded-sm shadow-lg bg-white">
            <h1 className=" font-medium text-[18px] text-gray-900 flex items-center justify-between">
              Categories
              <span className=" text-[14px] text-teal-600">
                <FaSearch />
              </span>{" "}
            </h1>
            <ul className=" mt-2">
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
            </ul>
          </div>
          {/* <div className=" sticky py-4 px-3 rounded-sm shadow-lg bg-white">
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
                navigate(`/authors/${inputValue.value}`);
              }}
              action=""
              className="rounded-md relative  w-full h-[40px]"
            >
              <input
                className="rounded-md pl-2 w-full h-full"
                type="text"
                placeholder="Search for the author"
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
          <div className=" flex items-start gap-4 bg-white mb-4 px-4 py-4 rounded-md">
            {loadingDataAuthor ? (
              <div className=" flex items-center justify-center">
                {" "}
                <ThreeDots
                  visible={true}
                  height="40"
                  width="40"
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
                {error?.status == 400 ? (
                  <p className=" w-[80vw] m-auto lg:w-[65vw] py-[180px] flex items-center justify-center text-[20px] font-bold text-[#B10707]">
                    Bad id
                  </p>
                ) : (
                  <>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    {error?.status == 500 ? (
                      <>
                        {" "}
                        <div className="m-auto py-[180px] flex items-center justify-center text-center text-[#B10707] px-2 font-raleway font-bold text-[24px]  leading-5">
                          Server error, <br /> try again
                        </div>{" "}
                      </>
                    ) : (
                      <>
                        {" "}
                        <div>
                          <img
                            src={dataAuthor?.payload.author.authorAvatarUrl}
                            alt=""
                            className=" w-[90px] rounded-full"
                          />
                        </div>
                        <div>
                          <h2 className=" font-semibold text-[20px] text-teal-800 ">
                            {dataAuthor?.payload.author.authorName}
                          </h2>
                          <p className=" font-medium text-[10px] my-[-2px]">
                            Birth Date:{" "}
                            {formatDate(dataAuthor?.payload.author.birthDate)}
                          </p>
                          <p className=" font-medium text-[12px] my-[-5px]">
                            {dataAuthor?.payload.books.length} books
                          </p>
                          <p className=" font-medium text-[14px] ">
                            {dataAuthor?.payload.author.bio
                              ? dataAuthor?.payload.author.bio
                              : "No bio"}
                          </p>
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          <div className="shadow-lg rounded-md bg-white py-3 flex items-center justify-evenly mb-8">
            <div className=" transition cursor-pointer font-medium text-[14px] text-gray-900 hover:text-teal-600  flex flex-col items-center justify-center gap-2">
              <div>
                <img src={bookAuth} alt="" className=" w-[60px]" />
              </div>
              <p
                className={` text-[18px] font-medium mt-[-10px] capitalize text-teal-600 transition`}
              >
                Books of author
              </p>
            </div>
          </div>
          {loadingDataAuthor || isFetching ? (
            <div className=" flex items-center justify-center">
              {" "}
              <ThreeDots
                visible={true}
                height="65"
                width="65"
                color="#115e59"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <div className="grid mt-4 gap-4  grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {dataAuthor?.payload.books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mb-4 bg-white py-2 px-2 border-b-[1px] h-[35px] border-teal-400 rounded-lg shadow-md rounded-t-none  flex items-center justify-start gap-1 text-teal-800"></div>
    </div>
  );
};

export default AuthorPage;
