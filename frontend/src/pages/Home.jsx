import React, { useState } from "react";

export default function Home() {
  const [inputNum, setInputNum] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && parseInt(value) >= 0) {
      setError("");
    } else {
      setError("Please enter a valid number");
    }
  };

  const Addtext = () => {
    setInputNum(inputNum + 1);
  };

  const DeleteText = () => {
    setInputNum(inputNum - 1);
  };

  return (
    <div className="ml-20 w-96 mt-40">
      <button
        onClick={Addtext}
        className="ml-auto w-20 text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-lg px-5 py-3 text-center"
      >
        Add
      </button>
      {[...Array(inputNum)].map((_, index) => (
        <div key={index} className="flex mt-4 gap-10">
          <input
            type="text"
            className="w-full border-2 border-gray-300 p-3 rounded-lg mt-2"
            placeholder="Search..."
            onChange={handleInputChange}
          />
          <button
            onClick={DeleteText}
            className=" text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-lg px-5 py-3 text-center mt-2"
          >
            Delete
          </button>
        </div>
      ))}
      <h1 className="mt-10 text-left font-bold">Total : {inputNum}</h1>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
