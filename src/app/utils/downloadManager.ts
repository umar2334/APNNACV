/**
 * downloadManager — stores a pending PDF blob across route navigation.
 * Toolbar generates the PDF, stores it here, then navigates to /processing.
 * Processing page calls triggerDownload() after the countdown finishes.
 */

let _blob: Blob | null = null;
let _filename = 'AppnaCv.pdf';

export function storePendingBlob(blob: Blob, filename = 'AppnaCv.pdf'): void {
  _blob = blob;
  _filename = filename;
}

export function hasPendingBlob(): boolean {
  return _blob !== null;
}

export function triggerDownload(): void {
  if (!_blob) return;
  const url = URL.createObjectURL(_blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = _filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  _blob = null;
}
