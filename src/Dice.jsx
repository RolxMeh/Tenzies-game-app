import React from "react";

export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#1d4fd8" : "white",
  };
  return (
    <div
      className="bg-white w-10 h-10 rounded-md cursor-pointer"
      onClick={props.clickFunc}
      style={styles}
    >
      <h2 className="text-black mt-1 text-xl flex justify-center items-center">
        {props.value}
      </h2>
    </div>
  );
}
