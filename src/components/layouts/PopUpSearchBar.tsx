import { IoCloseCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type ChildProps = {
  setShow: (newValue: boolean) => void;
};

const PopUpSearchBar = ({ setShow }: ChildProps) => {
  const navigate = useNavigate();

  const closePopup = () => {
    setShow(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div>
      <div
        onClick={() => (setShow(false), closePopup())}
        className="bg-gray-500 bg-opacity-50 absolute z-40 w-screen h-screen"
      ></div>
      <div className="popup-container z-50 fixed flex flex-col justify-center h-[220px] rounded-lg px-3 py-4 w-[500px] bg-white shadow-md top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%]">
        <div className="flex flex-row-reverse justify-between items-center">
          <span
            onClick={() => (setShow(false), closePopup())}
            className="cursor-pointer text-[24px]"
          >
            <IoCloseCircleOutline />
          </span>
          <p className="flex flex-col font-medium text-[14px] text--gray-900">
            Searching for a book
            <span className="mt-[-2px] h-[2px] w-[40px] bg-teal-800"></span>
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            document.body.style.overflow = "auto";

            const inputValue = (e.target as HTMLFormElement)
              .elements[0] as HTMLInputElement;
            if (inputValue.value.trim() !== "") {
              navigate(`/searchBook/${inputValue.value}`);
              setShow(false);
            }
          }}
          className="pt-8 flex items-center justify-center gap-3 flex-col"
        >
          <input
            type="text"
            placeholder="Search"
            className="w-full h-[40px] pl-2 md:h-[50px] border-gray-300 border-2 placeholder:text-[18px] placeholder:font-medium py-1 focus:outline-0"
          />
          <input
            type="submit"
            value="Search"
            className="bg-teal-800 transition md:text-[18px] font-medium hover:bg-teal-600 h-[40px] md:h-[50px] px-2 w-[85px] md:w-[22%] text-white cursor-pointer hover:text-black border-gray-300 border-2"
          />
        </form>
      </div>
    </div>
  );
};

export default PopUpSearchBar;
