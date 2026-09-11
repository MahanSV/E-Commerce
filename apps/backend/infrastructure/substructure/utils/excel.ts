import xlsx from "xlsx";

type ExcelRow = Record<string, unknown>;
type ExcelJSON = ExcelRow[][];

export function excelCsvBufferToJSON(bufferFile: Buffer): ExcelJSON {
    const workbook = xlsx.read(bufferFile, {
        type: "buffer",
    });

    if (!workbook) {
        throw new Error("No workbook available.");
    }

    return workbook.SheetNames.map((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];

        return xlsx.utils.sheet_to_json<ExcelRow>(worksheet);
    });
}

/**
 * این تابع خروجی xlsx رو میگیره و دقیقا شبیه csv-parse رفتار میکنه:
 * ۱. فقط ردیف‌های شیت اول رو برمی‌داره (چون CSV تک شیته)
 * ۲. تمام مقادیر (اعداد، بولین‌ها و غیره) رو به استرینگ تبدیل می‌کنه
 * ۳. مقادیر null یا undefined (که xlsx برای سلول‌های خالی حذف میکنه) رو به استرینگ خالی "" تبدیل می‌کنه
 */
export function normalizeXlsxToCsvRows(excelData: ExcelJSON): Record<string, string>[] {
    // گرفتن ردیف‌های شیت اول
    const sheetRows = excelData[0] || [];

    return sheetRows.map((row) => {
        const normalizedRow: Record<string, string> = {};

        for (const key in row) {
            if (Object.prototype.hasOwnProperty.call(row, key)) {
                const normalizedKey = key.trim();
                const value = row[key];

                // شبیه‌سازی دقیق رفتار csv-parse
                if (value === null || value === undefined) {
                    normalizedRow[normalizedKey] = "";
                } else if (value instanceof Date) {
                    // اگر xlsx تاریخی رو تشخیص داده باشه، به ISO تبدیلش می‌کنیم
                    normalizedRow[normalizedKey] = value.toISOString();
                } else {
                    // تبدیل اعداد و بولین‌ها به استرینگ
                    normalizedRow[normalizedKey] = String(value).trim();
                }
            }
        }

        return normalizedRow;
    });
}