import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <CircularProgress
      style={{
        display: "block",
        margin: `${window.innerHeight / 4}px auto`,
      }}
    />
  );
};

export default Loading;
