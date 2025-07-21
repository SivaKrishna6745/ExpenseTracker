import { combineReducers } from '@reduxjs/toolkit';
import invoiceReducer from '../features/invoices/invoiceSlice';
import expenseReducer from '../features/expenses/expenseSlice';
import settingsReducer from '../features/settings/settingsSlice';

const rootReducer = combineReducers({
    invoicies: invoiceReducer,
    expenses: expenseReducer,
    settings: settingsReducer,
});

export default rootReducer;
