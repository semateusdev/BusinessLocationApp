export interface Item {
    id: string | number;
    name: string;
    active?: boolean;
}

export interface ItemWithAdditionalData<T> extends Item{
    data: T
}