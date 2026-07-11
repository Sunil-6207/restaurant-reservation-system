import api from "./api";

export const getAdminDashboard = async () => {
    const response = await api.get("/dashboard");
    return response.data;
};

export const getAllTables = async () => {
    const response = await api.get("/tables");
    return response.data;
};

export const createTable = async (tableData) => {
    const response = await api.post("/tables", tableData);
    return response.data;
};

export const updateTable = async (id, tableData) => {
    const response = await api.put(`/tables/${id}`, tableData);
    return response.data;
};

export const deleteTable = async (id) => {
    const response = await api.delete(`/tables/${id}`);
    return response.data;
};

// NEW
export const getAllReservations = async () => {
    const response = await api.get("/reservations");
    return response.data;
};

export const cancelReservationByAdmin = async (id) => {
    const response = await api.put(`/reservations/${id}/cancel`);
    return response.data;
};