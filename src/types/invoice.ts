export type InvoiceStatus = '' | 'paid' | 'pending' | 'draft';
export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
}

export interface Invoice {
    id: string;
    client: string;
    date: string;
    dueDate?: string;
    items: LineItem[];
    status: InvoiceStatus;
    notes?: string;
}
