'use client'
import React, { useEffect, useState } from 'react';
import Image from '../../components/imagen/Imagen.jsx';
import ActiveLink from '@/components/activeLink/ActiveLink.jsx';

import styles from './ultimaSemana.module.css';

const cargarDatos = () => {
  return fetch('https://platos-como-te-gustan-node.vercel.app/plates', { cache: 'no-store' })
    .then(res => res.json());
};

export default function UltimasRecetas() {
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const datosCargados = await cargarDatos();
      setRecetas(datosCargados);
    };

    obtenerDatos();
  }, []);

  const ultimasCuatroRecetas = recetas.slice(-4);

  return (
    <>
      <div className={styles.container}>
        <h2>Últimas recetas de esta semana</h2>
        <div className={styles.containerCard}>
            {ultimasCuatroRecetas.map((valor) => (
              <div className={styles.card} key={valor._id}>
                <img className={styles.cardImg} src={valor.picture} alt={valor.name} />
                <h3 className={styles.cardName}>{valor.name}</h3>
              </div>
          ))}
        </div>
        <div className={styles.boton}>
          <ActiveLink text='Ver Todas Las Recetas' href='/platos'/>
        </div>
      </div>
    </>
  );
}
