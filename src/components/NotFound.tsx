import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h2 className="text-6xl">404</h2>
            <p className="text-2xl">Page not found</p>
            <span className="text-5xl">🧭</span>
            <p>The Page you are looking for does not exist</p>
            <Link to="/">
                <button className="border-2 bg-transparent rounded-lg px-6 py-2 cursor-pointer">Go back home</button>
            </Link>
        </div>
    );
};

export default NotFound;
