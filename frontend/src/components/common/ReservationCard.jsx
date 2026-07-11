import { toast } from "react-toastify";
import { cancelReservation } from "../../services/reservationService";

function ReservationCard({ reservation, refreshReservations }) {

    const handleCancel = async () => {

        if (!window.confirm("Are you sure you want to cancel this reservation?")) {
            return;
        }

        try {

            await cancelReservation(reservation._id);

            toast.success("Reservation cancelled successfully");

            refreshReservations();

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Failed to cancel reservation"
            );

        }

    };

    return (
        <div className="bg-white rounded-lg shadow p-5">

            <h2 className="text-xl font-bold mb-3">
                Table #{reservation.table.tableNumber}
            </h2>

            <p>
                <strong>Date:</strong>{" "}
                {new Date(reservation.reservationDate).toLocaleString()}
            </p>

            <p>
                <strong>Guests:</strong> {reservation.guests}
            </p>

            <p>
                <strong>Location:</strong> {reservation.table.location}
            </p>

            <p>
                <strong>Status:</strong>{" "}
                <span
                    className={
                        reservation.status === "Confirmed"
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                    }
                >
                    {reservation.status}
                </span>
            </p>

            {reservation.status === "Confirmed" && (

                <button
                    onClick={handleCancel}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Cancel Reservation
                </button>

            )}

        </div>
    );
}

export default ReservationCard;