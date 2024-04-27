import { useGetAllCatsQuery, useGetBooksQuery } from "../store/apislice";
import { FaSearch } from "react-icons/fa";
import { GiWhiteBook } from "react-icons/gi";
import Recently from "../../assets/new_books1.svg";
import MostView from "../../assets/best_books_all_days1.svg";
import { useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { HeaderSearch, BookCard } from "../index";
import { useNavigate } from "react-router-dom";
interface MainSecProps {
  handleChangeCat: () => void;
  handleChangeSearch: () => void;
  handleChangeBook: () => void;
}
const MainSec = ({
  handleChangeCat,
  handleChangeSearch,
  handleChangeBook,
}: MainSecProps) => {
  const navigate = useNavigate();

  const [loadingChangeState, setLoadingChangeState] = useState<boolean>(false);

  const handleClick = () => {
    setLoadingChangeState(true);
    setTimeout(() => {
      setLoadingChangeState(false);
    }, 2000);
  };
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
  const [active, setActive] = useState<boolean>(false);
  const [page] = useState<number>(1);
  const [mostOrRecently, setMostOrRecently] = useState<string>(
    "getRecentlyUploaded"
  );
  const { data: dataCats } = useGetAllCatsQuery();
  const { data: dataBooks, isLoading: loadingBooks } = useGetBooksQuery({
    page: page,
    cat: mostOrRecently,
  });
  console.log(dataBooks, loadingBooks);
  const targetSecRef = useRef<HTMLParagraphElement>(null);
  const scrollToSec = () => {
    if (targetSecRef.current) {
      targetSecRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className=" pt-[71px]">
        <HeaderSearch
          handleChangeSearch={handleChangeSearch}
          handleGoToSec={scrollToSec}
          setMostOrRecently={setMostOrRecently}
          handleClick={handleClick}
          setActive={setActive}
        />
      </div>{" "}
      <div className="container m-auto  px-4">
        {" "}
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
                {dataCats?.payload.categories.map((cat) => (
                  <li
                    onClick={() => (
                      handleChangeCat(), navigate(`/category/${cat.id}`)
                    )}
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

          <div ref={targetSecRef} className=" w-full  lg:w-[68%] xl:w-[75%]">
            <div className="shadow-lg bg-white py-3 flex items-center justify-evenly mb-8">
              <div
                onClick={() => {
                  setActive(false),
                    setMostOrRecently("getRecentlyUploaded"),
                    handleClick();
                }}
                className=" transition cursor-pointer font-medium text-[14px] text-gray-900 hover:text-teal-600  flex flex-col items-center justify-center gap-2"
              >
                <div>
                  <img src={Recently} alt="" className=" w-[60px]" />
                </div>
                <p className={`${active ? " " : " text-teal-600 transition"}`}>
                  Recently Uploaded
                </p>
              </div>
              <div
                onClick={() => {
                  setActive(true),
                    setMostOrRecently("getByViews"),
                    handleClick();
                }}
                className="transition cursor-pointer font-medium text-[14px] text-gray-900 hover:text-teal-600  flex flex-col items-center justify-center gap-2"
              >
                <div>
                  <img src={MostView} alt="" className=" w-[60px]" />
                </div>
                <p className={`${active ? " text-teal-600 transition" : ""}`}>
                  Most View
                </p>
              </div>
            </div>{" "}
            {loadingBooks || loadingChangeState ? (
              <>
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
              </>
            ) : (
              <>
                <div className="grid gap-4 px-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                  {dataBooks?.payload.books.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      handleChangeBook={handleChangeBook}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSec;
