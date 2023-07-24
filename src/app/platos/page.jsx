'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Ficha from '@/components/ficha/Ficha';
 
import styles from './platos.module.css';

const cargarDatos = () => {
  return fetch('https://platos-como-te-gustan-node.vercel.app/plates', { cache: 'no-store' })
    .then(res => res.json());
};

export default function FiltradoPage() {
  const [datos, setDatos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    const obtenerDatos = async () => {
      const datosCargados = await cargarDatos();
      setDatos(datosCargados);
    };

    obtenerDatos();
  }, []);

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
    setCurrentPage(1);
  };

  const datosFiltrados = filtro === 'todos' ? datos : datos.filter(item => item.type === filtro);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = datosFiltrados.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(datosFiltrados.length / pageSize)));
  };

  return (
    <>
    <div className={styles.contenedorPlates}>
      <div className={styles.plates}>
        <div className={styles.platesH2}>
            <h2>Te Costará Elegir... </h2>
        </div>
        <div className={styles.platesSelect}>
          <select className={styles.select} value={filtro} onChange={handleFiltroChange}>
            <option value="todos">Todos</option>
            <option value="primeros">Primeros Platos</option>
            <option value="segundos">Segundos Platos</option>
            <option value="guarnicion">Guarniciones</option>
            <option value="postres">Postres</option>
          </select>
        </div>
      </div>
      <div className={styles.fichaContainer}>
        {paginatedData.map((valor, indice) => (
            <Ficha className={styles.ficha} key={indice} valor={valor} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={goToPreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <button className={styles.button} onClick={goToNextPage} disabled={endIndex >= datosFiltrados.length}>
          Siguiente
        </button>
      </div>
    </div>  
    </>

  );
}
