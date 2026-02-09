
// Basic luminance calculation to determine text color (black or white)
export function getContrastColor(hexColor: string): 'black' | 'white' {
  // If no color provided, default to black text on white bg
  if (!hexColor) return 'black';

  // Remove hash if present
  const hex = hexColor.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate relative luminance
  // Formula: 0.299*R + 0.587*G + 0.114*B
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

  // Threshold (usually 128)
  // If luminance is high (bright), return black text. Else white.
  return (yiq >= 128) ? 'black' : 'white';
}
