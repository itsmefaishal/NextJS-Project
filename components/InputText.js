'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";

const InputText = ({onSubmitText}) => {
  const [text, setText] = useState("");
  const [migrate, setMigrate] = useState('/');

  const handleClick = () => {

    if (text.trim() !== "") {
      onSubmitText(text);
      alert(text);
    }
    else {
      alert('Prompt Required')
    }
  };

  useEffect(() => {
    if(text.length > 0){
      setText(text);
      setMigrate('/answers');
    }
    else{
      setMigrate('/');
    }
  }, [migrate, text])

  return (
    <>
      <div className="mt-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border-2 border-gray-700 focus:outline-none focus:border-indigo-500 rounded-md px-4 py-2 block w-full placeholder-gray-400 text-gray-800"
          placeholder="Enter prompt here..."
          required
        />
      </div>
      <div className="mt-6">
        <Link href={migrate}>
          <button
            onClick={handleClick}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </Link>
      </div>
    </>
  );
};

export default InputText;
