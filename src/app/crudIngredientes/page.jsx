'use client'
import { useState, useEffect  } from "react";
import styles from './styles.module.css';

export default function page({datos}) {
  const [ingredientsCreate, setIngredientsCreate]= useState({
    name: '',
    description: '',
    picture: '',
  })


  const handleInputChange = (event) => {
    setIngredientsCreate((prevIngredients) => ({
      ...prevIngredients,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const prepareIngredients = {
      ...ingredientsCreate
    };
    console.log('Datos del formulario', prepareIngredients);
  
    try {
      const response = await fetch('https://platos-como-te-gustan-node.vercel.app/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(prepareIngredients)
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Respuesta de la petición POST:', responseData);
        setIngredientsCreate({
          name: '',
          description: '',
          picture: '',
        })
      } else {
        throw new Error('Error en la petición POST');
      }
    } catch (error) {
      console.error('Error en la petición POST', error);
    }
  };
  

  return (
    <>
      <div className={styles.container}>
        <h2>Añade Ingredients</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="name" className={styles.label}>Nombre:</label>
          <input type="text" id="name" name="name" value={ingredientsCreate.name} onChange={handleInputChange} className={styles.input} />
          
          <label htmlFor="description" className={styles.label}>Descripción:</label>
          <input type="text" id="description" name="description" value={ingredientsCreate.description} onChange={handleInputChange} className={styles.input} />
          
          <label htmlFor="picture" className={styles.label}>Imagen:</label>
          <input type="text" id="picture" name="picture" value={ingredientsCreate.picture} onChange={handleInputChange} className={styles.input} />
          
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>Guardar</button>
          </div>
        </form>
      </div>
    </>
  )
}
