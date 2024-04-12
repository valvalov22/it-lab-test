export interface Client {
    id: number;
    fullname: string;
    company: string;
    group: string;
    isPresence: boolean;
}

export type ClientFilterType = "all" | "present" | "absent";
