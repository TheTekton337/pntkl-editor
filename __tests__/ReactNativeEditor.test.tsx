import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ReactNativeEditor from "../app/components/ReactNativeEditor";

jest.mock("../app/components/CodeEditor", () => {
  return {
    __esModule: true,
    default: ({
      code,
      onChange,
    }: {
      code: string;
      onChange: (value: string, event: React.ChangeEvent) => void;
    }) => {
      return (
        <textarea
          data-testid="mock-code-editor"
          value={code}
          onChange={(e) => onChange(e.target.value, e)}
        />
      );
    },
  };
});

describe("ReactNativeEditor", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<ReactNativeEditor />);

    const mockRNEditor = getByTestId("mock-code-editor");
    expect(mockRNEditor).toBeInTheDocument();
  });

  it("renders initially with empty code", () => {
    const initialCode = "";

    const { getByTestId } = render(<ReactNativeEditor />);

    const mockEditor = getByTestId("mock-code-editor");
    expect(mockEditor).toHaveValue(initialCode);
  });

  it("updates code state on change", () => {
    const nextCode = "// New code";

    const { getByTestId } = render(<ReactNativeEditor />);

    const mockEditor = getByTestId("mock-code-editor");
    fireEvent.change(mockEditor, { target: { value: nextCode } });
    expect(mockEditor).toHaveValue(nextCode);
  });
});
