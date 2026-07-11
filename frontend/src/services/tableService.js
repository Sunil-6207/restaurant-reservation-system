import api from "./api";

export const getAllTables = async () => {
    const { data } = await api.get("/tables");
    return data;
};

export const createTable = async (table) => {
    const { data } = await api.post("/tables", table);
    return data;
};

export const updateTable = async (id, table) => {
    const { data } = await api.put(`/tables/${id}`, table);
    return data;
};

export const deleteTable = async (id) => {
    const { data } = await api.delete(`/tables/${id}`);
    return data;
};