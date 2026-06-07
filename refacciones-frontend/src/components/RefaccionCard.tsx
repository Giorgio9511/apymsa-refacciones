import type { Refaccion } from "../types/refaccion";

interface Props {
    refaccion: Refaccion;
    onEditar: (refaccion: Refaccion) => void;
    onEliminar: (id: number) => void;
}

export const RefaccionCard = ({ refaccion, onEditar, onEliminar} : Props) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 border-1-4 border-blue-500">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-gray-800 text-lg">{refaccion.nombre}</h3>
                    <p className="text-gray-400 text-sm">{refaccion.descripcion}</p>
                    <span className="inline-block mt-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                        {refaccion.categoria}
                    </span>
                </div>
                <div className="text-right">
                    <p className="text-green-600 font-bold text-lg">${refaccion.precio.toFixed(2)}</p>
                    <p className="text-gray-400 text-sm">Stock: {refaccion.stock}</p>
                </div>
            </div>
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => onEditar(refaccion)}
                    className="flex-1 bg-yellow-400 text-white py-1 rounded hover:bg-yellow-500 transition text-sm"
                >
                    Editar
                </button>
                <button
                    onClick={() => onEliminar(refaccion.id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition text-sm"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};