import { FaSearch } from "react-icons/fa";
import {
  useGetAllCatsQuery,
  useGetBooksByCatQuery,
  useGetCatByIdQuery,
} from "../store/apislice";
import { GiWhiteBook } from "react-icons/gi";
import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import AsideAuthors from "../layouts/AsideAuthors";

const BooksByCat = () => {
  const navigate = useNavigate();

  const [page] = useState<number>(1);
  const { id } = useParams();
  const {
    data: dataBooks,
    isLoading: loadingBooks,
    isFetching: isFetchingGetBooksByCat,
    // error,
  } = useGetBooksByCatQuery({
    pageCat: page,
    id: id,
  });
  const {
    data: dataCat,
    isLoading: loadingCatId,
    isFetching: isFetchingGetCatByid,
    error: errorGetCatById,
  } = useGetCatByIdQuery(id);

  // console.log(dataBooks);
  const { data: dataCats, isLoading: loadingCat } = useGetAllCatsQuery();
  // const famousEnglishAuthors: string[] = [
  //   "Harper Lee",
  //   "George Orwell",
  //   "F. Scott Fitzgerald",
  //   "Jane Austen",
  //   "J.D. Salinger",
  // ];
  return (
    <div className=" container m-auto px-4 pt-[71px]">
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {errorGetCatById?.status == 400 ? (
        <p className=" py-[180px] text-center text-[24px] font-bold text-[#B10707]">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {errorGetCatById?.data.message}
        </p>
      ) : (
        <>
          {" "}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {errorGetCatById?.status == 500 ? (
            <div className="  py-[180px] flex items-center justify-center text-center text-[#B10707] px-2 font-raleway font-bold text-[24px]  leading-5">
              Server error, <br /> try again
            </div>
          ) : (
            <>
              {" "}
              <h1 className=" bg-white text-[22px] font-semibold flex-wrap py-2 px-2 border-t-[1px] border-teal-400 rounded-lg shadow-md rounded-b-none  flex items-center justify-start gap-1 text-teal-800  mt-5">
                {isFetchingGetCatByid ||
                loadingCatId ||
                isFetchingGetBooksByCat ? (
                  <div className=" flex items-center">
                    {" "}
                    <ThreeDots
                      visible={true}
                      height="35"
                      width="35"
                      color="#115e59"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                ) : (
                  <> {dataCat?.payload.category.categoryName}</>
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
                        e.preventDefault();
                        const inputValue = (e.target as HTMLFormElement)
                          .elements[0] as HTMLInputElement;
                        navigate(`${inputValue.value}`);
                      }}
                      className="rounded-md relative  w-full h-[40px]"
                    >
                      <input
                        minLength={4}
                        className="rounded-md pl-2 w-full h-full"
                        type="text"
                        placeholder="Search for book in this Category"
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
                  {loadingBooks ||
                  isFetchingGetCatByid ||
                  isFetchingGetBooksByCat ? (
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
                      {dataBooks?.payload.books &&
                      dataBooks?.payload.books.length < 1 ? (
                        <h1 className=" text-center font-semibold text-teal-700 text-[22px] mt-10">
                          No Books
                        </h1>
                      ) : (
                        <Outlet />
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}

      <div className="mb-4 bg-white py-2 px-2 border-b-[1px] h-[35px] border-teal-400 rounded-lg shadow-md rounded-t-none  flex items-center justify-start gap-1 text-teal-800"></div>
    </div>
  );
};

export default BooksByCat;
