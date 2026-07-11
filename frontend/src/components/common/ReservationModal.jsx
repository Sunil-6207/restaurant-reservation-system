import { useState } from "react";

function ReservationModal({ table, onClose, onSubmit }) {
    const [reservationDate, setReservationDate] = useState("");
    const [guests, setGuests] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            reservationDate,
            guests: Number(guests),
            tableId: table._id
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

            <div className="bg-white p-6 rounded-lg w-96">

                <h2 className="text-2xl font-bold mb-4">
                    Reserve Table #{table.tableNumber}
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label>Date</label>

                        <input
                            type="datetime-local"
                            value={reservationDate}
                            onChange={(e) => setReservationDate(e.target.value)}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label>Guests</label>

                        <input
                            type="number"
                            min="1"
                            max={table.capacity}
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className="w-full border rounded p-2"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Confirm
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default ReservationModal;