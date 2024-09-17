import { Rating } from "@mui/material";
import { useEditReviewMutation } from "../store/apislice";
import { GetAllReviews } from "../../types/types.model";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
interface PopUpEditReviewProps {
  setShowPopUp: (val: boolean) => void;
  review: GetAllReviews;
  ID: number | null | string;
}
const PopUpEditReview = ({ setShowPopUp, review }: PopUpEditReviewProps) => {
  const [rate, setrate] = useState<number>(0);
  const [comment, setcomment] = useState<string>("");
  useEffect(() => {
    setrate(review.rate);
    setcomment(review.comment);
  }, [review]);
  const [editReview] = useEditReviewMutation();
  const HandleEdit = () => {
    const body = { rate, comment };
    editReview({ body, id: review.id })
      .unwrap()
      .then(() => {
        // console.log(fulfilled);
      })
      .catch((rejected) => {
        // console.error(rejected.status);
        if (rejected.status == 404) {
          Swal.fire("This's review isn't exist");
        } else if (rejected.status == 500) {
          Swal.fire("Server error");
        }
      });
  };

  return (
    <div className="fixed flex items-center justify-center z-10 top-0 left-0 w-[100vw] h-[100vh] bg-[#00000069]">
      <div
        onClick={() => setShowPopUp(false)}
        className="bg-[#00000069] bg-opacity-50 absolute z-40 w-screen h-screen"
      ></div>
      <div className="popup-container w-[380px] sm:w-[480px] z-50 fixed flex flex-col justify-center h-[220px] rounded-lg  shadow-md top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%]">
        <div className="bg-white p-4 rounded-md max-w-md w-full ">
          <h2 className="text-lg font-medium mb-4 text-gray-900">
            Edit Review
          </h2>
          <input
            placeholder="Comment"
            className="w-full p-2 border-2 rounded text-gray-900 mb-4 outline-none h-[40px]"
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
          />
          <div className="mb-4">
            <Rating
              name="edit-rating"
              value={rate}
              //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //  @ts-ignore
              onChange={(event, newValue) => setrate(newValue ?? 0)}
            />
          </div>
          <button
            onClick={() => HandleEdit()}
            className="bg-teal-700 hover:bg-teal-600 text-white py-2 px-4 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setShowPopUp(false)}
            className="bg-gray-400 hover:bg-gray-300 text-gray-900 py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpEditReview;
