'use client'
import { useState, useEffect } from 'react';

import styles from './put.module.css';

export default function Put({ datos }) {
  const [newData, setNewData] = useState({});

  useEffect(() => {
    setNewData(datos);
  }, [datos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, picture } = newData;
    const updatedData = { name, description, picture };

    try {
      const response = await fetch(`https://platos-como-te-gustan-node.vercel.app/ingredients/${datos._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        
        console.log('Datos actualizados');
      } else {
      
        console.error('Error al actualizar los datos');
      }
    } catch (error) {
      console.error('Error en la solicitud PUT', error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Edita Los Ingredientes</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="name" className={styles.label}>Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newData.name || ''}
            onChange={handleInputChange}
            className={styles.input}
          />

          <label htmlFor="description" className={styles.label}>Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={newData.description || ''}
            onChange={handleInputChange}
            className={styles.input}
          />

          <label htmlFor="picture" className={styles.label}>Imagen:</label>
          <input
            type="text"
            id="picture"
            name="picture"
            value={newData.picture || ''}
            onChange={handleInputChange}
            className={styles.input}
          />

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>Guardar</button>
          </div>
        </form>
      </div>
    </>
  );
}


