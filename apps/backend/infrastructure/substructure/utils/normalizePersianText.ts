function normalizePersianText(text: string | null | undefined): string {
    if (!text) return '';

    return text
        .trim()
        // تبدیل حروف عربی به فارسی
        .replace(/ك/g, 'ک')       // ک عربی → ک فارسی
        .replace(/ي/g, 'ی')       // ی عربی → ی فارسی
        .replace(/ة/g, 'ه')       // ة → ه
        .replace(/ؤ/g, 'و')       // ؤ → و
        .replace(/إ/g, 'ا')       // إ → ا
        .replace(/أ/g, 'ا')       // أ → ا
        .replace(/ء/g, '')        // حذف همزه
        .replace(/ئ/g, 'ی')       // ئ → ی
        .replace(/\u200c/g, ' ')  // نیم‌فاصله (ZWNJ) → فاصله کامل
        .replace(/\u200b/g, '')   // zero-width space → حذف
        .replace(/\s+/g, ' ')     // چند فاصله پشت‌سرهم → یک فاصله
        .normalize('NFC');        // نرمال‌سازی یونیکد
}

export default normalizePersianText;