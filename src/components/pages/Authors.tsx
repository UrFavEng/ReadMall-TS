import { FaSearch } from "react-icons/fa";
import { GiWhiteBook } from "react-icons/gi";
import { useGetAllCatsQuery } from "../store/apislice";
import authors from "../../assets/popular_user1.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const Authors = () => {
  const { data: dataCats, isLoading, isError } = useGetAllCatsQuery();
  const famousEnglishAuthors: string[] = [
    "William Shakespeare",
    "Jane Austen",
    "Charles Dickens",
    "J.K. Rowling",
    "George Orwell",
    "Agatha Christie",
    "Virginia Woolf",
    "William Wordsworth",
  ];
  const navigate = useNavigate();

  return (
    <div className=" container m-auto px-4 pt-[71px]">
      <h1 className=" text-teal-800 font-semibold text-[28px] mt-3">
        Authors of the books
      </h1>
      <p className="text-gray-900 font-medium text-[14px] mt-[-5px]">
        {famousEnglishAuthors.length} authors
      </p>
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
              {isLoading ? (
                <>
                  {" "}
                  <li className=" flex items-center justify-center">
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
                  </li>
                </>
              ) : (
                <>
                  {isError ? (
                    <>
                      {" "}
                      <li className="  flex items-center justify-center text-center text-[#B10707] py-3 px-2 font-raleway font-bold text-[14px] leading-3">
                        Server error, <br /> try again
                      </li>
                    </>
                  ) : (
                    <>
                      {" "}
                      {dataCats?.payload.categories.map((cat) => (
                        <li
                          onClick={() =>
                            // handleChangeCat(),
                            navigate(`/category/${cat.id}`)
                          }
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
          <div className="  py-4 px-3 rounded-sm shadow-lg bg-white">
            <h1 className=" font-medium text-[18px] text-gray-900 flex items-center justify-between">
              Authors
              <span className=" text-[14px] text-teal-600">
                <FaSearch />
              </span>{" "}
            </h1>
            <ul className=" mt-2">
              {famousEnglishAuthors.map((name) => (
                <li
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
          </div>
        </div>
        <div className=" w-full  lg:w-[68%] xl:w-[75%]">
          <div className="bg-white mb-4   rounded-md">
            {" "}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const inputValue = (e.target as HTMLFormElement)
                  .elements[0] as HTMLInputElement;

                navigate(`${inputValue.value}`);
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
          <div className="shadow-lg rounded-md bg-white py-3 flex items-center justify-evenly mb-8">
            <div className=" transition cursor-pointer font-medium text-[14px] text-gray-900 hover:text-teal-600  flex flex-col items-center justify-center gap-2">
              <div>
                <img src={authors} alt="" className=" w-[60px]" />
              </div>
              <p className={` text-teal-600 transition`}>Authors</p>
            </div>
          </div>{" "}
          <Outlet />
        </div>
      </div>{" "}
      <div className="mb-4 bg-white py-2 px-2 border-b-[1px] h-[35px] border-teal-400 rounded-lg shadow-md rounded-t-none  flex items-center justify-start gap-1 text-teal-800"></div>
    </div>
  );
};

export default Authors;
