export interface Refaccion {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
}

export interface CreateRefaccionDto {
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
}