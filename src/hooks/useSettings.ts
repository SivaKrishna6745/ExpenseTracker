import useAppSelector from './useAppSelector';

export const useSettings = () => {
    const { theme, currency, autoExport } = useAppSelector((state) => state.settings.settings);
    return {
        theme,
        currency,
        autoExport,
    };
};

export default useSettings;
