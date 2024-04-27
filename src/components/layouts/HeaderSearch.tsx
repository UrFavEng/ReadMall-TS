import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
interface HeaderSearchProps {
  setMostOrRecently: (arg: string) => void;
  handleClick: () => void;
  handleGoToSec: () => void;
  handleChangeSearch: () => void;
  setActive: (arg: boolean) => void;
}
const HeaderSearch = ({
  setMostOrRecently,
  handleClick,
  handleGoToSec,
  setActive,
  handleChangeSearch,
}: HeaderSearchProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-custom-teal bg-gradient-to-r from-custom-teal to-custom-green h-[380px] flex items-center justify-center gap-2 flex-col py-4">
      <h1 className=" text-center font-medium text-[40px] text-white">
        ReadMall
      </h1>
      <p className=" mt-[-5px] text-gray-300 font-medium text-[16px] md:text-[18px] w-[80%] md:w-[60%] text-center leading-[20px]">
        Explore the limitless worlds within books and ignite your imagination
        with every turn of the page. Adventure awaits!
      </p>
      <div className=" w-[95%] md:w-[70%] lg:w-[55%] mt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleChangeSearch();
            const inputValue = (e.target as HTMLFormElement)
              .elements[0] as HTMLInputElement;
            // handleClick();
            if (inputValue.value.trim() !== "") {
              navigate(`/searchBook/${inputValue.value}`);
            }
          }}
          action=""
          className=" relative flex items-center justify-center"
        >
          <span className=" absolute left-8 text-[18px] text-teal-800 hidden md:block">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="h-[40px] pl-4 md:pl-10 md:h-[50px] border-gray-300 border-2 placeholder:text-[18px] placeholder:font-medium rounded-full rounded-r-none  w-[75%] py-1 focus:outline-0"
          />
          <input
            type="submit"
            value="Search"
            className="bg-teal-800 transition md:text-[18px] font-medium hover:bg-teal-600 h-[40px] md:h-[50px] px-2 w-[85px] md:w-[22%] text-white cursor-pointer hover:text-black border-gray-300 border-2 border-l-0 rounded-full rounded-l-none"
          />
        </form>
      </div>
      <div className=" flex items-center justify-center gap-6 mt-6">
        <button
          onClick={() => {
            setMostOrRecently("getRecentlyUploaded"),
              handleClick(),
              handleGoToSec(),
              setActive(false);
          }}
          className=" text-gray-300 hover:text-white hover:border-white hover:shadow-lg border-gray-300 border-2 rounded-lg py-2 sm:py-3 px-2 sm:px-3 font-medium sm:font-semibold text-[16px] sm:text-[20px]"
        >
          Recently Uploaded
        </button>
        <button
          onClick={() => {
            setMostOrRecently("getByViews"),
              handleClick(),
              handleGoToSec(),
              setActive(true);
          }}
          className=" text-gray-300 hover:text-white hover:border-white hover:shadow-lg border-gray-300 border-2 rounded-lg py-2 sm:py-3 px-2 sm:px-3 font-medium sm:font-semibold text-[16px] sm:text-[20px]"
        >
          Most View
        </button>
      </div>
    </div>
  );
};

export default HeaderSearch;
