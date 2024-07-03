import React, { useState } from "react";

export const Alert = (props) => {
  const { showAlert, setShowAlert } = props;
  const handleRemove = () => {
    setShowAlert(null);
  };
  return (
    <div className=" fixed bg-slate-600 text-white w-full">
      <div className="flex justify-between">
        <div>Alert : {showAlert}</div>
        <button className="flex" onClick={handleRemove}>
          X
        </button>
      </div>
    </div>
  );
};
