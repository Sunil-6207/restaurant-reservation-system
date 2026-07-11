import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import TableCard from "../../components/common/TableCard";
import ReservationModal from "../../components/common/ReservationModal";

import { getAllTables } from "../../services/tableService";
import { createReservation } from "../../services/reservationService";

function Tables() {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTable, setSelectedTable] = useState(null);

    useEffect(() => {
        loadTables();
    }, []);

    const loadTables = async () => {
        try {
            setLoading(true);

            const response = await getAllTables();

            // Supports different backend response formats
            setTables(
                response.tables ||
                response.data ||
                response ||
                []
            );

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to load tables"
            );

        } finally {
            setLoading(false);
        }
    };

    const handleReserve = (table) => {
        setSelectedTable(table);
    };

    const handleReservationSubmit = async (reservationData) => {
        try {
            await createReservation({
                ...reservationData,
                table: selectedTable._id,
            });

            toast.success("Reservation created successfully!");

            setSelectedTable(null);

            loadTables();

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Reservation failed"
            );
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Available Tables
                </h1>

                <p className="text-gray-500 mt-2">
                    Choose an available table and make your reservation.
                </p>
            </div>

            {loading ? (
                <div className="text-center py-10">
                    <p className="text-lg">Loading tables...</p>
                </div>
            ) : tables.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <h2 className="text-xl font-semibold">
                        No Tables Available
                    </h2>

                    <p className="text-gray-500 mt-2">
                        There are currently no available tables.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tables.map((table) => (
                        <TableCard
                            key={table._id}
                            table={table}
                            onReserve={handleReserve}
                        />
                    ))}
                </div>
            )}

            {selectedTable && (
                <ReservationModal
                    table={selectedTable}
                    onClose={() => setSelectedTable(null)}
                    onSubmit={handleReservationSubmit}
                />
            )}
        </DashboardLayout>
    );
}

export default Tables;