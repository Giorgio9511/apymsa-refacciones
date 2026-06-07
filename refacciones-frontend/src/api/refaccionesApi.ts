import axios from "axios";
import type { Refaccion, CreateRefaccionDto } from "../types/refaccion";

const api = axios.create({
    baseURL: 'http://localhost:5012/api/refacciones'
});

export const getRefacciones = async (): Promise<Refaccion[]> => {
    const {data} = await api.get('');
    return data;
};

export const getRefaccionById = async (id: number): Promise<Refaccion> => {
    const {data} = await api.get(`/${id}`);
    return data;
};

export const createRefaccion = async (refaccion: CreateRefaccionDto): Promise<Refaccion> => {
    const {data} = await api.post('', refaccion);
    return data;
};

export const updateRefaccion = async (id: number, refaccion: CreateRefaccionDto): Promise<void> => {
    await api.put(`/${id}`, refaccion);
};

export const deleteRefaccion = async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
};
