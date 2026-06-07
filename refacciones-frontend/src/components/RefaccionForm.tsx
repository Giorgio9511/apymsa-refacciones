import {useState} from 'react';
import type { CreateRefaccionDto, Refaccion } from '../types/refaccion';

interface Props {
    onSubmit: (dto: CreateRefaccionDto) => void;
    inicial?: Refaccion;
    onCancel?: () => void;
}

export const RefaccionForm = ({ onSubmit, inicial, onCancel }: Props) => {
    const [form, setForm] = useState<CreateRefaccionDto>({
        nombre: inicial?.nombre ?? '',
        descripcion: inicial?.descripcion ?? '',
        precio: inicial?.precio ?? 0,
        stock: inicial?.stock ?? 0,
        categoria: inicial?.categoria ?? '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === 'precio' || name === 'stock' ? Number(value) : value
        }));
    };

    const handleSubmit = () => {
        if(!form.nombre || !form.categoria) return;
        onSubmit(form);
    };
  
    return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-xl font-bold mb-4 text-gray-700'>
            {inicial ? 'Editar Refaccion' : 'Nueva Refacción'}
        </h2>
        <div className='grid grid-cols-2 gap-4'>
            {[
                {label: 'Nombre', name: 'nombre', type: 'text'},
                {label: 'Categoría', name: 'categoria', type: 'text'},
                {label: 'Precio', name: 'precio', type: 'number'},
                {label: 'Stock', name: 'stock', type: 'number'},
                {label: 'Descipción', name: 'descripcion', type: 'text'},
            ].map(field => (
                <div key={field.name} className='flex flex-col'>
                    <label className='text-sm text-gray-600 mb-1'>{field.label}</label>
                    <input 
                        type={field.type}
                        name={field.name}
                        value={form[field.name as keyof CreateRefaccionDto]}
                        onChange={handleChange}
                        className='border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />
                    
                </div>
            ))}
        </div>
        <div className='flex gap-3 mt-5'>
            <button
                onClick={handleSubmit}
                className='bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition'
            >
                {inicial ? 'Actualizar' : 'Crear'}
            </button>
            {onCancel && (
                <button 
                    onClick={onCancel}
                    className='bg-gray-200 text-gray-700 px-5 py-2 rounded hover:bg-gray-300 transition'
                >
                    Cancelar
                </button>
            )}
        </div>
    </div>
  )
}
