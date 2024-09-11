import React, { useState } from "react";
import { Button, message, Space, Steps } from "antd";
import BOMSlide from "./slides/Configuration";
import { useNavigate } from "react-router-dom";

const InitialProcessPage = () => {
  return (
    <>
      <div className="max-w-8xl mx-auto py-4 px-3 sm:px-6 lg:px-8">
        <div
          className={`bg-white flex flex-col items-center justify-center h-[75vh] p-6 rounded-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]`}
        >
          <BOMSlide />
        </div>
      </div>
    </>
  );
};
export default InitialProcessPage;
