import DashboardLayout from "../../layouts/DashboardLayout";

function Dashboard() {
    return (
        <DashboardLayout>

            <h2 className="text-3xl font-bold mb-6">
                Customer Dashboard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">
                        Available Tables
                    </h3>

                    <p className="text-4xl mt-3 text-blue-600">
                        12
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">
                        My Reservations
                    </h3>

                    <p className="text-4xl mt-3 text-green-600">
                        4
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">
                        Upcoming Booking
                    </h3>

                    <p className="text-xl mt-3">
                        Today 7:00 PM
                    </p>
                </div>

            </div>

        </DashboardLayout>
    );
}

export default Dashboard;