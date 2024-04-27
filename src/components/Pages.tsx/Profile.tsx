import { SubmitHandler, useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa6";
import { useEditProfileMutation, useGetMeQuery } from "../store/apislice";
import { ThreeDots } from "react-loader-spinner";
import { EditProfileForm } from "../../types/types.model";
import { useEffect } from "react";

const Profile = () => {
  const { data: dataMe, isLoading: loadingGetMe } = useGetMeQuery();

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
    console.log(data);
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    if (data.avatarUrl && data.avatarUrl.length > 0) {
      formData.append("avatarUrl", data.avatarUrl[0]);
    }
    if (data.gender !== null && data.gender !== "") {
      formData.append("gender", data.gender);
    }
    if (data.phoneNum !== null && data.phoneNum !== "") {
      formData.append("phoneNum", data.phoneNum);
    }
    EditProfile(formData)
      .unwrap()
      .then((fulfilled) => {
        console.log(fulfilled);
      })
      .catch((rejected) => {
        console.error(rejected);
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
            {!dataMe ? (
              <p className=" capitalize font-semibold text-teal-700 text-[30px]">
                You Must Log in
              </p>
            ) : (
              <>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="container py-[40px] shadow-lg m-auto px-4 border-t-2 border-teal-800 rounded-2xl bg-white w-full"
                >
                  <div>
                    <div className=" flex items-center justify-center">
                      <div className="relative">
                        <div className=" outline-none border-none">
                          <input
                            {...register("avatarUrl")}
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
                            watch("avatarUrl")?.[0]
                              ? URL.createObjectURL(watch("avatarUrl")?.[0])
                              : dataMe?.payload.user.avatarUrl
                          }
                          alt=""
                          className=" object-contain w-[150px] rounded-full"
                        />
                      </div>
                    </div>
                    <div className=" mt-12 flex flex-col sm:flex-row justify-between items-center gap-2">
                      <div className=" w-full sm:w-[48%]  flex items-center gap-2">
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
                      <div className="w-full sm:w-[48%] flex items-center gap-2">
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
                    <div className=" mt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
                      <div className=" w-full sm:w-[48%]  flex items-center gap-2">
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
                      <select
                        {...register("gender")}
                        id="gender"
                        className="w-full sm:w-[48%] h-[35px] pl-2 rounded-lg shadow-sm focus:shadow-lg  border-gray-300 border-2 placeholder:text-[16px] placeholder:font-medium  focus:outline-0"
                      >
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
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
      {/* )} */}
    </div>
  );
};

export default Profile;
