interface AuthorCardProps {
  author: {
    id: number;
    authorAvatarUrl: string;
    authorName: string;
    bio: null | string;
    birthDate: string;
    deathDate: null | string;
    numOfBooks?: number;
  };
  index: number;
}
// import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
const AuthorCard = ({ author }: AuthorCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/author/${author.id}`)}
      className=" px-1 cursor-pointer gap-1 py-2 flex flex-col items-center justify-between bg-white shadow-sm hover:shadow-lg hover:scale-[1.04] hover:border-[1px] hover:border-teal-200  transition border-2 rounded-md"
    >
      <div className="">
        <img
          src={author.authorAvatarUrl}
          alt=""
          className=" rounded-full w-[60%] m-auto aspect-square "
        />
      </div>
      <h3 className=" mb-6 mt-1 text-center leading-4 text-gray-900 font-semibold capitalize">
        {author.authorName}
      </h3>
      <div className=" h-[1px] w-[80%] border-[0.1px] border-t-0 border-x-0 border-gray-900"></div>
      {/* <div className="mt-5 flex items-center justify-center text-[12px] font-medium">
        (758){" "}
        <Rating
          name="read-only"
          value={author.numOfBooks}
          readOnly
          size="small"
        />
      </div> */}
      <div className="text-teal-600 text-[14px] font-medium">
        ({author.numOfBooks}) books
      </div>
    </div>
  );
};

export default AuthorCard;
