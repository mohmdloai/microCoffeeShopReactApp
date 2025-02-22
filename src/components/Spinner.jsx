import React from "react";
import { MoonLoader } from "react-spinners";

const Spinner = () => {
  return (
    <MoonLoader
      color="#ff11bc"
      cssOverride={{ display: "block", margin: "0 auto" }}
      loading
      size={130}
      speedMultiplier={7}
    />
  );
};

export default Spinner;
