import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { useGlobalContext } from "./context";

const Loading = () => {
  const { isLoading } = useGlobalContext();

  return (
    <div>
      <PuffLoader
        color="#131313"
        loading={isLoading}
        css={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        size={60}
      />
    </div>
  );
};

export default Loading;
