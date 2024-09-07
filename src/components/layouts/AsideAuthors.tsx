import { FaSearch } from "react-icons/fa";
import { GiWhiteBook } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useGetAllAuthorQuery } from "../store/apislice";
import { ThreeDots } from "react-loader-spinner";

const AsideAuthors = () => {
  const navigate = useNavigate();
  const {
    data: allAuthors,
    isLoading: loadingAllAuthors,
    isError,
  } = useGetAllAuthorQuery(1);
  console.log(allAuthors);
  return (
    <div className=" sticky py-4 px-3 rounded-sm shadow-lg bg-white">
      <h1
        onClick={() => navigate("/authors")}
        className=" cursor-pointer font-medium text-[18px] text-gray-900 flex items-center justify-between"
      >
        Authors
        <span className=" text-[14px] text-teal-600">
          <FaSearch />
        </span>{" "}
      </h1>
      <ul className=" mt-2">
        {loadingAllAuthors ? (
          <>
            {" "}
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
          </>
        ) : (
          <>
            {isError ? (
              <div className="  flex items-center justify-center text-center text-[#B10707] py-3 px-2 font-raleway font-medium text-[20px]  leading-5">
                Server error, <br /> try again
              </div>
            ) : (
              <>
                {" "}
                {allAuthors?.payload.authors.map((author) => (
                  <li
                    onClick={() => navigate(`/author/${author.id}`)}
                    key={author.id}
                    className="hover:underline transition underline-offset-1 text-[18px] text-gray-900  flex items-center justify-between cursor-pointer my-1"
                  >
                    {author.authorName}
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
  );
};

export default AsideAuthors;
