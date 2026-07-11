import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import {
    createReservation,
    getMyReservations,
    cancelReservation
} from "../../services/reservationService";

function Reservations() {

    const [reservations, setReservations] = useState([]);
    const [reservationDate, setReservationDate] = useState("");
    const [guests, setGuests] = useState(2);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const data = await getMyReservations();
            setReservations(data.reservations || []);
        } catch (error) {
            toast.error("Failed to load reservations");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createReservation({
                reservationDate,
                guests: Number(guests)
            });

            toast.success("Reservation created successfully");

            setReservationDate("");
            setGuests(2);

            fetchReservations();

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Reservation failed"
            );
        }
    };

    const handleCancel = async (id) => {
        if (!window.confirm("Cancel this reservation?")) return;

        try {
            await cancelReservation(id);

            toast.success("Reservation cancelled");

            fetchReservations();

        } catch (error) {
            toast.error("Unable to cancel reservation");
        }
    };

    return (
        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-6">
                My Reservations
            </h1>

            <div className="bg-white rounded-lg shadow p-6 mb-8">

                <h2 className="text-xl font-semibold mb-4">
                    Book a Table
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-3 gap-4"
                >

                    <input
                        type="date"
                        value={reservationDate}
                        onChange={(e) =>
                            setReservationDate(e.target.value)
                        }
                        className="border rounded p-2"
                        required
                    />

                    <input
                        type="number"
                        min="1"
                        value={guests}
                        onChange={(e) =>
                            setGuests(e.target.value)
                        }
                        className="border rounded p-2"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
                    >
                        Book Reservation
                    </button>

                </form>

            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>
                            <th className="p-3">Date</th>
                            <th className="p-3">Guests</th>
                            <th className="p-3">Table</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {reservations.length === 0 ? (

                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-8"
                                >
                                    No reservations found.
                                </td>
                            </tr>

                        ) : (

                            reservations.map((reservation) => (

                                <tr key={reservation._id}>

                                    <td className="p-3">
                                        {new Date(
                                            reservation.reservationDate
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="p-3">
                                        {reservation.guests}
                                    </td>

                                    <td className="p-3">
                                        {reservation.table?.tableNumber}
                                    </td>

                                    <td className="p-3">
                                        {reservation.status}
                                    </td>

                                    <td className="p-3">

                                        {reservation.status !==
                                            "Cancelled" && (

                                            <button
                                                onClick={() =>
                                                    handleCancel(
                                                        reservation._id
                                                    )
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

        </DashboardLayout>
    );
}

export default Reservations;