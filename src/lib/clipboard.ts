/** Writes text to the clipboard, throwing when the Clipboard API is unavailable. */
export async function copyToClipboard(text: string): Promise<void> {
  if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
    throw new Error("Clipboard API unavailable");
  }
  await navigator.clipboard.writeText(text);
}
