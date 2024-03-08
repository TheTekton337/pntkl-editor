import { renderHook, act } from "@testing-library/react-hooks";
import { useReactCodeMirrorEditor } from "../../app/hooks/useReactCodeMirrorEditor"; // Adjust the import path as necessary
import { ViewUpdate } from "@codemirror/view";

describe("useReactCodeMirrorEditor", () => {
  const mockContainer = document.createElement("div");

  it("should initialize correctly with provided props", () => {
    const { result } = renderHook(() =>
      useReactCodeMirrorEditor({
        container: mockContainer,
      })
    );

    expect(result.current.container).toBe(mockContainer);
    expect(result.current.state).toBeDefined();
    expect(result.current.view).toBeDefined();
  });

  it("should call onExternalUpdate with the editor state", () => {
    const onExternalUpdate = jest.fn();
    renderHook(() =>
      useReactCodeMirrorEditor({
        container: mockContainer,
        onExternalUpdate,
      })
    );

    // TODO: Since the hook uses useEffect to notify external updates, we need to advance Jest timers
    // or ensure the effect has run.
    expect(onExternalUpdate).toHaveBeenCalledWith(expect.anything());
  });

  it("should handle editor changes and call onChange if provided", () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useReactCodeMirrorEditor({
        container: mockContainer,
        onChange,
      })
    );

    // TODO: Simulate an editor change. May need to mock parts of the CodeMirror
    // environment or this hook to test this effectively.
    act(() => {
      const mockViewUpdate = {} as ViewUpdate;
      return result.current.handleEditorChange("new content", mockViewUpdate);
    });

    expect(onChange).toHaveBeenCalledWith("new content", expect.anything());
  });
});
