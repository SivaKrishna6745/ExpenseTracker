import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import useSettings from '../hooks/useSettings';

const Navbar = () => {
    const { theme, setTheme } = useSettings();
    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    const isDark = theme === 'dark';

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md">
            <div className="text-2xl font-semibold">FinanceDash</div>
            <div className="flex gap-6 text-sm font-medium">
                <Link to="/" className="text-lg hover:text-blue-600">
                    Dashboard
                </Link>
                <Link to="/invoices" className="text-lg hover:text-blue-600">
                    Invoices
                </Link>
                <Link to="/expenses" className="text-lg hover:text-blue-600">
                    Expenses
                </Link>
                <Link to="/settings" className="text-lg hover:text-blue-600">
                    Settings
                </Link>
            </div>
            <button
                className={`cursor-pointer relative inline-flex items-center h-7 w-14 rounded-full transition-colors duration-300 ${
                    isDark ? 'bg-gray-500' : 'bg-neutral-600'
                }`}
                aria-label="toggle theme"
                onClick={handleThemeToggle}
            >
                <span
                    className={`inline-block h-6 w-5 transform transition-transform duration-300 ${
                        isDark ? 'translate-x-7 text-gray-900' : 'translate-x-1 text-gray-200'
                    }`}
                >
                    {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                </span>
            </button>
        </nav>
    );
};

export default Navbar;
