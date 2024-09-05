import { FaSearch } from "react-icons/fa";
import { GiWhiteBook } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const AsideAuthors = () => {
  const navigate = useNavigate();

  const famousEnglishAuthors: string[] = [
    "Harper Lee",
    "George Orwell",
    "F. Scott Fitzgerald",
    "Jane Austen",
    "J.D. Salinger",
  ];
  return (
    <div className=" sticky py-4 px-3 rounded-sm shadow-lg bg-white">
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
    </div>
  );
};

export default AsideAuthors;
