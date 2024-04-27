import { useState } from "react";
import { useGetAllReviewsQuery } from "../store/apislice";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import { Pagination } from "@mui/material";

const Reviews = () => {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event);
    setPage(value);
  };

  const { id } = useParams();
  const { data: dataBook } = useGetAllReviewsQuery({
    pageReview: page,
    id: id,
  });
  return (
    <div className=" bg-white mt-[25px] py-4 px-4  rounded-md border-2">
      <h2 className=" text-[22px] pb-3 font-medium text-teal-700 text-center">
        Reviews
      </h2>
      {dataBook?.payload.reviews && dataBook?.payload.reviews.length > 0 && (
        <>
          {" "}
          {dataBook?.payload.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </>
      )}
      <div className=" flex items-center justify-center my-2">
        {" "}
        <Pagination
          page={page}
          onChange={handleChange}
          count={dataBook?.payload.numOfPages}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default Reviews;
