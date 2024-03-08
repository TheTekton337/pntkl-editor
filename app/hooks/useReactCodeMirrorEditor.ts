import React, { useEffect, useCallback } from "react";
import {
  useCodeMirror,
  ReactCodeMirrorProps,
  ViewUpdate,
} from "@uiw/react-codemirror";
import { EditorState } from "@codemirror/state";

interface UseReactCodeMirrorEditorProps extends ReactCodeMirrorProps {
  container: HTMLDivElement | null;
  onExternalUpdate?: (editorState: EditorState) => void;
}

export const useReactCodeMirrorEditor = ({
  onExternalUpdate,
  ...props
}: UseReactCodeMirrorEditorProps) => {
  const { state, setState, view, setView, container, setContainer } =
    useCodeMirror(props);

  // Handler for internal changes
  const handleEditorChange = useCallback(
    (value: string, viewUpdate: ViewUpdate) => {
      props.onChange?.(value, viewUpdate);
    },
    [props]
  );

  // Effect to listen for external updates
  useEffect(() => {
    if (onExternalUpdate && state) {
      onExternalUpdate(state);
    }
  }, [onExternalUpdate, state]);

  return {
    state,
    setState,
    view,
    setView,
    container,
    setContainer,
    handleEditorChange,
  };
};
