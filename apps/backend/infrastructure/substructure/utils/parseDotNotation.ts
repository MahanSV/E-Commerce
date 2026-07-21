type ParsedQuery = Record<string, unknown>;

function isParsedQuery(value: unknown): value is ParsedQuery {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function ensureObject(parent: ParsedQuery, key: string): ParsedQuery {
  const existingValue = parent[key];

  if (isParsedQuery(existingValue)) {
    return existingValue;
  }

  const value: ParsedQuery = {};
  parent[key] = value;

  return value;
}

function ensureArray(parent: ParsedQuery, key: string): unknown[] {
  const existingValue = parent[key];

  if (Array.isArray(existingValue)) {
    return existingValue;
  }

  const value: unknown[] = [];
  parent[key] = value;

  return value;
}

function ensureArrayObject(array: unknown[], index: number): ParsedQuery {
  const existingValue = array[index];

  if (isParsedQuery(existingValue)) {
    return existingValue;
  }

  const value: ParsedQuery = {};
  array[index] = value;

  return value;
}

function parseDotNotation(query: ParsedQuery): ParsedQuery {
  const result: ParsedQuery = {};

  for (const [key, value] of Object.entries(query)) {
    const parts = key.split('.');
    let current = result;

    for (const [partIndex, part] of parts.entries()) {
      const isLastPart = partIndex === parts.length - 1;
      const arrayMatch = part.match(/^(\w+)\[(\d+)]$/);

      if (arrayMatch) {
        const [, arrayKey, rawIndex] = arrayMatch;
        const index = Number.parseInt(rawIndex, 10);
        const array = ensureArray(current, arrayKey);

        if (isLastPart) {
          array[index] = value;
        } else {
          current = ensureArrayObject(array, index);
        }

        continue;
      }

      if (isLastPart) {
        current[part] = value;
      } else {
        current = ensureObject(current, part);
      }
    }
  }

  return result;
}

export default parseDotNotation;
