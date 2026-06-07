import {useState, useEffect} from 'react';
import type {Refaccion, CreateRefaccionDto} from '../types/refaccion';
import * as api from '../api/refaccionesApi';

export const useRefacciones = () => {
    const [refacciones, setRefacciones] = useState<Refaccion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRefacciones = async () => {
        try {
            setLoading(true);
            const data = await api.getRefacciones();
            setRefacciones(data);
        } catch {
            setError('Error al cargar las refacciones');
        } finally {
            setLoading(false);
        
        }
    };

    useEffect(() => {
        fetchRefacciones();
    }, []);

    const crear = async (dto: CreateRefaccionDto) => {
        await api.createRefaccion(dto);
        await fetchRefacciones();
    };

    const actualizar = async (id: number, dto: CreateRefaccionDto) => {
        await api.updateRefaccion(id, dto);
        await fetchRefacciones();
    };

    const eliminar = async (id: number) => {
        await api.deleteRefaccion(id);
        await fetchRefacciones();
    };

    return {refacciones, loading, error, crear, actualizar, eliminar};
}