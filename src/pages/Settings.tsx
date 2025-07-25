import useSettings from '../hooks/useSettings';

const Settings = () => {
    const settings = useSettings();
    return (
        <div className="p-6 flex flex-col gap-6 max-w-md items-center justify-center">
            <div className="flex items-center gap-4">
                <label htmlFor="theme-select" className="text-xl text-gray-800 dark:text-white">
                    Theme:{' '}
                </label>
                <select
                    id="theme-select"
                    value={settings.theme}
                    onChange={(e) => settings.setTheme(e.target.value as 'light' | 'dark')}
                    className="bg-gray-700 text-white dark:bg-gray-500 dark:text-slate-800 px-4 py-2 rounded-md"
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
            <div className="flex items-center gap-4">
                <label htmlFor="currency-select" className="text-xl text-gray-800 dark:text-white">
                    Currency:{' '}
                </label>
                <select
                    id="currency-select"
                    value={settings.currency}
                    onChange={(e) => settings.setCurrency(e.target.value as 'INR' | 'USD' | 'EUR')}
                    className="bg-gray-700 text-white dark:bg-gray-500 dark:text-slate-800 px-4 py-2 rounded-md"
                >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
        </div>
    );
};

export default Settings;
