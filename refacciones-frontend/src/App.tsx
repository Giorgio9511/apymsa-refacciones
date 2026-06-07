import { useState } from 'react'
import {useRefacciones} from './hooks/useRefacciones';
import type {Refaccion, CreateRefaccionDto} from './types/refaccion';
import {RefaccionCard} from './components/RefaccionCard';
import {RefaccionForm} from './components/RefaccionForm';
import './App.css'

function App() {
  const {refacciones, loading, error, crear, actualizar, eliminar} = useRefacciones();
  const [editando, setEditando] = useState<Refaccion | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  const handleSubmit = async (dto: CreateRefaccionDto) => {
    if(editando) {
      await actualizar(editando.id, dto);
      setEditando(null);
    } else {
      await crear(dto);
      setMostrarForm(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-blue-700 text-white py-5 px-8 shadow">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">APYMSA — Refacciones</h1>
                        <p className="text-blue-200 text-sm">Sistema de gestión de inventario</p>
                    </div>
                    <button
                        onClick={() => { setMostrarForm(true); setEditando(null); }}
                        className="bg-white text-blue-700 font-semibold px-4 py-2 rounded hover:bg-blue-50 transition"
                    >
                        + Nueva Refacción
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-8 py-8">
                {/* Formulario */}
                {(mostrarForm || editando) && (
                    <div className="mb-8">
                        <RefaccionForm
                            onSubmit={handleSubmit}
                            inicial={editando ?? undefined}
                            onCancel={() => { setMostrarForm(false); setEditando(null); }}
                        />
                    </div>
                )}

                {/* Estados */}
                {loading && (
                    <div className="text-center py-20 text-gray-500">Cargando refacciones...</div>
                )}
                {error && (
                    <div className="bg-red-100 text-red-600 p-4 rounded mb-4">{error}</div>
                )}

                {/* Grid de refacciones */}
                {!loading && !error && (
                    <>
                        <p className="text-gray-500 mb-4">{refacciones.length} refacciones encontradas</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {refacciones.map(r => (
                                <RefaccionCard
                                    key={r.id}
                                    refaccion={r}
                                    onEditar={setEditando}
                                    onEliminar={eliminar}
                                />
                            ))}
                        </div>
                        {refacciones.length === 0 && (
                            <div className="text-center py-20 text-gray-400">
                                No hay refacciones — crea la primera 👆
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export default App
