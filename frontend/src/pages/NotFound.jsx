import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">

            <h1 className="text-8xl font-bold text-red-600">
                404
            </h1>

            <h2 className="text-3xl font-semibold mt-4">
                Page Not Found
            </h2>

            <p className="text-gray-600 mt-2">
                The page you're looking for doesn't exist.
            </p>

            <Link
                to="/"
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
                Go to Login
            </Link>

        </div>
    );
}

export default NotFound;