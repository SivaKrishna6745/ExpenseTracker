import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Invoice } from '../../types/invoice';

export interface InvoiceState {
    invoices: Invoice[];
    selectedInvoiceId: string | null;
}

const initialState: InvoiceState = {
    invoices: [],
    selectedInvoiceId: null,
};

const invoiceSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        addInvoice: (state: InvoiceState, action: PayloadAction<Invoice>) => {
            state.invoices.push(action.payload);
        },
        updateInvoice: (state: InvoiceState, action: PayloadAction<Invoice>) => {
            const idx = state.invoices.findIndex((inv: Invoice) => inv.id === action.payload.id);
            if (idx !== -1) state.invoices[idx] = action.payload;
        },
        removeInvoice: (state: InvoiceState, action: PayloadAction<string>) => {
            state.invoices = state.invoices.filter((inv: Invoice) => inv.id !== action.payload);
        },
        selectInvoice: (state: InvoiceState, action: PayloadAction<string | null>) => {
            state.selectedInvoiceId = action.payload;
        },
    },
});

export const { addInvoice, updateInvoice, removeInvoice, selectInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
