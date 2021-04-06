import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { useGlobalContext } from "./context";

const Loading = () => {
  const { isLoading } = useGlobalContext();

  return (
    <div className="loading">
      <PuffLoader color="#131313" loading={isLoading} css="" size={60} />
    </div>
  );
};

export default Loading;
