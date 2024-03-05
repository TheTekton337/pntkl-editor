import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CodeEditor from "../app/components/CodeEditor";

describe("CodeEditor", () => {
  it("renders correctly", () => {
    const { getByLabelText } = render(
      <CodeEditor code="// Hello World" onChange={() => {}} />
    );

    const mockEditor = getByLabelText("editor");
    expect(mockEditor).toBeInTheDocument();
  });

  it("renders with initial code", () => {
    const initialCode = "// Initial code";

    const { getByLabelText } = render(
      <CodeEditor code={initialCode} onChange={() => {}} />
    );

    const mockEditor = getByLabelText("editor");
    expect(mockEditor).toHaveValue(initialCode);
  });

  it("supports passing react-monaco-editor props through CodeEditor", () => {
    const customProps = {
      language: "javascript",
      theme: "vs-dark",
      options: { readOnly: true },
    };

    const { getByTestId } = render(
      <CodeEditor code="// Hello World" onChange={() => {}} {...customProps} />
    );

    const mockEditor = getByTestId("mockEditor");
    expect(mockEditor).toHaveAttribute(
      "data-props",
      JSON.stringify(customProps)
    );
  });

  it("calls onChange prop when code is edited", () => {
    const handleChange = jest.fn();

    const { getByLabelText } = render(
      <CodeEditor code="// Hello World" onChange={handleChange} />
    );

    const mockEditor = getByLabelText("editor");
    fireEvent.change(mockEditor, { target: { value: "// New code" } });
    expect(handleChange).toHaveBeenCalledWith("// New code");
  });

  it("calls onChange when code changes", () => {
    const handleChange = jest.fn();

    const { getByLabelText } = render(
      <CodeEditor code="// Initial code" onChange={handleChange} />
    );

    const mockEditor = getByLabelText("editor");
    fireEvent.change(mockEditor, { target: { value: "// New code" } });
    expect(handleChange).toHaveBeenCalledWith("// New code");
  });

  it("calls editorDidMount when editor mounts", async () => {
    const handleEditorDidMount = jest.fn();

    render(
      <CodeEditor
        code="// Initial code"
        onChange={() => {}}
        editorDidMount={handleEditorDidMount}
      />
    );

    await waitFor(() => {
      expect(handleEditorDidMount).toHaveBeenCalled();
    });
  });

  it("calls editorWillMount before the editor mounts", async () => {
    const handleEditorWillMount = jest.fn();

    render(
      <CodeEditor
        code="// Hello World"
        onChange={() => {}}
        editorWillMount={handleEditorWillMount}
      />
    );

    await waitFor(() => {
      expect(handleEditorWillMount).toHaveBeenCalled();
    });
  });

  it("calls editorWillUnmount before the editor unmounts", async () => {
    const handleEditorWillUnmount = jest.fn();

    const { unmount } = render(
      <CodeEditor
        code="// Hello World"
        onChange={() => {}}
        editorWillUnmount={handleEditorWillUnmount}
      />
    );

    unmount();

    await waitFor(() => {
      expect(handleEditorWillUnmount).toHaveBeenCalled();
    });
  });
});
