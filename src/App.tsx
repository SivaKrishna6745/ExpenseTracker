import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './router/AppRoutes';
import Navbar from './components/Navbar';
import useSettings from './hooks/useSettings';
import { useEffect } from 'react';

function App() {
    const settings = useSettings();
    useEffect(() => {
        document.documentElement.className = settings.theme === 'dark' ? 'dark' : '';
    }, [settings.theme]);

    return (
        <BrowserRouter>
            <Navbar />
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
