import React from "react";
import newImage from "../assets/newImage.jpg";

function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen">

      {/* Left Side (Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        {children}
      </div>

      {/* Right Side (Image - Only Large Screens) */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src={newImage}
          alt="login background"
          className="h-full w-full object-cover"
        />
      </div>

    </div>
  );
}

export default AuthLayout;