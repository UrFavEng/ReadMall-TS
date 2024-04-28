import { Rating } from "@mui/material";
import { GetAllReviews } from "../../types/types.model";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { useDeleteReviewMutation } from "../store/apislice";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";
interface ReviewCardProps {
  review: GetAllReviews;
}
const ReviewCard = ({ review }: ReviewCardProps) => {
  const [errEditReview, setErrEditReview] = useState<string>("");
  function formatDate(dateString: string | undefined): string {
    if (dateString) {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "2-digit",
      };
      return date.toLocaleDateString("en-US", options);
    }
    return "Undefined";
  }
  const [DeleteReview, { isLoading: loadingDeleteReview }] =
    useDeleteReviewMutation();

  const HandleEdit = () => {
    setErrEditReview("");
    if (Number(localStorage.getItem("id")) !== review.user.id) {
      setErrEditReview("U Can't Edit This Review");
    }
  };
  const HandleDelete = () => {
    setErrEditReview("");
    DeleteReview(review.id)
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
      })
      .catch((rejected) => {
        console.error(rejected.status);
        if (rejected.status == 404) {
          setErrEditReview("U Can't Delete This Review");
        } else if (rejected.status == 403) {
          Swal.fire("You must login");
        }
      });
  };
  return (
    <div className=" flex flex-col gap-4 my-2">
      <div className=" justify-between flex gap-1 items-start">
        <div>
          <img
            src={review.user.avatarUrl}
            alt=""
            className=" w-[60px] rounded-full"
          />
        </div>
        <div className=" bg-[#f1f1f1] rounded-md py-1 px-4 w-[90%]">
          <h1 className=" flex justify-between items-center">
            <span className=" text-[14px] sm:text-[18px] capitalize font-medium text-teal-700">
              {review.user.fullname}
            </span>
            <span className="text-[10px] sm:text-[12px]">
              {formatDate(review.createdAt)}
            </span>
          </h1>
          <div className=" ml-[-2px]">
            {" "}
            <Rating
              name="read-only"
              value={review.rate}
              readOnly
              size="small"
            />
          </div>
          <p className=" font-medium flex justify-between items-center text-gray-900">
            <span className=" text-[14px] sm:text-[16px] flex items-center gap-1">
              {review.comment}
              <span
                onClick={() => HandleEdit()}
                className=" cursor-pointer sm:text-[18px] text-teal-700"
              >
                <MdEdit />
              </span>
            </span>
            {loadingDeleteReview ? (
              <ThreeDots
                visible={true}
                height="30"
                width="30"
                color="#115e59"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <span
                onClick={() => HandleDelete()}
                className=" cursor-pointer text-[18px] text-gray-900"
              >
                <MdDelete />
              </span>
            )}
          </p>
          <p className=" font-medium text-teal-600">{errEditReview}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
