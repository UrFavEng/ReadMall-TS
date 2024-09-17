import { useState } from "react";
import AuthorCard from "./AuthorCard";
import { useGetAllAuthorQuery } from "../store/apislice";
import { ThreeDots } from "react-loader-spinner";

const AllAuthors = () => {
  const [page] = useState(0);
  const {
    data: allAuthors,
    isLoading: loadingAllAuthors,
    error,
  } = useGetAllAuthorQuery(page);
  // console.log(allAuthors);
  return (
    <>
      {loadingAllAuthors ? (
        <div className=" flex items-center justify-center">
          {" "}
          <ThreeDots
            visible={true}
            height="70"
            width="70"
            color="#115e59"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          {error ? (
            <p className=" text-center capitalize font-semibold text-[#B10707] text-[24px] leading-8">
              Server error, <br /> try again
            </p>
          ) : (
            <>
              <div className="grid gap-4 px-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {allAuthors?.payload.authors?.map((author, i) => (
                  <AuthorCard key={author.id} author={author} index={i} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AllAuthors;
