import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import AdminLayout from "../../layouts/AdminLayout";

import {
    getAllTables,
    deleteTable
} from "../../services/tableService";

function Tables() {

    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {

            setLoading(true);

            const response = await getAllTables();

            setTables(response.tables || []);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load tables"
            );

        } finally {

            setLoading(false);

        }
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this table?")) return;

        try {

            await deleteTable(id);

            toast.success("Table deleted successfully");

            fetchTables();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete table"
            );

        }

    };

    if (loading) {

        return (
            <AdminLayout>
                <h2 className="text-2xl font-bold">
                    Loading Tables...
                </h2>
            </AdminLayout>
        );

    }

    return (

        <AdminLayout>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Manage Tables
                </h1>

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Add Table
                </button>

            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-3 text-left">
                                Table
                            </th>

                            <th className="p-3 text-left">
                                Capacity
                            </th>

                            <th className="p-3 text-left">
                                Location
                            </th>

                            <th className="p-3 text-left">
                                Status
                            </th>

                            <th className="p-3 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {tables.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="text-center py-8"
                                >

                                    No tables found

                                </td>

                            </tr>

                        ) : (

                            tables.map((table) => (

                                <tr
                                    key={table._id}
                                    className="border-t"
                                >

                                    <td className="p-3">
                                        {table.tableNumber}
                                    </td>

                                    <td className="p-3">
                                        {table.capacity}
                                    </td>

                                    <td className="p-3">
                                        {table.location}
                                    </td>

                                    <td className="p-3">
                                        {table.status}
                                    </td>

                                    <td className="p-3 text-center">

                                        <button
                                            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(table._id)
                                            }
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

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

export default Tables;