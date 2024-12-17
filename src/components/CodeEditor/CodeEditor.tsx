import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Result } from "../Result.types";
import defaultCode from "../defaultCode";
import "./CodeEditor.css";

const CodeEditor: React.FC = () => {
  const [language, setLanguage] = useState<string>("python");
  const [code, setCode] = useState<string>(defaultCode.python);
  const [result, setResult] = useState<Result | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(defaultCode[newLanguage] || "");
  };

  const runCode = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ status: "error", error: (error as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header>Online Code Editor</header>

      <div className="description">
        Task: Write a program that prints "Hello, world!"
      </div>

      <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
        <option value="python">Python</option>
        <option value="go">Go</option>
      </select>

      <MonacoEditor
        height="300px"
        language={language}
        value={code}
        onChange={(newCode) => setCode(newCode || "")}
      />

      <button onClick={runCode} disabled={isLoading}>
        {isLoading ? "Running..." : "Run"}
      </button>

      {result && (
        <div className={`result ${result.status}`}>
          {result.status === "success" ? (
            <pre>{result.output}</pre>
          ) : (
            <pre className="error-pre">{result.error}</pre>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
