import React, { useEffect, useState } from "react";
import "./sidepanel.css";
import { TipsAndUpdates } from "@mui/icons-material";

const Sidepanel = () => {
  const [selectedText, setSelectedText] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [summarizedText, setSummarizedText] = useState<string>("");

  useEffect(() => {
    // Function to update the stored text
    const updateStoredText = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.selectedText) {
        setInputText(changes.selectedText.newValue);
      }
    };

    // Get the initial stored text
    chrome.storage.local.get("selectedText", (result) => {
      setInputText(result.selectedText || null);
    });

    // Listen for changes in local storage
    chrome.storage.onChanged.addListener(updateStoredText);

    // Clean up listener on component unmount
    return () => {
      chrome.storage.onChanged.removeListener(updateStoredText);
    };
  }, []);

  const handleSummarize = () => {
    // Replace this with your summarize function or API call
    const summary = `Summarized: ${inputText}`;
    setSummarizedText(summary);
  };

  return (
    <div className="flex flex-col p-4 bg-white shadow-lg rounded-lg max-w-sm mx-auto md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <div className="flex justify-center mb-6">
        <TipsAndUpdates style={{ fontSize: 50, color: "purple" }} />
      </div>{" "}
      <h1 className="text-lg sm:text-4xl text-purple-500 mb-4 text-center">
        Hi I am You AI tutor
      </h1>
      <div className="mb-4">
        <textarea
          style={{ outlineColor: "purple" }}
          className="w-full p-2 border border-gray-300 rounded resize-none"
          rows={4}
          placeholder="Enter text to summarize"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <br></br>
      <button
        className="w-full sm:w-auto px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={handleSummarize}
      >
        Explain
      </button>
      {summarizedText && (
        <div className="mt-4 p-2 border border-gray-300 rounded bg-gray-100">
          <h2 className="text-xl font-bold mb-2">Summarized Text:</h2>
          <p>{summarizedText}</p>
        </div>
      )}
    </div>
  );
};

export default Sidepanel;
