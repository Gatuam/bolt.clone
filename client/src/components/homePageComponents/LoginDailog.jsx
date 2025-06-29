import React, { useContext, useRef } from "react";
import { DialogOpenContext } from "../../context/DialogContext";
import Input from "./Input";
import { useAuthStore } from "../../store/authstore";
import toast from "react-hot-toast";

const LoginDialog = () => {
  const { open, dialogType, setOpen, openDialog } = useContext(DialogOpenContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const {error, isLoading , login} = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      await login(email, password);
      toast.success("login succefully")
      setOpen(false)
    } catch (error) {
      console.log(error);
    }
  };

  if (!open || dialogType !== "login") return null;

  return (
    <div className="w-full h-screen absolute inset-0 bg-transparent backdrop-blur-3xl z-1">
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-100 h-auto py-10  bg-[#050610] border border-[#1ed2ff2b] rounded-2xl flex flex-col justify-center items-center relative">
          <div className="text-center">
            <h1 className="text-white text-xl">Log in to your account</h1>
            <p className="text-neutral-400 mt-2 mb-5">Welcome back!</p>
          </div>

          <form
            onSubmit={handleLogin}
            className="flex flex-col w-[90%] justify-center items-center"
          >
            <Input type="email" placeholder="Email" ref={emailRef} />
            <Input type="password" placeholder="Password" ref={passwordRef} />

            <div className="flex justify-between gap-7 mt-3">
              <p
                onClick={() => openDialog("signup")}
                className="text-blue-500 text-sm mt-3 cursor-pointer"
              >
                Don't have an account?
              </p>
              <p className="text-neutral-50 text-sm mt-3">Forgot password?</p>
            </div>

            <button
              type="submit"
              className="mt-7 border border-[#1ed2ff2b] px-4 py-1 bg-[#1ed2ff12] text-white rounded-4xl cursor-pointer hover:bg-[#1eadff3b]"
            >
              {isLoading ? "logining..." : "Login"}
            </button>
              {(error && <p className="text-red-600 text-sm">
                {error}
              </p>)}
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

export default LoginDialog;
