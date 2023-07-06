'use client'

import { useState, useEffect } from 'react';
import styles from './styles.module.css';

const cargarDatos = () => {
  return fetch('https://platos-como-te-gustan-node.vercel.app/ingredients', { cache: 'no-store' })
    .then(res => res.json());
};

export default function CrudPut({ datos }) {
  const [formData, setFormData] = useState(datos);
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    cargarDatos()
      .then(data => setIngredients(data))
      .catch(error => console.error('Error al cargar los datos de los ingredientes:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleIngredientChange = (event, ingredient) => {
    const { checked } = event.target;
    if (checked) {
      setFormData(prevData => ({
        ...prevData,
        ingredients: [...prevData.ingredients, ingredient]
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        ingredients: prevData.ingredients.filter(item => item._id !== ingredient._id)
      }));
    }
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, picture, type, ingredients } = formData;
    const updatedData = { name, description, price, picture, type, ingredients };

    try {
      const response = await fetch(`https://platos-como-te-gustan-node.vercel.app/plates/${datos._id}`, {
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

  const filteredIngredients = ingredients.filter(ingredient => ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={`${styles.label} ${styles.myCustomLabel}`}>Nombre:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={`${styles.input} ${styles.myCustomInput}`} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={`${styles.label} ${styles.myCustomLabel}`}>Descripción del plato:</label>
          <input type="text" id="description" name="description" value={formData.description} onChange={handleInputChange} className={`${styles.input} ${styles.myCustomInput}`} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price" className={`${styles.label} ${styles.myCustomLabel}`}>Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min="0"
            max="1000"
            className={`${styles.input} ${styles.myCustomInput}`}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="picture" className={`${styles.label} ${styles.myCustomLabel}`}>Imagen:</label>
          <input type="text" id="picture" name="picture" value={formData.picture} onChange={handleInputChange} className={`${styles.input} ${styles.myCustomInput}`} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="type" className={`${styles.label} ${styles.myCustomLabel}`}>Tipo:</label>
          <select id="type" name="type" value={formData.type} onChange={handleInputChange} className={`${styles.select} ${styles.myCustomSelect}`}>
            <option value="">Selecciona un tipo</option>
            <option value="Primeros Platos">Primeros Platos</option>
            <option value="Segundos Platos">Segundos Platos</option>
            <option value="Guarniciones">Guarniciones</option>
            <option value="Postres">Postres</option>
          </select>
        </div>

        <div className={styles.formbuscador}>
          <label htmlFor="search" className={`${styles.label} ${styles.myCustomLabel}`}>Buscar ingredientes:</label>
          <input type="text" id="search" placeholder="Buscar..." value={searchTerm} onChange={handleSearchTermChange} className={`${styles.input} ${styles.myCustomInput}`} />
        </div>

        <div className={styles.ingredientsContainer}>
          <h3>Ingredientes:</h3>
          <div className={styles.ingredientsList}>
            {filteredIngredients.map((ingredient) => (
              <div className={styles.ingredientItem} key={ingredient._id}>
                <img src={ingredient.picture} alt={ingredient.name} className={styles.ingredientImage} />
                <input
                  type="checkbox"
                  id={ingredient._id}
                  checked={formData.ingredients.some((selected) => selected._id === ingredient._id)}
                  onChange={(event) => handleIngredientChange(event, ingredient)}
                  className={styles.ingredientCheckbox}
                />
                <label htmlFor={ingredient._id} className={styles.customCheckboxLabel}>
                  {ingredient.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {formData.ingredients.length > 0 && (
          <div className={styles.selectedIngredientsContainer}>
            <h3>Ingredientes seleccionados:</h3>
            <ul>
              {formData.ingredients.map((ingredient) => (
                <li key={ingredient._id}>{ingredient.name}</li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.buttonContainer}>
          <button className={styles.button} type="submit">Guardar</button>
        </div>
      </form>
    </>
  );
}