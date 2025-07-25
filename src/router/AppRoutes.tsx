import { Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import Invoices from '../pages/Invoices';
import Settings from '../pages/Settings';
import Expenses from '../pages/Expenses';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
