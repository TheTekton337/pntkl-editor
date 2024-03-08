import { UWNCPMessage } from "../types/UWNCPMessage";

// UWNCP sendMessage implementation
export const sendMessage = (
  type: string,
  payload: any,
  stringify = JSON.stringify
): void => {
  const message: UWNCPMessage = { type, payload };

  try {
    // Use the provided stringify function to serialize the message
    const serializedMessage = stringify(message);
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(serializedMessage);
    } else {
      console.error("Native interface not available");
    }
  } catch (error) {
    // Handle serialization errors, which could include cyclic dependencies
    console.error("Failed to serialize message:", error);
  }
};
