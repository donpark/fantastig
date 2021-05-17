export interface IStore<T = any> {
    close(): Promise<void>;

    list(): Promise<T[]>;
    get(key: string): Promise<T>;
    put(key: string, value: T): Promise<T>;
    del(key: string): Promise<void>;
}
