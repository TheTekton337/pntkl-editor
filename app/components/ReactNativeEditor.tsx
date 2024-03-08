"use client";

import React, { useState } from "react";
import CodeMirrorEditor from "./CodeMirrorEditor";
import { ViewUpdate } from "@codemirror/view";

const ReactNativeEditor: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [_lastViewUpdate, setLastViewUpdate] = useState<ViewUpdate | null>(
    null
  );

  const handleChange = (value: string, viewUpdate: ViewUpdate) => {
    setLastViewUpdate(viewUpdate);
    setCode(value);
  };

  return (
    <div className="full-height bg-dark text-light p-0">
      <CodeMirrorEditor initialValue={code} onEditorChange={handleChange} />
    </div>
  );
};

export default ReactNativeEditor;
