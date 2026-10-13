/**
 * Format product updated/created date for display on cards.
 * Examples: "Vừa xong", "15 phút trước", "2 giờ trước", "Hôm qua", "3 ngày trước", "28/09"
 */
export function formatProductDate(dateInput?: string | Date | null, id?: string): string {
  let date: Date | null = null;
  if (dateInput) {
    const d = new Date(dateInput);
    if (!isNaN(d.getTime())) date = d;
  }
  // If no explicit date field, extract generation timestamp from 24-char MongoDB ObjectId
  if (!date && id && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id)) {
    const ts = parseInt(id.substring(0, 8), 16) * 1000;
    const d = new Date(ts);
    if (!isNaN(d.getTime())) date = d;
  }
  if (!date) return '';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  if (diffMs < 0) {
    return 'Vừa xong';
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return 'Vừa xong';
  if (diffMinutes < 60) return `${diffMinutes} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays === 1) return 'Hôm qua';
  if (diffDays <= 7) return `${diffDays} ngày trước`;

  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();

  if (y === now.getFullYear()) {
    return `${d}/${m}`;
  }
  return `${d}/${m}/${y}`;
}

/**
 * Format bedrooms and bathrooms count.
 * If 0 or not set, displays '-' instead of '0 PN' or '0 WC'.
 * Examples:
 * 4, 4 -> "4 PN | 4 WC"
 * 0, 2 -> "- | 2 WC"
 * 3, 0 -> "3 PN | -"
 * 0, 0 -> "- | -"
 */
export function formatBedrooms(bedrooms?: number | null): string {
  return bedrooms && bedrooms > 0 ? `${bedrooms} PN` : '-';
}

export function formatBathrooms(bathrooms?: number | null): string {
  return bathrooms && bathrooms > 0 ? `${bathrooms} WC` : '-';
}

export function formatRooms(
  bedrooms?: number | null,
  bathrooms?: number | null,
  separator: string = ' | '
): string {
  return `${formatBedrooms(bedrooms)}${separator}${formatBathrooms(bathrooms)}`;
}

/**
 * Format news published date (e.g., '2026-05-25' -> '25/05/2026').
 * Preserves already formatted strings (e.g. '12/10/2026').
 */
export function formatNewsDate(dateInput?: string | Date | null): string {
  if (!dateInput) return '';
  if (typeof dateInput === 'string' && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateInput)) {
    return dateInput;
  }
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return typeof dateInput === 'string' ? dateInput : '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

