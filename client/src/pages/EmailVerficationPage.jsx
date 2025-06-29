import Input from "../components/homePageComponents/Input";
import React, { useRef , useContext } from "react";
import { DialogOpenContext } from "../context/DialogContext";
import {
  animate,
  easeInOut,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";
import { colors, svgs } from "../utils/constants";
import { useEffect } from "react";
import { useAuthStore } from "../store/authstore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EmailVerficationPage = () => {
  const {error, isLoading , verifyEmail} = useAuthStore();
  const { openDialog } = useContext(DialogOpenContext);
  const navigate = useNavigate();
  const color = useMotionValue(colors[2]);
  const backgroundImage = useMotionTemplate`radial-gradient(120% 140% at 50% 0%, #020617 50%, ${color})`;
  useEffect(() => {
    animate(color, colors, {
      ease: easeInOut,
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  });

  const varificationRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = varificationRef.current.value;
    
    try {
      await verifyEmail(code);
      toast.success("email verify succesfully")
      navigate('/')
      openDialog("login");
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <motion.div
        className="w-full h-screen  flex flex-col justify-center items-center bg-gradient-to-b from-[#000000] to-[#151515] text-white relative"
        style={{
          backgroundImage,
        }}
      >
        <div className="w-full h-screen absolute inset-0  backdrop-blur-3xl z-1">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-100 h-110 bg-[#050610] border border-[#1ed2ff2b] rounded-2xl flex flex-col justify-center items-center relative">
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
                <Input
                  type="text"
                  placeholder="verification code"
                  ref={varificationRef}
                />

                <button
                  type="submit"
                  className="mt-7 border border-[#1ed2ff2b] px-4 py-1 bg-[#1ed2ff12] text-white rounded-4xl cursor-pointer hover:bg-[#1eadff3b]"
                >
                  
                  {isLoading ? "Verifying..." : "Verify Email"}
                </button>
                {error && <p className="text-red-600 text-sm mt-3">
                    {error}
                    </p>}
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default EmailVerficationPage;
