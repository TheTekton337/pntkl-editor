import * as React from "react";

// Mock the MonacoEditor component
const MonacoEditor = () => <div />;

// Mock the languages part used in your component
const languages = {
  typescript: {
    typescriptDefaults: {
      setCompilerOptions: jest.fn(),
      setDiagnosticsOptions: jest.fn(),
    },
    javascriptDefaults: {
      setEagerModelSync: jest.fn(),
      setCompilerOptions: jest.fn(),
      setDiagnosticsOptions: jest.fn(),
    },
    ScriptTarget: {
      ES2015: 2,
    },
    ModuleResolutionKind: {
      NodeJs: 2,
    },
    ModuleKind: {
      CommonJS: 1,
    },
    JsxEmit: {
      React: 1,
    },
  },
};

// Explicitly export languages
export { languages };

// Export the mocked MonacoEditor as default
export default MonacoEditor;
