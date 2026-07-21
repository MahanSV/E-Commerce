import normalizePersianText from "#substructure/utils/normalizePersianText.ts";
import parseDotNotation from "#substructure/utils/parseDotNotation.ts";

function normalizeDeep(obj: object | string | {item: any, index: string}[], path = ''): any {
    if (typeof obj === 'string') {
        return normalizePersianText(obj);
    } else if (Array.isArray(obj)) {
        return obj.map((item: any, index: number) => normalizeDeep(item, `${path}[${index}]`));
    } else if (typeof obj === 'object' && obj !== null) {
        const normalized = {};
        for (const key in obj) {
            if (Object.hasOwn(obj, key)) {
                normalized[key] = normalizeDeep(obj[key], `${path}.${key}`);
            }
        }
        return normalized;
    }
    return obj;
}

function flattenSearchInfo(searchInfo: any): any[] {
    if (!Array.isArray(searchInfo)) return [];
    const flatArray = [];
    for (const item of searchInfo) {
        flatArray.push(
            item.fieldName || '',
            item.operator || '',
            item.fieldValue || '',
            item.type || ''
        );
    }
    return flatArray;
}

const normalizeMiddleware = (req: any, res: any, next: any): void => {
    try {
        // Parse and combine data from body, params, and query (with dot notation)
        let object = {
            ...req.body,
            ...req.params,
            ...parseDotNotation(req.queryPolluted),
        };

        // Deep normalize all data (e.g., Persian characters, trimming, etc.)
        object = normalizeDeep(object);

        // If searchInfo exists, flatten it from array of objects to flat string array
        if (object.searchInfo) {
            object.searchInfo = flattenSearchInfo(object.searchInfo);
        }

        // Attach the final normalized object to req.queryPolluted
        req.queryPolluted = object;

        next();
    } catch (error) {
        next(error);
    }
};

export default normalizeMiddleware;
