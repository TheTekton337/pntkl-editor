"use client";

import React, { useState } from "react";
import CodeEditor from "./CodeEditor";

const ReactNativeEditor: React.FC = () => {
  const [code, setCode] = useState<string>("");

  const handleChange = (newCode: string) => {
    setCode(newCode);
  };

  return (
    <div className="full-height bg-dark text-light p-0">
      <CodeEditor code={code} onChange={handleChange} />
    </div>
  );
};

export default ReactNativeEditor;
