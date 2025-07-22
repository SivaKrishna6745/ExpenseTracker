import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white/50 text-slate-900 shadow-md">
            <div className="text-xl font-semibold">FinanceDash</div>
            <div className="flex gap-6 text-sm font-medium">
                <Link to="/" className="text-md hover:text-blue-600">
                    Dashboard
                </Link>
                <Link to="/invoices" className="text-md hover:text-blue-600">
                    Invoices
                </Link>
                <Link to="/settings" className="text-md hover:text-blue-600">
                    Settings
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
