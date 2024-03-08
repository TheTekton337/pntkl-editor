import React, { useRef, useEffect } from "react";

import { javascript } from "@codemirror/lang-javascript";
import { EditorView, ViewUpdate } from "@codemirror/view";

import { useReactCodeMirrorEditor } from "../hooks/useReactCodeMirrorEditor";
import { EditorState, Statistics } from "@uiw/react-codemirror";
import { sendMessage } from "../lib/uwncp";

interface ReactCodeMirrorEditorProps {
  initialValue?: string;
  onEditorChange?: (value: string, viewUpdate: ViewUpdate) => void;
  onExternalUpdate?: (editorState: EditorState) => void;
  onStatistics?: (data: Statistics) => void;
  onCreateEditor?: (view: EditorView, state: EditorState) => void;
  onUpdate?: (viewUpdate: ViewUpdate) => void;
}

const ReactCodeMirrorEditor: React.FC<ReactCodeMirrorEditorProps> = ({
  initialValue = "",
  onEditorChange,
  onExternalUpdate,
  onStatistics,
  onCreateEditor,
  onUpdate,
}) => {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);

  const { container } = useReactCodeMirrorEditor({
    container: editorContainerRef.current,
    height: "100vh",
    theme: "dark",
    extensions: [javascript({ jsx: true })],
    value: initialValue,
    onChange: (value, viewUpdate) => {
      // Notify native side of the content change
      sendMessage("editorContentChange", value);
      // Internal change handling
      onEditorChange?.(value, viewUpdate);
    },
    onExternalUpdate: (editorState) => {
      onExternalUpdate?.(editorState);
    },
    onStatistics: (data: Statistics) => {
      onStatistics?.(data);
    },
    onCreateEditor: (view: EditorView, state: EditorState) => {
      onCreateEditor?.(view, state);
    },
    onUpdate: (viewUpdate: ViewUpdate) => {
      onUpdate?.(viewUpdate);
    },
    // TODO: Add more props
  });

  useEffect(() => {
    const editorDiv = editorContainerRef.current;
    if (container && editorDiv && !editorDiv.contains(container)) {
      editorDiv.appendChild(container);
    }
    return () => {
      if (editorDiv) {
        editorDiv.innerHTML = "";
      }
    };
  }, [container]);

  return <div ref={editorContainerRef} />;
};

export default ReactCodeMirrorEditor;
