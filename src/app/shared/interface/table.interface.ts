export interface TableColumn {
    key: string;
    title: string;
}

export interface TableData {
    [key: string]: string | number;
}

export interface TableActions {
    id: string;
    iconName: string;
    tooltip: string;
}