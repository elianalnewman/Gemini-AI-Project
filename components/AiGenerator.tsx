// component: MyGenAIComponent
"use client";
import React, { useState } from "react";
import "./AiGenerator.css";
import ReactMarkdown from "react-markdown";
import Loading from "./ui/Loading"

export default function MyGenAIComponent() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResponse(""); // Clear previous response

   function formatText(text:string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '\n## $1\n')
    .replace(/^\s*\*\s+/gm, '- ');
}


    try {
      const apiResponse = await fetch("/api/generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!apiResponse.ok) {
        const text = await apiResponse.text();
        throw new Error(text || "Failed to generate content");
      }

      const reader = apiResponse.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
        console.log(result);
        
        const formattedResult = formatText(result);
        setResponse(formattedResult);
        console.log(response);
        

      }
    } catch (error: any) {
      // Change type to 'any' for easier error access or define a more specific type
      console.error("Error:", error);
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
        {!response && <h1 className="title">How Can I Help Today?</h1>}
        {/* {loading && <Loading />} */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {response && (
        <div className="response">
          <h3 className="response-word">Response</h3>
          {/* <p style={{ whiteSpace: "pre-wrap" }}>{response}</p> */}
          <div className="markdown">
          <ReactMarkdown >{response}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
