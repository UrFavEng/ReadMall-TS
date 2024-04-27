interface AuthorCardProps {
  author: string;
}
import { Rating } from "@mui/material";
import ImageAuthor from "../../assets/92646979.png";
const AuthorCard = ({ author }: AuthorCardProps) => {
  return (
    <div className=" px-1 cursor-pointer gap-1 py-2 flex flex-col items-center justify-between bg-white shadow-sm hover:shadow-lg hover:scale-[1.04] hover:border-[1px] hover:border-teal-200  transition border-2 rounded-md">
      {" "}
      <div className="">
        <img
          src={ImageAuthor}
          alt=""
          className=" rounded-full w-[60%] m-auto "
        />
      </div>
      <h3 className=" mb-6 mt-1 text-center leading-4 text-gray-900 font-semibold capitalize">
        {author}
      </h3>
      <div className=" h-[1px] w-[80%] border-[0.1px] border-t-0 border-x-0 border-gray-900"></div>
      <div className="mt-5 flex items-center justify-center text-[12px] font-medium">
        (758) <Rating name="read-only" value={4} readOnly size="small" />
      </div>
      <div className="text-teal-600 text-[14px] font-medium">(73) books</div>
    </div>
  );
};

export default AuthorCard;
