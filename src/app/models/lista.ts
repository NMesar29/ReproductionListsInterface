import { Cancion } from "./cancion";

export interface Lista {
    nombre: string;
    descripcion: string;
    canciones: Cancion[];
}