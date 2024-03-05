"use client";

import React, { FC, useRef, useEffect } from "react";
import MonacoEditor, {
  EditorConstructionOptions,
  EditorWillMount,
  EditorDidMount,
  EditorWillUnmount,
} from "react-monaco-editor";

// Import types
import type { editor as MonacoEditorType } from "monaco-editor"; // For IStandaloneCodeEditor
// Import specific modules and members for the runtime usage
import { languages } from "monaco-editor";

interface CodeEditorProps {
  code: string;
  onChange?: (newCode: string) => void;
  editorWillMount?: EditorWillMount;
  editorDidMount?: EditorDidMount;
  editorWillUnmount?: EditorWillUnmount;
}

interface EditorEvent<T = string> {
  eventName: T;
  payload: any;
}

interface EditorOptions {
  [key: string]: any;
}

type RNEventNames =
  | "test"
  | "codeChange"
  | "setEditorOptions"
  | "setBooleanOptionTrue"
  | "setBooleanOptionFalse";

const CodeEditor: FC<CodeEditorProps> = ({
  code,
  onChange,
  editorWillMount,
  editorDidMount,
  editorWillUnmount,
  ...restProps
}) => {
  const editorRef = useRef<MonacoEditorType.IStandaloneCodeEditor | null>(null);

  const options: EditorConstructionOptions = {
    automaticLayout: true,
    fontSize: 10,
    lineHeight: 14,
    wordWrap: "on",
    minimap: { enabled: true },
    scrollBeyondLastLine: true,
    selectOnLineNumbers: true,
  };

  useEffect(() => {
    // Dynamically load the TypeScript language service
    languages.typescript.typescriptDefaults.setCompilerOptions({
      target: languages.typescript.ScriptTarget.ES2015,
      allowNonTsExtensions: true,
      moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
      module: languages.typescript.ModuleKind.CommonJS,
      jsx: languages.typescript.JsxEmit.React,
    });

    // Enable type checking for JavaScript files
    languages.typescript.javascriptDefaults.setEagerModelSync(true);
    languages.typescript.javascriptDefaults.setCompilerOptions({
      target: languages.typescript.ScriptTarget.ES2015,
      allowNonTsExtensions: true,
      moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
      module: languages.typescript.ModuleKind.CommonJS,
      jsx: languages.typescript.JsxEmit.React,
    });
  }, []);

  const handleEditorWillMount: EditorWillMount = (monaco) => {
    if (editorWillMount) {
      editorWillMount(monaco);
    }
  };

  const handleEditorWillUnmount: EditorWillUnmount = (editor, monaco) => {
    if (editorWillUnmount) {
      editorWillUnmount(editor, monaco);
    }
  };

  const handleEditorDidMount: EditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Enable linting for TypeScript and JavaScript
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    if (editorDidMount) {
      editorDidMount(editor, monaco);
    }
  };

  const handleChange = (newCode: string) => {
    if (onChange) {
      onChange(newCode);
    }
  };

  return (
    <MonacoEditor
      language="javascript"
      theme="vs-dark"
      value={code}
      options={options}
      onChange={handleChange}
      editorWillMount={handleEditorWillMount}
      editorDidMount={handleEditorDidMount}
      editorWillUnmount={handleEditorWillUnmount}
      {...restProps}
    />
  );
};

export default CodeEditor;
