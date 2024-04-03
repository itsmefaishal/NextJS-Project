"use client";
import React, { useState, useEffect } from "react";
import ErrorPage from "./error";
import Loader from "./loading";

async function getData() {
  try {
    const res = await fetch("http://localhost:3000/api/questions");

    if (!res.ok) {
      return <ErrorPage />
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    return <ErrorPage />;
  }
}

export default function Answers() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedWords, setSelectedWords] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData();
      const data = res.dummyQuestions;
      setData(data);
      setFilteredData(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleFilter = () => {
    let filtered = data;
    if (selectedWords > 0) {
      filtered = data.filter((item) => {
        const wordCount = item.answer.split(/\s+/).length;

        return wordCount <= selectedWords;
      });
    }
    setFilteredData(filtered);
  };

  const handleSelectWords = (e) => {
    const selectedValue = e.target.value;
    setSelectedWords(selectedValue);
  };

  useEffect(() => {
    handleFilter();
  }, [selectedWords]);

  const handleDownload = () => {
    const jsonData = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "responses.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="border border-gray-900 rounded-t-lg px-6 py-4 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-100">Filter Responses :</h2>
        <div className="flex items-center space-x-4">
          <select
            value={selectedWords}
            onChange={handleSelectWords}
            className="px-4 py-2 text-sm font-medium leading-5 text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:bg-indigo-700 rounded-lg"
          >
            <option value={1000}>Select Words {`(All)`}</option>
            <option value={50}>Less than 50</option>
            <option value={100}>Less than 100</option>
            <option value={150}>Less than 150</option>
            <option value={200}>Less than 200</option>
          </select>
          <button
            onClick={handleDownload}
            className="px-4 py-2 text-sm font-medium leading-5 text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:bg-indigo-700 rounded-lg"
          >
            Download Filtered Data
          </button>
        </div>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="m-auto">
            <Loader />
          </div>
        ) : (
          <ul className="space-y-4">
            {filteredData.map((item, index) => (
              <li key={index} className="bg-gray-900 p-4 rounded-lg">
                <div className="font-bold text-gray-100">{item.question}</div>
                <div className="text-gray-400">{item.answer}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
