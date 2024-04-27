import { useParams } from "react-router-dom";
import { useSearchAuthorQuery } from "../store/apislice";
import AuthorCard from "./AuthorCard";
import { ThreeDots } from "react-loader-spinner";
interface SearchAuthorProps {
  loadingChangeState: boolean;
}
const SearchAuthor = ({ loadingChangeState }: SearchAuthorProps) => {
  const { name } = useParams();
  const { data: dataAuthors, isLoading: loadingSearchAuthor } =
    useSearchAuthorQuery(name);
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
          {loadingChangeState ? (
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
                      <AuthorCard key={author.id} author={author.authorName} />
                    ))}
                  </div>
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
