describe("sendMessage", () => {
  const originalConsoleError = console.error;
  const originalWindow = { ...window };

  beforeEach(() => {
    console.error = jest.fn();
    window.ReactNativeWebView = { postMessage: jest.fn() };
  });

  afterEach(() => {
    console.error = originalConsoleError;
    window = { ...originalWindow }; // Restore window object
  });

  it("should send a serialized message when ReactNativeWebView is available", () => {
    const type = "TEST_TYPE";
    const payload = { data: "test" };
    const expectedMessage = JSON.stringify({ type, payload });

    require("../../app/lib/uwncp").sendMessage(type, payload); // Adjust the path as necessary

    expect(window.ReactNativeWebView.postMessage).toHaveBeenCalledWith(
      expectedMessage
    );
  });

  it("should log an error when ReactNativeWebView is not available", () => {
    // @ts-expect-error
    delete window.ReactNativeWebView;

    const type = "TEST_TYPE";
    const payload = { data: "test" };

    require("../../app/lib/uwncp").sendMessage(type, payload); // Adjust the path as necessary

    expect(console.error).toHaveBeenCalledWith(
      "Native interface not available"
    );
  });

  it("should log an error on serialization failure", () => {
    const type = "TEST_TYPE";
    const payload = { data: "test" };
    // Creating a cyclic object to force JSON.stringify to throw an error
    // @ts-expect-error
    payload.self = payload;

    const customStringify = () => {
      throw new Error("Fake serialization error");
    };

    require("../../app/lib/uwncp").sendMessage(type, payload, customStringify); // Adjust the path as necessary

    expect(console.error).toHaveBeenCalledWith(
      "Failed to serialize message:",
      expect.any(Error)
    );
  });
});
