function AuthLayout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;