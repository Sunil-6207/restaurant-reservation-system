import api from "./api";

export const getAllReservations = async () => {
    const { data } = await api.get("/reservations");
    return data;
};

export const getMyReservations = async () => {
    const { data } = await api.get("/reservations/my");
    return data;
};

export const createReservation = async (reservation) => {
    const { data } = await api.post("/reservations", reservation);
    return data;
};

export const updateReservation = async (id, reservation) => {
    const { data } = await api.put(`/reservations/${id}`, reservation);
    return data;
};

export const cancelReservation = async (id) => {
    const { data } = await api.delete(`/reservations/${id}`);
    return data;
};