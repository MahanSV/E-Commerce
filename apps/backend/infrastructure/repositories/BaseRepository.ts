import prismaNormalizeNull from "#substructure/utils/prismaNormalizeNull.ts";

export abstract class BaseRepository<E> {
    constructor(protected readonly entityFactory: (createFromSnapshot: any) => E) {}

    protected normalize<T extends Record<string, any>>(data: T | null): { [K in keyof T]: Exclude<T[K], null> } | null {
        return prismaNormalizeNull(data)
    }

    protected toDomain<T extends Record<string, any>>(data: T | null, factory?: (createFromSnapshot: { [K in keyof T]: Exclude<T[K], null> }) => E): E | null {
        const cleanData = this.normalize(data);
        const usedFactory = factory ?? this.entityFactory;
        return cleanData && usedFactory ? usedFactory(cleanData) : null;
    }

    protected toDomainList<T extends Record<string, any>>(data: T[], factory?: (createFromSnapshot: { [K in keyof T]: Exclude<T[K], null> }) => E): E[] {
        const usedFactory = factory ?? this.entityFactory;
        if (!usedFactory) return [];
        return data.map((item) => {
            const cleanItem = this.normalize(item)!;
            return usedFactory(cleanItem);
        });
    }
}
