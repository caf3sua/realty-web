// Split-text util thay cho GSAP SplitText.
// Tiếng Việt có dấu → chỉ split theo TỪ (khoảng trắng), không split ký tự.

export interface SplitResult {
  /** Các span bên trong (target cho GSAP animate). */
  words: HTMLElement[];
  /** Khôi phục text gốc. */
  revert: () => void;
}

/**
 * Wrap mỗi từ trong 2 lớp span:
 * <span class="overflow-hidden inline-block"><span class="inline-block">từ</span></span>
 * Lớp ngoài che khi từ trượt lên từ dưới (mask reveal).
 */
export function splitIntoWords(el: HTMLElement): SplitResult {
  const original = el.innerHTML;
  const text = el.textContent ?? '';
  el.innerHTML = '';

  const words: HTMLElement[] = [];
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const outer = document.createElement('span');
    outer.className = 'inline-block overflow-hidden align-bottom';
    const inner = document.createElement('span');
    inner.className = 'inline-block will-change-transform';
    inner.textContent = word;
    outer.appendChild(inner);
    el.appendChild(outer);
    // khoảng trắng thật giữa các từ để giữ line-break tự nhiên
    el.appendChild(document.createTextNode(' '));
    words.push(inner);
  }

  return {
    words,
    revert: () => {
      el.innerHTML = original;
    },
  };
}
