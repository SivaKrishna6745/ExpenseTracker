import { combineReducers } from '@reduxjs/toolkit';
import invoiceReducer from '../features/invoices/invoiceSlice';
import expenseReducer from '../features/expenses/expenseSlice';
import settingsReducer from '../features/settings/settingsSlice';

const rootReducer = combineReducers({
    invoices: invoiceReducer,
    expenses: expenseReducer,
    settings: settingsReducer,
});

export default rootReducer;
