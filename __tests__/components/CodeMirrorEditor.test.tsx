import React from "react";
import { render } from "@testing-library/react";
import CodeMirrorEditor from "../../app/components/CodeMirrorEditor";
import { EditorView } from "@codemirror/view";

describe("CodeMirrorEditor", () => {
  it("renders with no initial code", () => {
    const initialCode = "";
    let editor!: EditorView;
    const handleChange = jest.fn();

    render(
      <CodeMirrorEditor
        initialValue={initialCode}
        onEditorChange={handleChange}
        onEditorViewInit={(editorView) => {
          editor = editorView;
        }}
        onUpdate={(update) => {
          if (update.docChanged) {
            handleChange(update.state.doc.toString());
          }
        }}
      />
    );

    // @ts-expect-error
    editor.observer.flush();

    expect(editor.state.doc.toString()).toBe(initialCode);
  });

  it("renders with initial code", () => {
    const initialCode = "// Initial code";
    let editor!: EditorView;
    const handleChange = jest.fn();

    render(
      <CodeMirrorEditor
        initialValue={initialCode}
        onEditorChange={handleChange}
        onEditorViewInit={(editorView) => {
          editor = editorView;
        }}
        onUpdate={(update) => {
          if (update.docChanged) {
            handleChange(update.state.doc.toString());
          }
        }}
      />
    );

    // @ts-expect-error
    editor.observer.flush();

    expect(editor.state.doc.toString()).toBe(initialCode);
  });

  it("calls onEditorChange when code changes", () => {
    let editor!: EditorView;
    const handleChange = jest.fn();

    const { queryByText } = render(
      <CodeMirrorEditor
        initialValue="// Initial code"
        onEditorChange={handleChange}
        onEditorViewInit={(editorView) => {
          editor = editorView;
        }}
        onUpdate={(update) => {
          if (update.docChanged) {
            handleChange(update.state.doc.toString());
          }
        }}
      />
    );

    editor.domAtPos(1).node.nodeValue = "bar";
    // @ts-expect-error
    editor.observer.flush();

    expect(editor.state.doc.toString()).toBe("bar");
    expect(queryByText("foo")).not.toBeInTheDocument();
    expect(queryByText("bar")).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith("bar");
  });

  it("calls onEditorViewInit with the EditorView instance", () => {
    const handleEditorViewInit = jest.fn();

    render(
      <CodeMirrorEditor
        initialValue="// Initial code"
        onEditorViewInit={handleEditorViewInit}
      />
    );

    expect(handleEditorViewInit).toHaveBeenCalledWith(expect.any(EditorView));
  });

  // TODO: Add coverage for all editor events.
});
