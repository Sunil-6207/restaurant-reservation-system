function TableCard({ table, onReserve }) {
    return (
        <div className="bg-white shadow rounded-lg p-5">

            <h2 className="text-xl font-bold mb-3">
                Table #{table.tableNumber}
            </h2>

            <p>
                <strong>Capacity:</strong> {table.capacity}
            </p>

            <p>
                <strong>Location:</strong> {table.location}
            </p>

            <p>
                <strong>Status:</strong>{" "}
                <span
                    className={
                        table.status === "Available"
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                    }
                >
                    {table.status}
                </span>
            </p>

            <button
                disabled={table.status !== "Available"}
                onClick={() => onReserve(table)}
                className={`mt-4 w-full py-2 rounded text-white ${
                    table.status === "Available"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                }`}
            >
                Reserve
            </button>

        </div>
    );
}

export default TableCard;