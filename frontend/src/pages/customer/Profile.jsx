import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";

function Profile() {
    const { user } = useAuth();

    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto">

                <div className="bg-white shadow-lg rounded-lg p-8">

                    <h1 className="text-3xl font-bold mb-8">
                        My Profile
                    </h1>

                    <div className="space-y-6">

                        <div>
                            <label className="block text-gray-600 mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={user?.name || ""}
                                readOnly
                                className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                value={user?.email || ""}
                                readOnly
                                className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-2">
                                Role
                            </label>

                            <input
                                type="text"
                                value={user?.role || ""}
                                readOnly
                                className="w-full border rounded-lg px-4 py-3 bg-gray-100 capitalize"
                            />
                        </div>

                    </div>

                </div>

            </div>
        </DashboardLayout>
    );
}

export default Profile;