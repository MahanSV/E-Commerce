
// function normalizeNulls<T extends object>(obj: T | null): T | null {
//     if (!obj)
//         return null
//     return Object.fromEntries(
//         Object.entries(obj).map(([k, v]) => [k, v === null ? undefined : v])
//     ) as T;
// }

// function normalizeNulls<T extends Record<string, any>>(obj: T | null): { [K in keyof T]: Exclude<T[K], null> } | null {
//     if (!obj)
//         return null
//     return Object.fromEntries(
//         Object.entries(obj).map(([k, v]) => [k, v === null ? undefined : v])
//     ) as any;
// }

function prismaNormalizeNull<T extends Record<string, any>>(obj: T | null): { [K in keyof T]: Exclude<T[K], null> } | null {
    if (obj === null || obj instanceof Date) return obj;

    if (Array.isArray(obj)) {
        return obj.map((item) => prismaNormalizeNull(item)) as any;
    }

    if (typeof obj === 'object') {
        const entries = Object.entries(obj).map(([k, v]) => {
            if (v === null) {
                return [k, undefined];
            } else if (typeof v === 'object') {
                return [k, prismaNormalizeNull(v)];
            } else {
                return [k, v];
            }
        });

        return Object.fromEntries(entries) as any;
    }

    return obj;
}

export default prismaNormalizeNull;
