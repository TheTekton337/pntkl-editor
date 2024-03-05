import { useEffect } from "react";

import { languages } from "./monaco-editor";

const MonacoEditor = ({
  onChange,
  value,
  editorWillMount,
  editorDidMount,
  editorWillUnmount,
  ...restProps
}) => {
  // Simulate the editorDidMount call with mock functions
  const mockEditor = { onDidChangeModelContent: jest.fn() };
  const mockMonaco = { languages: { ...languages } };

  // Simulate the editorWillMount, editorDidMount, and editorWillUnmount events
  useEffect(() => {
    if (editorWillMount) {
      editorWillMount(mockMonaco);
    }
    if (editorDidMount) {
      editorDidMount(mockEditor, mockMonaco);
    }
    return () => {
      if (editorWillUnmount) {
        editorWillUnmount(mockEditor, mockMonaco);
      }
    };
  }, []);

  return (
    <div data-testid="mockEditor" data-props={JSON.stringify(restProps)}>
      <textarea
        aria-label="editor"
        value={value}
        onChange={(e) => onChange(e.target.value, e)}
      />
    </div>
  );
};

export default MonacoEditor;
