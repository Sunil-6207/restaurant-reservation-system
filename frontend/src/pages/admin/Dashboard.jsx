import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import AdminLayout from "../../layouts/AdminLayout";
import { getDashboardSummary } from "../../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {

            const response = await getDashboardSummary();

            setDashboard(response.dashboard);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load dashboard"
            );

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <h2 className="text-2xl font-bold">
                    Loading Dashboard...
                </h2>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>

            <h1 className="text-3xl font-bold mb-8">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

                <Card
                    title="Users"
                    value={dashboard.totalUsers}
                    color="bg-blue-600"
                />

                <Card
                    title="Tables"
                    value={dashboard.totalTables}
                    color="bg-green-600"
                />

                <Card
                    title="Available"
                    value={dashboard.availableTables}
                    color="bg-purple-600"
                />

                <Card
                    title="Confirmed"
                    value={dashboard.confirmedReservations}
                    color="bg-orange-500"
                />

                <Card
                    title="Cancelled"
                    value={dashboard.cancelledReservations}
                    color="bg-red-600"
                />

            </div>

        </AdminLayout>
    );
}

function Card({ title, value, color }) {
    return (
        <div className={`${color} text-white rounded-lg shadow-lg p-6`}>

            <h3 className="text-lg">
                {title}
            </h3>

            <p className="text-4xl font-bold mt-3">
                {value}
            </p>

        </div>
    );
}

export default Dashboard;