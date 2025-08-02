import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Settings } from '../../types/settings';

interface SettingsState {
    settings: Settings;
}

const initialState: SettingsState = {
    settings: {
        theme: 'dark',
        currency: '₹',
        autoExport: false,
    },
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleTheme: (state: SettingsState, action: PayloadAction<'light' | 'dark'>) => {
            state.settings.theme = action.payload;
        },
        setCurrency: (state: SettingsState, action: PayloadAction<'₹' | '$' | '€'>) => {
            state.settings.currency = action.payload;
        },
        toggleAutoExport: (state: SettingsState) => {
            state.settings.autoExport = !state.settings.autoExport;
        },
    },
});

export const { toggleTheme, setCurrency, toggleAutoExport } = settingsSlice.actions;
export default settingsSlice.reducer;
