import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import AdminLayout from "../../layouts/AdminLayout";
import { getAllReservations, cancelReservation } from "../../services/reservationService";

function Reservations() {

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const data = await getAllReservations();
            setReservations(data.reservations || []);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load reservations"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        if (!window.confirm("Cancel this reservation?")) return;

        try {
            await cancelReservation(id);
            toast.success("Reservation cancelled");
            fetchReservations();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to cancel reservation"
            );
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <h2 className="text-2xl font-bold">
                    Loading Reservations...
                </h2>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">
                Manage Reservations
            </h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>
                            <th className="p-3 text-left">Customer</th>
                            <th className="p-3 text-left">Table</th>
                            <th className="p-3 text-left">Guests</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {reservations.length === 0 ? (

                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center py-8"
                                >
                                    No reservations found.
                                </td>
                            </tr>

                        ) : (

                            reservations.map((reservation) => (

                                <tr
                                    key={reservation._id}
                                    className="border-t"
                                >

                                    <td className="p-3">
                                        {reservation.user?.name}
                                    </td>

                                    <td className="p-3">
                                        {reservation.table?.tableNumber}
                                    </td>

                                    <td className="p-3">
                                        {reservation.guests}
                                    </td>

                                    <td className="p-3">
                                        {new Date(
                                            reservation.reservationDate
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="p-3">
                                        {reservation.status}
                                    </td>

                                    <td className="p-3 text-center">

                                        {reservation.status !== "Cancelled" && (

                                            <button
                                                onClick={() =>
                                                    handleCancel(reservation._id)
                                                }
                                                className="bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                Cancel
                                            </button>

                                        )}

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </AdminLayout>
    );
}

export default Reservations;