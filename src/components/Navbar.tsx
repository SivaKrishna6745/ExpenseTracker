import { Link } from 'react-router-dom';

const Navbar = () => {
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
        </nav>
    );
};

export default Navbar;
