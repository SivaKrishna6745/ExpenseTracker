import { type Middleware } from '@reduxjs/toolkit';
import { type RootState } from './rootReducer';

const isTypedAction = (action: unknown): action is { type: string } =>
    typeof action === 'object' && action !== null && 'type' in action && typeof (action as any).type === 'string';

const storageMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
    const result = next(action);

    if (isTypedAction(action)) {
        const actionType = action.type.split('/')[0];
        const allSaveActions = [
            'expenses/addExpense',
            'expenses/updateExpense',
            'expenses/removeExpense',
            'invoices/addInvoice',
            'invoices/updateInvoice',
            'invoices/removeInvoice',
        ];

        if (allSaveActions.includes(action.type as string)) {
            const stateToSave = actionType === 'expenses' ? store.getState().expenses : store.getState().invoices;
            localStorage.setItem(actionType, JSON.stringify(stateToSave));
        }
    }

    return result;
};

export default storageMiddleware;
