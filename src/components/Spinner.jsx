import React from "react";
import { Triangle } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-3xl z-50 animate-fadeIn">
      <div className="p-10 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 shadow-[0_4px_30px_rgba(255,255,255,0.1)] backdrop-blur-3xl flex flex-col items-center border border-[#D946EF] animate-borderPulse transition-all duration-300 hover:scale-105">
        
        {/* Triangle Loader */}
        <Triangle
          visible={true}
          height={100}
          width={100}
          color="#D946EF"
          ariaLabel="triangle-loading"
          className="animate-loaderPulse"
        />

        {/* Loading Text */}
        <p className="text-white text-lg font-semibold mt-6 animate-gradientText">
          Almost there...
        </p>
      </div>
    </div>
  );
};

export default Spinner;
