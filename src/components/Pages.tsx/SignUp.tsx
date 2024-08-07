import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import { SignUpReq } from "../../types/types.model";
import { useSignUpMutation } from "../store/apislice";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";

const SignUp = () => {
  const handleError = () => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Server Error, please try again",
    });
  };

  const navigate = useNavigate();
  const [err, setErr] = useState<string>("");
  const [signUp, { isLoading, error }] = useSignUpMutation();
  const targetSecRef = useRef<HTMLInputElement>(null);
  console.log(error);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpReq>();
  const onSubmit: SubmitHandler<SignUpReq> = (data) => {
    setErr("");
    console.log(data);
    if (data.password == targetSecRef.current?.value) {
      signUp(data)
        .unwrap()
        .then((fulfilled) => {
          console.log(fulfilled);
          localStorage.setItem("token", `${fulfilled?.payload?.token}`);
          localStorage.setItem("dataUser", `${fulfilled?.payload?.user?.id}`);
          navigate("/");
          location.reload();
        })
        .catch((rejected) => {
          if (rejected?.status == 500) {
            handleError();
          } else {
            setErr(rejected.data.message);
          }
          console.error(rejected);
        });
    } else {
      setErrPass("Please ensure both passwords match");
    }
  };
  const [showPass, setShowPass] = useState<boolean>(false);
  const [errPass, setErrPass] = useState<string>("");
  return (
    <div className=" flex flex-col items-center absolute left-[50%] translate-x-[-50%] translate-y-[-50%] top-[50%]">
      <h1 className="mb-4 font-semibold text-[38px] text-teal-800">ReadMall</h1>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" w-[300px] sm:w-[480px] flex items-center justify-center flex-col gap-2"
        >
          <input
            {...register("fullname", { required: "Name is required" })}
            type="text"
            placeholder="Fullname"
            className=" w-full h-[40px] pl-2 md:h-[5=40px] border-gray-300 border-2 placeholder:text-[16px] placeholder:font-medium py-1 rounded-md focus:outline-0"
          />
          {errors.fullname?.message && (
            <p className="w-[100%] tracking-[1px] leading-[0px] text-[14px] ml-1 font-medium text-[#B10707] py-[5px]">
              {errors.fullname?.message}
            </p>
          )}
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
            type="email"
            placeholder="Email"
            className=" w-full h-[40px] pl-2 md:h-[5=40px] border-gray-300 border-2 placeholder:text-[16px] placeholder:font-medium py-1 rounded-md focus:outline-0"
          />
          {errors.email?.message && (
            <p className="w-[100%] tracking-[1px] leading-[0px] text-[14px] ml-1 font-medium text-[#B10707] py-[5px]">
              {errors.email?.message}
            </p>
          )}
          <div className=" w-full relative">
            <input
              {...register("password", { required: "password is required" })}
              className=" w-full h-[40px] pl-2 md:h-[5=40px] border-gray-300 border-2 placeholder:text-[16px] placeholder:font-medium py-1 rounded-md focus:outline-0"
              type={`${showPass ? "text" : "password"}`}
              placeholder="Password"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className=" cursor-pointer absolute top-[50%] flex items-center justify-center right-3 translate-y-[-50%]"
            >
              <FaRegEye />
            </span>{" "}
          </div>
          {errors.password?.message && (
            <p className="w-[100%] tracking-[1px] leading-[0px] text-[14px] ml-1 font-medium text-[#B10707] py-[5px]">
              {errors.password?.message}
            </p>
          )}
          <div className=" w-full relative">
            <input
              ref={targetSecRef}
              className=" w-full h-[40px] pl-2 md:h-[5=40px] border-gray-300 border-2 placeholder:text-[16px] placeholder:font-medium py-1 rounded-md focus:outline-0"
              type={`${showPass ? "text" : "password"}`}
              placeholder="Enter Password Again"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className=" cursor-pointer absolute top-[50%] flex items-center justify-center right-3 translate-y-[-50%]"
            >
              <FaRegEye />
            </span>
          </div>
          <p className="w-[100%] tracking-[1px] leading-[0px] text-[14px] ml-1 font-medium text-[#B10707] py-[5px]">
            {errPass}
          </p>
          {isLoading ? (
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
              {err.trim() && (
                <p className="w-[100%] tracking-[1px] leading-[0px] text-[14px] ml-1 font-medium text-[#B10707] py-[5px]">
                  {err}
                </p>
              )}
              <input
                type="submit"
                value="Submit"
                className="bg-teal-800 transition md:text-[18px] font-medium hover:bg-teal-600 h-[40px] md:h-[50px] px-2 w-[100px] md:w-[120px] text-white cursor-pointer hover:text-[#000] border-gray-300 border-2 border-l-0 rounded-lg"
              />
            </>
          )}
        </form>
        <p className=" font-medium text-[14px] text-center text-gray-900 mt-1">
          Unlock a world of knowledge by registering with us today!
        </p>
      </div>
    </div>
  );
};

export default SignUp;
