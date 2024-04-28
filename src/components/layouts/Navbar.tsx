import { IoCartOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { MdKeyboardArrowRight, MdOutlineFavoriteBorder } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { TbWritingSign } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import { useGetAllCatsQuery, useGetMeQuery } from "../store/apislice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PopUpSearchBar from "./PopUpSearchBar";
import { IoPerson } from "react-icons/io5";
import { IoEnterOutline } from "react-icons/io5";
import { ThreeDots } from "react-loader-spinner";
interface NavbarProps {
  handleChangeCat: () => void;
  handleChangeSearch: () => void;
}
const Navbar = ({ handleChangeCat, handleChangeSearch }: NavbarProps) => {
  const { data: dataCats } = useGetAllCatsQuery();
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const { data: dataMe, isLoading: loadingGetMe } = useGetMeQuery();
  console.log(dataMe);
  return (
    <div className=" bg-white ">
      <div className="shadow-xl  py-4 px-3 sm:px-0 fixed z-10 bg-[#ffffff93] hover:bg-white transition w-full">
        <div className="container flex items-center justify-between  m-auto px-4">
          <div className=" flex items-center justify-center gap-4">
            <h1
              onClick={() => navigate("/")}
              className="text-teal-600 text-[26px] font-bold cursor-pointer"
            >
              ReadMall
            </h1>
            <ul className="  hidden sm:flex items-center justify-center gap-3 text-[14px] font-medium">
              <li className="">
                <Link
                  to="/"
                  className="transition hidden lg:flex items-center justify-center gap-1 cursor-pointer text-gray-900 hover:text-teal-600"
                >
                  <span className="text-teal-600">
                    <AiFillHome />
                  </span>{" "}
                  Home
                </Link>
              </li>
              <li className="transition par-cat relative flex items-center justify-center gap-1 cursor-pointer text-gray-900 hover:text-teal-600">
                <span className="text-teal-600">
                  <BiCategoryAlt />
                </span>{" "}
                Categories
                <div className="cat absolute top-[14px] w-[200px] px-4  left-[-16px] py-8">
                  <ul className="bg-white shadow-md flex flex-col ">
                    {dataCats?.payload.categories.map((cat) => (
                      <li
                        onClick={() => (
                          handleChangeCat(), navigate(`/category/${cat.id}`)
                        )}
                        key={cat.id}
                        className="transition capitalize hover:bg-[#f1f1f1] px-2 py-1 text-teal-800 "
                      >
                        {cat.categoryName}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li>
                <Link
                  className=" transition flex items-center justify-center gap-1 cursor-pointer text-gray-900 hover:text-teal-600"
                  to="/authors"
                >
                  <span className="text-teal-600">
                    <TbWritingSign />
                  </span>{" "}
                  Authors
                </Link>
              </li>
              <li
                onClick={() => (
                  setShow(true), (document.body.style.overflow = "hidden")
                )}
                className="transition flex items-center justify-center gap-1 cursor-pointer text-gray-900 hover:text-teal-600"
              >
                <span className="text-teal-600">
                  <FaSearch />
                </span>{" "}
                Search
              </li>
            </ul>
          </div>
          <div className=" flex items-center justify-center gap-2">
            <div className="par-cat  relative text-[28px] sm:hidden  text-teal-800 cursor-pointer">
              <FaBars />
              <div className="cat absolute top-[18px] w-[225px] lg:w-[300px] px-4 left-[-160px]  md:left-[-135px] lg:left-[-155px] py-8">
                <ul className=" bg-white shadow-md flex flex-col ">
                  {localStorage.getItem("token") ? (
                    <>
                      {loadingGetMe || !dataMe ? (
                        <li>
                          <div className=" flex items-center justify-center">
                            {" "}
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
                          </div>
                        </li>
                      ) : (
                        <>
                          <li
                            onClick={() => navigate("/profile")}
                            className="transition h-[80px] flex items-center justify-between capitalize hover:bg-[#f1f1f1] px-2 py-1 text-teal-800 "
                          >
                            <div className="flex gap-2">
                              <div>
                                <img
                                  src={dataMe?.payload.user.avatarUrl}
                                  alt=""
                                  className="w-[35px] rounded-full"
                                />
                              </div>
                              <div>
                                <h3 className=" text-teal-900 text-[12px] font-medium">
                                  Hi, {dataMe?.payload.user.fullname}
                                </h3>
                                <p className=" text-[12px] text-[#626262]">
                                  Welcome Back
                                </p>
                              </div>
                            </div>
                            <div className=" text-teal-800 text-[28px]">
                              <MdKeyboardArrowRight />
                            </div>
                          </li>
                          <li className="transition  par-cat1 relative  text-gray-900 text-[12px] h-[40px] font-medium flex items-center gap-0 capitalize hover:bg-[#f1f1f1] px-2 y-1 ">
                            <span className=" text-[12px] text-teal-900">
                              <IoIosArrowBack />
                            </span>{" "}
                            Categories
                            <div className="cat1 absolute top-[-16px] w-[180px] px-4  left-[-164px] py-8">
                              <ul className="bg-white shadow-md flex flex-col ">
                                {dataCats?.payload.categories.map((cat) => (
                                  <li
                                    onClick={() => (
                                      handleChangeCat(),
                                      navigate(`/category/${cat.id}`)
                                    )}
                                    key={cat.id}
                                    className="transition capitalize hover:bg-[#f1f1f1] px-2 py-2 text-teal-800 "
                                  >
                                    {cat.categoryName}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </li>
                          <li className="transition text-gray-900 text-[12px] h-[40px] font-medium flex items-center justify-between capitalize hover:bg-[#f1f1f1] px-2 y-1 ">
                            My Favorites
                          </li>
                          <li className="transition text-gray-900 text-[12px] h-[40px] font-medium flex items-center justify-between capitalize hover:bg-[#f1f1f1] px-2 y-1 ">
                            My Cart
                          </li>
                          <li
                            onClick={() => {
                              localStorage.removeItem("token");
                              localStorage.removeItem("dataUser");
                              navigate(`/`);

                              location.reload();
                            }}
                            className="transition text-[13px] h-[40px] font-medium flex items-center justify-between capitalize hover:bg-[#f1f1f1] px-2 y-1 text-teal-800 "
                          >
                            Log out
                          </li>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <li className="transition  par-cat1 relative  text-gray-900 text-[12px] h-[40px] font-medium flex items-center gap-0 capitalize hover:bg-[#f1f1f1] px-2 y-1 ">
                        <span className=" text-[12px] text-teal-900">
                          <IoIosArrowBack />
                        </span>{" "}
                        Categories
                        <div className="cat1 absolute top-[-16px] w-[180px] px-4  left-[-164px] py-8">
                          <ul className="bg-white shadow-md flex flex-col ">
                            {dataCats?.payload.categories.map((cat) => (
                              <li
                                onClick={() => (
                                  handleChangeCat(),
                                  navigate(`/category/${cat.id}`)
                                )}
                                key={cat.id}
                                className="transition capitalize hover:bg-[#f1f1f1] px-2 py-2 text-teal-800 "
                              >
                                {cat.categoryName}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                      <li
                        onClick={() => navigate("/signUp")}
                        className="transition relative  text-teal-900 hover:text-teal-600 text-[14px] h-[40px] font-medium flex items-center gap-0 capitalize hover:bg-[#f1f1f1] px-2 y-[2px] "
                      >
                        Sign up
                      </li>
                      <li
                        onClick={() => navigate("/logIn")}
                        className="transition relative  text-teal-900 hover:text-teal-600 text-[14px] h-[40px] font-medium flex items-center gap-0 capitalize hover:bg-[#f1f1f1] px-2 y-[2px] "
                      >
                        Log in
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            {localStorage.getItem("token") ? (
              <>
                {loadingGetMe ||
                  (!dataMe ? (
                    ""
                  ) : (
                    <div className=" hidden sm:flex items-center justify-center gap-1">
                      <div className="hidden md:block text-[34px] text-teal-800 cursor-pointer">
                        <IoCartOutline />
                      </div>
                      <div className=" text-[34px] text-teal-800  cursor-pointer">
                        <MdOutlineFavoriteBorder />
                      </div>
                    </div>
                  ))}

                <div className="par-cat  relative transition hidden sm:flex  items-center justify-center text-gray-300 hover:text-white hover:bg-teal-600 bg-teal-800 py-1 rounded-md gap-2 cursor-pointer px-2">
                  {loadingGetMe || !dataMe ? (
                    <div className=" flex items-center justify-center">
                      {" "}
                      <ThreeDots
                        visible={true}
                        height="30"
                        width="30"
                        color="#fff"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  ) : (
                    <>
                      <span className=" text-[12px] font-medium ">
                        My Account
                      </span>
                      <div className=" w-[25px]">
                        <img
                          src={dataMe?.payload.user.avatarUrl}
                          alt=""
                          className=" rounded-full"
                        />
                      </div>
                    </>
                  )}

                  <div className="cat absolute top-[20px] w-[280px] lg:w-[300px] px-4 left-[-140px]  md:left-[-135px] lg:left-[-155px] py-8">
                    <ul className=" bg-white shadow-md flex flex-col ">
                      <li
                        onClick={() => navigate("/profile")}
                        className="transition h-[80px] flex items-center justify-between capitalize hover:bg-[#f1f1f1] px-2 py-1 text-teal-800 "
                      >
                        <div className="flex gap-2">
                          <div>
                            <img
                              src={dataMe?.payload.user.avatarUrl}
                              alt=""
                              className="w-[45px] rounded-full"
                            />
                          </div>
                          <div>
                            <h3 className=" text-teal-900 text-[16px]">
                              Hi, {dataMe?.payload.user.fullname}
                            </h3>
                            <p className=" text-[15px] text-[#626262]">
                              Welcome Back
                            </p>
                          </div>
                        </div>
                        <div className=" text-teal-800 text-[28px]">
                          <MdKeyboardArrowRight />
                        </div>
                      </li>
                      <li className="transition text-gray-900 text-[14px] h-[40px] font-medium flex items-center justify-between capitalize hover:bg-[#f1f1f1] px-2 y-1 ">
                        My Favorites
                      </li>
                      <li className="transition text-gray-900 text-[14px] h-[40px] font-medium flex items-center justify-between capitalize hover:bg-[#f1f1f1] px-2 y-1 ">
                        My Cart
                      </li>
                      <li
                        onClick={() => {
                          localStorage.removeItem("token");
                          localStorage.removeItem("dataUser");
                          navigate(`/`);
                          location.reload();
                        }}
                        className="transition h-[40px] font-medium flex items-center justify-between capitalize hover:bg-[#f1f1f1] px-2 y-1 text-teal-800 "
                      >
                        Log out
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="gap-2 hidden sm:flex items-center justify-center">
                  <button
                    onClick={() => navigate("/signUp")}
                    className="bg-teal-800 hover:bg-teal-600  transition py-2 px-2 text-[14px] h-[40px] font-medium text-white rounded-md flex items-center justify-center gap-1"
                  >
                    Sign up{" "}
                    <span className=" text-[20px]">
                      <IoPerson />
                    </span>
                  </button>
                  <button
                    onClick={() => navigate("/logIn")}
                    className="text-teal-800 hover:text-white hover:bg-teal-600 transition border-teal-800 hover:border-teal-600 h-[40px] border-[2px] py-2 px-2 text-[14px] font-medium rounded-md flex items-center justify-center gap-1"
                  >
                    log in
                    <span className=" text-[20px]">
                      <IoEnterOutline />
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {show && (
        <PopUpSearchBar
          setShow={setShow}
          handleChangeSearch={handleChangeSearch}
        />
      )}
      {/* <div className="bg-teal-800 w-5 h-5"></div>
      <div className="bg-gray-300 w-5 h-5"></div>
      <div className="bg-gray-900 w-5 h-5"></div>
      <div className="bg-teal-200 w-5 h-5"></div>
      <div className="bg-teal-600 w-5 h-5"></div> */}
    </div>
  );
};

export default Navbar;
