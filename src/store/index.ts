import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import storageMiddleware from './storageMiddleware';
import { type ExpenseState } from '../features/expenses/expenseSlice';
import { type InvoiceState } from '../features/invoices/invoiceSlice';

function loadExpenses(): ExpenseState | undefined {
    try {
        const savedExpenses = localStorage.getItem('expenses');
        return savedExpenses ? JSON.parse(savedExpenses) : undefined;
    } catch {
        return undefined;
    }
}

function loadInvoices(): InvoiceState | undefined {
    try {
        const savedInvoices = localStorage.getItem('invoices');
        return savedInvoices ? JSON.parse(savedInvoices) : undefined;
    } catch {
        return undefined;
    }
}

const preloadedState = {
    expenses: loadExpenses(),
    invoices: loadInvoices(),
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storageMiddleware),
    preloadedState,
});

export type AppDispatch = typeof store.dispatch;
