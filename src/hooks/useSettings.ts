import { useDispatch } from 'react-redux';
import useAppSelector from './useAppSelector';
import { toggleTheme, setCurrency } from '../features/settings/settingsSlice';

export const useSettings = () => {
    const dispatch = useDispatch();
    const { theme, currency, autoExport } = useAppSelector((state) => state.settings.settings);
    return {
        theme,
        currency,
        autoExport,
        setTheme: (value: 'light' | 'dark') => dispatch(toggleTheme(value)),
        setCurrency: (value: '₹' | '$' | '€') => dispatch(setCurrency(value)),
    };
};

export default useSettings;
