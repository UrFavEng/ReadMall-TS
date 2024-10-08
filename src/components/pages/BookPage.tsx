import { FaSearch } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { GiWhiteBook } from "react-icons/gi";
import { IoCart } from "react-icons/io5";
import {
  useAddCartMutation,
  useAddFavMutation,
  useAddReviewMutation,
  useBookByIdQuery,
  useDeleteCartMutation,
  useDeleteFavMutation,
  useGetAllCatsQuery,
  useGetAllReviewsQuery,
} from "../store/apislice";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineFavoriteBorder,
} from "react-icons/md";
import { Pagination, Rating } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import BookCard from "../layouts/BookCard";
import { SubmitHandler, useForm } from "react-hook-form";
import { ReviewREQ } from "../../types/types.model";
import { IoCartOutline } from "react-icons/io5";
import Reviews from "../layouts/Reviews";
import Swal from "sweetalert2";
import AsideAuthors from "../layouts/AsideAuthors";

const BookPage = () => {
  const handleSuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Done",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const handleError = () => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Server Error, please try again",
    });
  };
  const handleError404 = () => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Not Found",
    });
  };
  const handleError403 = () => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "You should login first",
    });
  };
  const [value, setValue] = useState<number | null>(null);
  const [errRate, setErrRate] = useState<string>("");
  const { id } = useParams();
  const {
    data: dataBook,
    isLoading: loadingDataBook,
    isFetching: isFetchingBookById,
    error,
    isError,
  } = useBookByIdQuery(id);
  console.log(dataBook?.payload.book.coverUrl);
  const navigate = useNavigate();
  // console.log(error);
  const { data: dataCats, isLoading: isLoadingGetAllCats } =
    useGetAllCatsQuery();
  // const famousEnglishAuthors: string[] = [
  //   "William Shakespeare",
  //   "Jane Austen",
  //   "Charles Dickens",
  //   "J.K. Rowling",
  //   "George Orwell",
  //   "Agatha Christie",
  //   "Virginia Woolf",
  //   "William Wordsworth",
  // ];
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
  // console.log(dataBook);
  const [addReview, { isLoading: loadingAddReview }] = useAddReviewMutation();
  const [AddFav, { isLoading: loadingAddFav }] = useAddFavMutation();
  const [AddCart, { isLoading: loadingAddCart }] = useAddCartMutation();
  const [deleteFav, { isLoading: loadingDeleteFav }] = useDeleteFavMutation();
  const [deleteCart, { isLoading: loadingDeleteCart }] =
    useDeleteCartMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ReviewREQ>();
  const onSubmit: SubmitHandler<ReviewREQ> = (data, event) => {
    console.log(event && event.target[0].value);
    setErrRate("");
    // console.log(data);
    const body = { comment: data.comment, rate: value, bookId: id };
    if (value !== null) {
      addReview(body)
        .unwrap()
        .then(() => {
          // console.log(fulfilled);
          reset();
          setValue(null);
          handleSuccess();
        })
        .catch((rejected) => {
          // console.log(rejected);
          if (rejected?.status == 500) {
            handleError();
          } else if (rejected?.status == 404) {
            handleError404();
          } else if (rejected?.status == 403) {
            handleError403();
          }
          // setErrRate(rejected.data.message.details[0].message);
        });
    } else {
      setErrRate("You Forget The Rate");
    }
  };
  const handleAddFav = () => {
    const body = {
      bookId: id,
    };
    AddFav(body)
      .unwrap()
      .then(() => {
        // console.log(fulfilled);
      })
      .catch((rejected) => {
        // console.error(rejected);
        if (rejected?.status == 500) {
          handleError();
        } else if (rejected?.status == 404) {
          handleError404();
        } else if (rejected?.status == 403) {
          handleError403();
        }
      });
  };
  const handleDeleteFav = () => {
    deleteFav(id)
      .unwrap()
      .then(() => {
        // console.log(fulfilled);
      })
      .catch((rejected) => {
        if (rejected?.status == 500) {
          handleError();
        } else if (rejected?.status == 404) {
          handleError404();
        } else if (rejected?.status == 403) {
          handleError403();
        }
      });
  };
  const handleAddCrt = () => {
    const body = {
      bookId: id,
    };
    AddCart(body)
      .unwrap()
      .then(() => {
        // console.log(fulfilled);
      })
      .catch((rejected) => {
        // console.error(rejected);
        if (rejected?.status == 500) {
          handleError();
        } else if (rejected?.status == 404) {
          handleError404();
        } else if (rejected?.status == 403) {
          handleError403();
        }
      });
  };
  const handleDeleteCart = () => {
    deleteCart(id)
      .unwrap()
      .then(() => {
        // console.log(fulfilled);
      })
      .catch((rejected) => {
        // console.error(rejected);
        if (rejected?.status == 500) {
          handleError();
        } else if (rejected?.status == 404) {
          handleError404();
        } else if (rejected?.status == 403) {
          handleError403();
        }
      });
  };
  const [pageReviews, setPageReviews] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event);
    setPageReviews(value);
  };

  const {
    data: dataBookReviews,
    isFetching: isFetchingAllReviews,
    isLoading: isLoadingAllReviews,
  } = useGetAllReviewsQuery({
    pageReview: pageReviews,
    id: id,
  });
  // console.log(dataBookReviews);
  return (
    <div className=" container m-auto px-4 pt-[71px]">
      <h1 className=" bg-white flex-wrap py-2 px-2 border-t-[1px] border-teal-400 rounded-lg shadow-md rounded-b-none  flex items-center justify-start gap-1 text-teal-800  mt-5">
        {loadingDataBook || isFetchingBookById ? (
          <div className=" flex items-center justify-center">
            {" "}
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              color="#115e59"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <>
            {" "}
            <span
              onClick={() => navigate(`/`)}
              className=" cursor-pointer font-bold text-[18px] sm:font-extrabold text-teal-950 sm:text-[20px]"
            >
              Main
            </span>
            <span className=" text-gray-900  text-[16px]">
              <MdKeyboardDoubleArrowRight />
            </span>
            <span
              onClick={() =>
                navigate(`/author/${dataBook?.payload.book.authorId}`)
              }
              className=" cursor-pointer font-semibold sm:font-bold text-teal-900 sm:text-[18px]"
            >
              {dataBook?.payload.book.author.authorName}
            </span>
            <span className=" text-gray-900  text-[15px]">
              <MdKeyboardDoubleArrowRight />
            </span>
            <span
              onClick={() =>
                navigate(`/category/${dataBook?.payload.book.categoryId}`)
              }
              className=" cursor-pointer font-medium sm:font-semibold text-teal-800 text-[14px] sm:text-[16px]"
            >
              {dataBook?.payload.book.category.categoryName}
            </span>
            <span className=" text-gray-900  text-[14px]">
              <MdKeyboardDoubleArrowRight />
            </span>{" "}
            <span className=" font-medium text-teal-700 text-[12px] sm:text-[14px]">
              {dataBook?.payload.book.title}
            </span>
          </>
        )}
      </h1>
      <div className="flex mt-[-20px] gap-8 lg:gap-0 flex-col-reverse lg:flex-row py-8 items-start justify-between">
        <div className="flex  relative h-full flex-col gap-6 w-full lg:w-[28%] xl:w-[22%] ">
          <div className="sticky  py-4 px-3 rounded-sm shadow-lg bg-white">
            <h1 className=" font-medium text-[18px] text-gray-900 flex items-center justify-between">
              Categories
              <span className=" text-[14px] text-teal-600">
                <FaSearch />
              </span>{" "}
            </h1>
            <ul className=" mt-2">
              {isLoadingGetAllCats ? (
                <li className=" flex items-center justify-center">
                  {" "}
                  <ThreeDots
                    visible={true}
                    height="40"
                    width="40"
                    color="#115e59"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </li>
              ) : (
                <>
                  {" "}
                  {dataCats?.payload.categories.map((cat) => (
                    <li
                      onClick={() => navigate(`/category/${cat.id}`)}
                      key={cat.id}
                      className="hover:underline transition underline-offset-1 text-[18px] text-gray-900  flex items-center justify-between cursor-pointer my-1"
                    >
                      {cat.categoryName}
                      <span className=" text-[16px] text-teal-600">
                        <GiWhiteBook />
                      </span>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          {/* <div className=" sticky py-4 px-3 rounded-sm shadow-lg bg-white">
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
          </div> */}
          <AsideAuthors />
        </div>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {error?.status == 404 ? (
          <p className=" w-[80vw] m-auto lg:w-[65vw] py-[180px] flex items-center justify-center text-[20px] font-bold text-[#B10707]">
            Bad id
          </p>
        ) : (
          <>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {error?.status == 500 ? (
              <>
                {" "}
                <div className="m-auto py-[180px] flex items-center justify-center text-center text-[#B10707] px-2 font-raleway font-bold text-[24px]  leading-5">
                  Server error, <br /> try again
                </div>{" "}
              </>
            ) : (
              <>
                {" "}
                <div className=" w-full  lg:w-[68%] xl:w-[75%]">
                  <div className="bg-white mb-4   rounded-md">
                    {" "}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const inputValue = (e.target as HTMLFormElement)
                          .elements[0] as HTMLInputElement;
                        // handleClick();
                        if (inputValue.value.trim() !== "") {
                          navigate(`/searchBook/${inputValue.value}`);
                        }
                      }}
                      className="rounded-md relative  w-full h-[40px]"
                    >
                      <input
                        required
                        className="rounded-md pl-2 w-full h-full"
                        type="text"
                        placeholder="Search"
                      />
                      <button
                        className=" rounded-md flex right-[2px] top-[50%] translate-y-[-50%] h-[35px] w-[35px] text-teal-800 text-[18px] border-[1px] text-center items-center justify-center absolute"
                        title="Submit"
                        type="submit"
                      >
                        <FaSearch />
                      </button>
                    </form>
                  </div>
                  <div className=" relative bg-white py-3 px-2 gap-6 border-2 rounded-md rounded-b-none border-b-0 flex flex-col sm:flex-row items-start justify-start ">
                    {loadingDataBook || isFetchingBookById ? (
                      <div className=" m-auto h-[48vh] flex items-center justify-center">
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
                    ) : (
                      <>
                        <div className="  flex-row-reverse absolute top-3 right-4 flex gap-1">
                          <div className="hidden md:block text-[34px] text-teal-800 cursor-pointer">
                            {dataBook?.payload.book.toBuy && (
                              <>
                                {" "}
                                {dataBook?.payload.book.inCart ? (
                                  <>
                                    {loadingDeleteCart ? (
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
                                      <span onClick={() => handleDeleteCart()}>
                                        {" "}
                                        <IoCart />
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {loadingAddCart ? (
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
                                      <span onClick={() => handleAddCrt()}>
                                        {" "}
                                        <IoCartOutline />
                                      </span>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </div>
                          <div className=" text-[34px] text-teal-800  cursor-pointer">
                            {dataBook?.payload.book.isFav ? (
                              <>
                                {loadingDeleteFav ? (
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
                                  <span onClick={() => handleDeleteFav()}>
                                    {" "}
                                    <MdFavorite />
                                  </span>
                                )}
                              </>
                            ) : (
                              <>
                                {loadingAddFav ? (
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
                                  <>
                                    <span onClick={() => handleAddFav()}>
                                      <MdOutlineFavoriteBorder />
                                    </span>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        <div className=" m-auto sm:m-0">
                          {/* {console.log(dataBook?.payload.book.coverUrl)} */}
                          <img
                            src={`${
                              dataBook?.payload.book.coverUrl.startsWith(
                                "https"
                              )
                                ? dataBook?.payload.book.coverUrl
                                : `https://readmall.onrender.com${dataBook?.payload.book.coverUrl}`
                            }`}
                            // src={`https://readmall.onrender.com${dataBook?.payload.book.coverUrl}`}
                            alt="cover book"
                            className="w-[220px]"
                          />
                        </div>
                        <div className=" w-full sm:w-auto">
                          <h2 className=" text-center sm:text-start text-[18px] font-semibold text-teal-800 capitalize">
                            {dataBook?.payload.book.title}
                          </h2>
                          <div className=" flex items-center justify-center sm:justify-start gap-1 text-[12px] font-medium">
                            ({dataBook?.payload.book.reviews.length})
                            <Rating
                              name="read-only"
                              value={4}
                              readOnly
                              size="small"
                            />
                          </div>
                          <div className="">
                            <ul className=" w-fit sm:w-auto m-auto">
                              <li className=" flex items-center justify-between sm:justify-start my-2">
                                <span className=" text-[16px] w-[120px]">
                                  price
                                </span>{" "}
                                :
                                <span className=" text-[18px] font-medium text-teal-600 ">
                                  {dataBook?.payload.book.price
                                    ? dataBook?.payload.book.price
                                    : "Free"}
                                </span>
                              </li>
                              <li className=" flex items-center justify-between sm:justify-start my-2">
                                <span className=" text-[16px] w-[120px]">
                                  Author
                                </span>{" "}
                                :
                                <span
                                  onClick={() =>
                                    navigate(
                                      `/author/${dataBook?.payload.book.authorId}`
                                    )
                                  }
                                  className=" text-[18px] font-medium cursor-pointer text-teal-600 underline"
                                >
                                  {dataBook?.payload.book.author.authorName}
                                </span>
                              </li>
                              <li className=" flex items-center justify-between sm:justify-start my-2">
                                <span className=" text-[16px] w-[120px]">
                                  Category
                                </span>{" "}
                                :
                                <span
                                  onClick={() =>
                                    navigate(
                                      `/category/${dataBook?.payload.book.categoryId}`
                                    )
                                  }
                                  className=" text-[18px] font-medium cursor-pointer text-teal-600 underline"
                                >
                                  {dataBook?.payload.book.category.categoryName}
                                </span>
                              </li>
                              <li className=" flex items-center justify-between sm:justify-start my-2">
                                <span className=" text-[16px] w-[120px]">
                                  Publisher
                                </span>{" "}
                                :
                                <span
                                  onClick={() =>
                                    navigate(
                                      `/publisher/${dataBook?.payload.book.publisherId}`
                                    )
                                  }
                                  className=" text-[18px] font-medium cursor-pointer text-teal-600 underline"
                                >
                                  {
                                    dataBook?.payload.book.publisher
                                      .publisherName
                                  }
                                </span>
                              </li>
                              <li className=" flex items-center justify-between sm:justify-start my-2">
                                <span className=" text-[16px] w-[120px]">
                                  Pages
                                </span>{" "}
                                :
                                <span className=" text-[18px] font-medium text-teal-600 ">
                                  {dataBook?.payload.book.pages}
                                </span>
                              </li>
                              <li className=" flex items-center justify-between sm:justify-start my-2">
                                <span className=" text-[16px] w-[120px]">
                                  Size
                                </span>{" "}
                                :
                                <span className=" text-[18px] font-medium text-teal-600 ">
                                  {dataBook?.payload.book.size &&
                                    (
                                      dataBook?.payload.book.size /
                                      1024 /
                                      1024
                                    ).toFixed(2)}{" "}
                                  MB
                                </span>
                              </li>
                              <li className=" flex items-center justify-between sm:justify-start my-2">
                                <span className=" text-[16px] w-[120px]">
                                  Type
                                </span>{" "}
                                :
                                <span className=" text-[18px] font-medium text-teal-600 ">
                                  {dataBook?.payload.book.format}
                                </span>
                              </li>
                              <li className=" flex items-center justify-between sm:justify-start my-2">
                                <span className=" text-[16px] w-[120px]">
                                  Release Date
                                </span>{" "}
                                :
                                <span className=" text-[18px] font-medium text-teal-600 ">
                                  {formatDate(
                                    dataBook?.payload.book.releaseDate
                                  )}
                                </span>
                              </li>

                              <li className=" text-teal-700 cursor-pointer font-medium text-[14px] underline my-3">
                                More books like this book
                              </li>
                            </ul>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="  border-2 rounded-t-none rounded-md bg-white flex items-center justify-evenly">
                    <button className="  py-3 px-4 text-teal-700 hover:text-teal-900 transition font-semibold text-[18px]">
                      Read
                    </button>
                    <div className=" border-2 border-b-0 border-t-0 border-l-0 h-[55px] w-[1px]"></div>
                    <a
                      target="_blank"
                      href={`${dataBook?.payload.book.bookUrl}`}
                      download
                      className="py-3 px-4 text-teal-700 hover:text-teal-900 transition font-semibold text-[18px]"
                    >
                      Download
                    </a>
                  </div>
                  <div className=" my-6 rounded-md hover:shadow-md transition px-4 py-4 bg-white">
                    {dataBook?.payload.book.isReviewed ? (
                      <h3 className=" text-[18px] font-medium text-teal-700">
                        You have already provided a comment and a rating
                      </h3>
                    ) : (
                      <>
                        <h1 className=" mb-2 text-teal-800 font-semibold text-[22px]">
                          Add Review
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="">
                          <div className=" mb-4  flex-col sm:flex-row flex items-center justify-start gap-3">
                            <div className=" w-full sm:w-[80%]">
                              {" "}
                              <input
                                {...register("comment", {
                                  required: "Name is required",
                                })}
                                className=" border-2 outline-none h-[35px] rounded-md pl-3 w-full"
                                type="text"
                                placeholder="Add Review"
                              />
                            </div>
                            <div>
                              {" "}
                              <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                  console.log(event);
                                  setValue(newValue);
                                }}
                              />
                            </div>
                          </div>{" "}
                          <p className=" font-medium text-teal-700 mb-3">
                            {errors.comment?.message}
                          </p>
                          <p className=" font-medium text-teal-700 mb-3">
                            {errRate}
                          </p>
                          {loadingAddReview ? (
                            <ThreeDots
                              visible={true}
                              height="50"
                              width="50"
                              color="#115e59"
                              radius="9"
                              ariaLabel="three-dots-loading"
                              wrapperStyle={{}}
                              wrapperClass=""
                            />
                          ) : (
                            <input
                              type="submit"
                              value="Add"
                              className=" py-1 cursor-pointer px-3 text-[20px] font-medium bg-teal-800 hover:bg-teal-700 transition text-white hover:text-black rounded-md"
                            />
                          )}
                        </form>
                      </>
                    )}
                  </div>
                  <div className=" bg-white mt-[25px] py-4 px-4  rounded-md border-2">
                    <h2 className=" text-[22px] pb-3 font-medium text-teal-700 text-center">
                      Reviews
                    </h2>
                    {isLoadingAllReviews || isFetchingAllReviews ? (
                      <div className=" flex items-center justify-center">
                        {" "}
                        <ThreeDots
                          visible={true}
                          height="40"
                          width="40"
                          color="#115e59"
                          radius="9"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      </div>
                    ) : (
                      <>
                        {" "}
                        {dataBookReviews?.payload.reviews.map(
                          (review, index) => (
                            <Reviews review={review} key={index} />
                          )
                        )}
                      </>
                    )}

                    <div className=" flex items-center justify-center my-2">
                      {" "}
                      <Pagination
                        page={pageReviews}
                        onChange={handleChange}
                        count={dataBookReviews?.payload.numOfPages}
                        variant="outlined"
                        shape="rounded"
                      />
                    </div>
                  </div>

                  {isFetchingBookById || (loadingDataBook && !isError) ? (
                    <div className=" py-12 flex items-center justify-center">
                      {" "}
                      <ThreeDots
                        visible={true}
                        height="65"
                        width="65"
                        color="#115e59"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  ) : (
                    <>
                      {" "}
                      <div className="grid mt-4 gap-4  grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {dataBook?.payload.recommendations.map((book) => (
                          <BookCard key={book.id} book={book} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="mb-4 bg-white py-2 px-2 border-b-[1px] h-[35px] border-teal-400 rounded-lg shadow-md rounded-t-none  flex items-center justify-start gap-1 text-teal-800"></div>
    </div>
  );
};

export default BookPage;
