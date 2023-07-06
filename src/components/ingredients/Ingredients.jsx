'use client'
import React, { useEffect, useState } from 'react';

const cargarDatos = (id) => {
  return fetch(`https://platos-como-te-gustan-node.vercel.app/ingredients/${id}`)
    .then(res => res.json());
}

export default function Ingredients({ valor }) {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      const promesas = valor.map(id => cargarDatos(id));
      const resultados = await Promise.all(promesas);
      setDatos(resultados);
    };

    fetchDatos();
  }, [valor]);

  return (
    <>
      <div>
        {datos.map((valor, indice) => (
          <div key={indice}>
            <p>{valor.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
