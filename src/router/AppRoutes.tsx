import { Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import Invoices from '../pages/Invoices';
import Settings from '../pages/Settings';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
