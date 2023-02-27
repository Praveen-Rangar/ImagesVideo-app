import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading() {
  return (
    <div className="flex items-center justify-center font-semibold items text-7xl text-primary-500">
      <AiOutlineLoading3Quarters className="animate-spin" />{" "}
    </div>
  );
}

export default Loading;
