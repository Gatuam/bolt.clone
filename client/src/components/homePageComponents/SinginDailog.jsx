import React, { useContext, useRef } from "react";
import { DialogOpenContext } from "../../context/DialogContext";
import Input from "./Input";
import { useAuthStore } from "../../store/authstore";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const SigninDialog = () => {
  const { open, dialogType, setOpen, openDialog } = useContext(DialogOpenContext);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const {signup , error , isLoading } = useAuthStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      await signup(username , email, password);
      navigate('/verifaction')
    } catch (error) {
      console.log(error);
    }
  };

  if (!open || dialogType !== "signup") return null;

  return (
    <div className="w-full h-screen absolute inset-0 bg-transparent backdrop-blur-3xl z-1">
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-100 py-10 bg-[#050610] border border-[#1ed2ff2b] rounded-2xl flex flex-col justify-center items-center relative">
          <div className="text-center">
            <h1 className="text-white text-xl">Sign up to get started</h1>
            <p className="text-neutral-400 mt-2 mb-5">
              Signup to get 100M tokens free on ek.ai
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[90%] justify-center items-center"
          >
            <Input type="text" placeholder="Full name" ref={nameRef} />
            <Input type="email" placeholder="john@gmail.com" ref={emailRef} />
            <Input type="password" placeholder="********" ref={passwordRef} />

            {(error && <p className=" text-red-500 text-sm mt-3 "> {error}
              </p>)}

            <div className="flex justify-between gap-7 mt-3">
              <p
                onClick={() => openDialog("login")}
                className="text-blue-500 text-sm mt-3 cursor-pointer"
              >
                Already have an account?
              </p>
              <p className="text-neutral-50 text-sm mt-3">Forgot password?</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-7 border border-[#1ed2ff2b] px-4 py-1 bg-[#1ed2ff12] text-white rounded-4xl cursor-pointer hover:bg-[#1eadff3b]"
            >
              {isLoading ? <Loader className=" animate-spin mx-auto"/> : "Sign up"}
            </button>
          </form>

          <div
            onClick={() => setOpen(false)}
            className="absolute border p-2 border-[#2176ff3b] rounded-full flex justify-center items-center top-6 right-4 cursor-pointer text-red-200 bg-[#45ddff09]"
          >
            X
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninDialog;
