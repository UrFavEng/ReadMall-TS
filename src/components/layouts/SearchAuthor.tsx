import { useParams } from "react-router-dom";
import { useSearchAuthorQuery } from "../store/apislice";
import AuthorCard from "./AuthorCard";
import { ThreeDots } from "react-loader-spinner";

const SearchAuthor = () => {
  const { name } = useParams();
  const {
    data: dataAuthors,
    isLoading: loadingSearchAuthor,
    isFetching,
    isError,
  } = useSearchAuthorQuery(name);
  console.log(dataAuthors);
  return (
    <>
      {loadingSearchAuthor ? (
        <div className=" flex items-center justify-center">
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
        </div>
      ) : (
        <>
          {isFetching ? (
            <>
              {" "}
              <div className=" flex items-center justify-center">
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
              </div>
            </>
          ) : (
            <>
              {isError ? (
                <div className="  flex items-center justify-center text-center text-[#B10707] py-3 px-2 font-raleway font-bold text-[24px]  leading-5">
                  Server error, <br /> try again
                </div>
              ) : (
                <>
                  {" "}
                  {dataAuthors?.payload.authors &&
                  dataAuthors?.payload.authors.length < 1 ? (
                    <h1 className=" text-center font-semibold text-teal-700 text-[22px] mt-10">
                      No Authors
                    </h1>
                  ) : (
                    <>
                      <div className="grid gap-4 px-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {dataAuthors?.payload.authors.map((author) => (
                          <AuthorCard
                            key={author.id}
                            author={author.authorName}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default SearchAuthor;
