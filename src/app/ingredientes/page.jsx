'use client'

import { useState, useEffect, use } from "react";
import Link from "next/link";

import styles from './ingredients.module.css';

const cargarDatos = () => {
    return fetch('https://platos-como-te-gustan-node.vercel.app/ingredients', {cache: 'no-store'})
    .then(res => res.json());
}

export default function Ingredientes() {
    const [datos, setDatos] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [elemetosPorPagina, setElementosPorPagina] = useState(18);
    const [busqueda, setBusqueda] = useState("");
    
    useEffect(() => {
        const obtenerDatos = async () => {
            const datosCargados = await cargarDatos();
            setDatos(datosCargados)
        };
        
        obtenerDatos();
    },[]);


    const filtrarIngredientes = (termino) => {
        const ingredientesFiltrados = datos.filter((valor) => {
            return valor.name.toLowerCase().includes(termino.toLowerCase());
        });
        return ingredientesFiltrados;
    };

    const totalPaginas = Math.ceil(datos.length / elemetosPorPagina);

 
    const obtenerElementosPaginaActual = () => {
        const ingredientesFiltrados = filtrarIngredientes(busqueda);
        const indiceUltimoElemento = paginaActual * elemetosPorPagina;
        const indicePrimerElemento = indiceUltimoElemento - elemetosPorPagina;
        return ingredientesFiltrados.slice(indicePrimerElemento, indiceUltimoElemento);
    };

    const cambiarPagina = (numeroPagina) => {
        if(numeroPagina < 1 || numeroPagina > totalPaginas) {
            return;
        }
        setPaginaActual(numeroPagina);
    };


  return (
    <>
        <div className={styles.buscadorContainer}>
            <div className={styles.buscador}>
                <input 
                    type="text"
                    value={busqueda}
                    onChange={(event) => setBusqueda(event.target.value)}
                    placeholder="Buscar ingredientes..."
                />
            </div>
        </div>

        <div className={styles.ingredientsBox}>
            {obtenerElementosPaginaActual().map((valor, indice) => (
                <div key={indice}>
                <Link href={`/ingredientes/${valor._id}`}>
                    <div className={styles.ingredients} key={indice}>
                        <img src={valor.picture} alt={valor.name} />
                        <h3 className={styles.ingredientsH3}>{valor.name}</h3>
                    </div>
                </Link>
                </div>
            ))}
        </div>

        <div className={styles.botonContainer}>
            <button
            className={styles.boton}
            onClick={() => cambiarPagina(paginaActual -1)}
            disabled={paginaActual === 1}
            >
            Anterior
            </button>

            <button
            className={styles.boton}
            onClick={() => cambiarPagina(paginaActual +1)}
            disabled={paginaActual === totalPaginas}
            >
            Siguiente
            </button>
        </div>
    </>
  )
}
