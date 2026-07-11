import { toast } from "react-toastify";
import { cancelReservationByAdmin } from "../../services/adminService";

function AdminReservationRow({ reservation, refresh }) {

    const handleCancel = async () => {

        if (!window.confirm("Cancel this reservation?")) return;

        try {

            await cancelReservationByAdmin(reservation._id);

            toast.success("Reservation cancelled");

            refresh();

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed");

        }

    };

    return (
        <tr className="border-b">

            <td className="p-3">{reservation.user.name}</td>

            <td>{reservation.table.tableNumber}</td>

            <td>{reservation.guests}</td>

            <td>
                {new Date(reservation.reservationDate).toLocaleString()}
            </td>

            <td>{reservation.status}</td>

            <td>
                {reservation.status === "Confirmed" && (
                    <button
                        onClick={handleCancel}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                        Cancel
                    </button>
                )}
            </td>

        </tr>
    );
}

export default AdminReservationRow;