import { SubmitHandler, useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa6";
import { useEditProfileMutation, useGetMeQuery } from "../store/apislice";
import { ThreeDots } from "react-loader-spinner";
import { EditProfileForm } from "../../types/types.model";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Profile = () => {
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
      text: "You should make change before submit",
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
  const handleSuccess = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Done",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const { data: dataMe, isLoading: loadingGetMe, error } = useGetMeQuery();
  const {
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (dataMe) {
      setValue("fullname", dataMe.payload.user.fullname);
      setValue("email", dataMe.payload.user.email);
      setValue(
        "phoneNum",
        dataMe.payload.user.phoneNum ? dataMe.payload.user.phoneNum : ""
      );
      setValue(
        "gender",
        dataMe.payload.user.gender ? dataMe.payload.user.gender : ""
      );
    }
  }, [dataMe]);
  const [EditProfile] = useEditProfileMutation();

  const onSubmit: SubmitHandler<EditProfileForm> = (data) => {
    // console.log(data);
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }
    if (data.gender !== null && data.gender !== "") {
      formData.append("gender", data.gender);
    }
    if (data.phoneNum !== null && data.phoneNum !== "") {
      formData.append("phoneNum", data.phoneNum);
    }
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    EditProfile(formData)
      .unwrap()
      .then(() => {
        // console.log(fulfilled);
        handleSuccess();
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
  return (
    <div className=" pt-[100px] pb-[29px] h-[90vh] flex items-center justify-center ">
      {/* {!dataMe ? (
        <p className=" capitalize font-semibold text-teal-700 text-[30px]">
          You Must Log in
        </p>
      ) : ( */}
      <>
        {loadingGetMe ? (
          <div className=" flex items-center justify-center">
            {" "}
            <ThreeDots
              visible={true}
              height="70"
              width="70"
              color="#115e59"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {error?.status == 403 ? (
              <p className=" capitalize font-semibold text-[#B10707] text-[30px]">
                You Must Login first!
              </p>
            ) : (
              <>
                {" "}
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                {error?.status == 500 ? (
                  <p className=" text-center capitalize font-semibold text-[#B10707] text-[30px]">
                    Server error, <br /> try again
                  </p>
                ) : (
                  <>
                    {" "}
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="container py-[40px] shadow-lg m-auto px-4 border-t-2 border-teal-800 rounded-2xl bg-white w-full"
                    >
                      <div>
                        <div className=" flex items-center justify-center">
                          <div className="relative">
                            <div className=" outline-none border-none">
                              <input
                                {...register("avatar")}
                                type="file"
                                id="file-input"
                                className=" hidden outline-none border-none w-0"
                              />
                              <label
                                id="file-input-label"
                                htmlFor="file-input"
                                className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[#00474f56] hover:text-teal-900 transition w-full h-full bg-[#f1f1f113] hover:bg-[#f1f1f17c] text-[28px] rounded-full flex items-center justify-center   cursor-pointer"
                              >
                                <FaCamera />
                              </label>
                            </div>
                            <img
                              src={
                                watch("avatar")?.[0]
                                  ? URL.createObjectURL(watch("avatar")?.[0])
                                  : dataMe?.payload.user.avatarUrl
                              }
                              alt=""
                              className=" object-contain w-[150px] aspect-square rounded-full"
                            />
                          </div>
                        </div>
                        <div className=" mt-12 flex flex-col sm:flex-row justify-between items-center gap-2">
                          <div className=" w-full sm:w-[48%] flex-col  flex gap-2">
                            <label
                              className=" text-teal-800 font-medium "
                              htmlFor="name"
                            >
                              Name:
                            </label>
                            <input
                              {...register("fullname", {
                                required: "Name is required",
                              })}
                              id="name"
                              placeholder="Name"
                              type="text"
                              className=" w-[100%] h-[35px] pl-2 rounded-lg shadow-sm focus:shadow-lg  border-gray-300 border-2 placeholder:text-[16px] placeholder:font-medium  focus:outline-0"
                            />
                          </div>
                          <div className="w-full sm:w-[48%] flex flex-col gap-2">
                            <label
                              className=" text-teal-800 font-medium "
                              htmlFor="email"
                            >
                              Email:
                            </label>
                            <input
                              {...register("email", {
                                required: "Email is required",
                              })}
                              id="email"
                              placeholder="Email"
                              type="text"
                              className=" w-[100%] h-[35px] pl-2 rounded-lg shadow-sm focus:shadow-lg  border-gray-300 border-2 placeholder:text-[16px] placeholder:font-medium  focus:outline-0"
                            />
                          </div>
                        </div>
                        <div className=" mt-6 flex flex-col sm:flex-row justify-between items-end gap-2">
                          <div className=" w-full sm:w-[48%]  flex flex-col gap-2">
                            <label
                              className=" text-teal-800 font-medium "
                              htmlFor="phoneNum"
                            >
                              Phone Number:
                            </label>
                            <input
                              {...register("phoneNum")}
                              id="phoneNum"
                              placeholder="Phone Number"
                              type="text"
                              className=" w-[100%] h-[35px] pl-2 rounded-lg shadow-sm focus:shadow-lg  border-gray-300 border-2 placeholder:text-[16px] placeholder:font-medium  focus:outline-0"
                            />
                          </div>
                          <div className=" w-full sm:w-[48%]  flex flex-col gap-2">
                            <label
                              className=" text-teal-800 font-medium "
                              htmlFor="gender"
                            >
                              Gender
                            </label>
                            <select
                              {...register("gender")}
                              id="gender"
                              className=" w-full h-[35px] pl-2 rounded-lg shadow-sm focus:shadow-lg  border-gray-300 border-2 placeholder:text-[16px] placeholder:font-medium  focus:outline-0"
                            >
                              <option value="">Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <input
                        type="submit"
                        value="Submit"
                        className=" w-[90px] cursor-pointer bg-teal-900 text-white hover:bg-teal-600 hover:text-black py-3 px-2 mt-4 transition rounded-md hover:shadow-2xl"
                      />
                      {errors.email?.message && (
                        <p className="w-[100%] tracking-[1px] leading-[0px] text-[14px] ml-1 font-medium text-teal-600 py-[5px]">
                          {errors.email?.message}
                        </p>
                      )}
                      {errors.fullname?.message && (
                        <p className="w-[100%] tracking-[1px] leading-[0px] text-[14px] ml-1 font-medium text-teal-600 py-[5px]">
                          {errors.email?.message}
                        </p>
                      )}
                    </form>
                  </>
                )}
              </>
            )}
          </>
        )}
      </>
      {/* )} */}
    </div>
  );
};

export default Profile;
