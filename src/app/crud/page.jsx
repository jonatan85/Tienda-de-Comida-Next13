'use client'
import { useState, useEffect } from "react";

import styles from './styles.module.css';

const cargarDatos = () => {
  return fetch('https://platos-como-te-gustan-node.vercel.app/ingredients', { cache: 'no-store' })
    .then(res => res.json());
};

export default function Crud() {
  const [ingredientes, setIngredientes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    account: 1,
    picture: "",
    type: "",
    ingredients: []
  });

 

  useEffect(() => {
    const obtenerDatos = async () => {
      const datosCargados = await cargarDatos();
      setIngredientes(datosCargados);
    };
    obtenerDatos();
  }, []);

  const handleIngredientChange = (event, ingredient) => {
    if (event.target.checked) {
      if (!ingredients.some((selected) => selected._id === ingredient._id)) {
        setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
      }
    } else {
      setIngredients((prevIngredients) =>
        prevIngredients.filter((prevIngredient) => prevIngredient._id !== ingredient._id)
      );
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const preparedData = {
      ...formData,
      ingredients: ingredients.map((ingredient) => ingredient._id),
    };
    console.log("Datos del formulario:", preparedData);

    fetch("https://platos-como-te-gustan-node.vercel.app/plates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preparedData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error en la petición POST");
        }
      })
      .then((data) => {
        console.log("Respuesta de la petición POST:", data);
      
        setFormData({
          name: "",
          description: "",
          price: 0,
          account: 1,
          picture: "",
          type: "",
          ingredients: []
        });
        setIngredients([]);
      })
      .catch((error) => {
        console.error("Error en la petición POST:", error);
      
      });
  };

  const filteredIngredients = ingredientes.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <form  className={`${styles.form} ${styles.myCustomForm}`} onSubmit={handleSubmit}>
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
                  checked={ingredients.some((selected) => selected._id === ingredient._id)}
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

        {ingredients.length > 0 && (
          <div className={styles.selectedIngredientsContainer}>
            <h3>Ingredientes seleccionados:</h3>
            <ul>
              {ingredients.map((ingredient) => (
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

