'use client'

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { comprar, devolver } from "@/store/slice";

import styles from './carrito.module.css';

export default function Carrito() {
  const [total, setTotal] = useState(0);
  const carrito = useSelector(state => state.valores.miCarrito);
  const dispatch = useDispatch();

  const eliminar = (id) => {
    dispatch(devolver(id));
  };

  const incrementarCantidad = (id) => {
    const productoExistente = carrito.find(objeto => objeto.id === id);

    if (productoExistente) {
      dispatch(comprar({ id: id, cantidad: 1 }));
    } else {
      const nuevoProducto = {
        id: id,
        cantidad: 1,
      };
      dispatch(comprar(nuevoProducto));
    }
  };

  const decrementarCantidad = (id) => {
    const producto = carrito.find(objeto => objeto.id === id);

    if (producto && producto.cantidad > 1) {
      dispatch(comprar({ id, cantidad: -1 }));
    }
  };

  useEffect(() => {
    const calcularTotal = () => {
      const total = carrito.reduce(
        (acumulador, valorActual) =>
          acumulador + valorActual.precio * valorActual.cantidad,
        0
      );
      setTotal(total);
    };
    calcularTotal();
  }, [carrito]);

  return (
    <>
      <div className={styles.carrito}>
        {carrito.length > 0 && (
          <div className={styles.carritoContainer}>
            {carrito.map((valor, indice) => (
              <div key={indice} className={styles.itemCarrito}>
                <img
                  className={styles.imagenProducto}
                  src={valor.imagen}
                  alt=""
                  height={60}
                />
                <div className={styles.detalleProducto}>
                  <div className={styles.nombreProducto}>{valor.name}</div>
                  <div className={styles.precioProducto}>
                    Precio: ${valor.precio}
                  </div>
                  <div className={styles.cantidadProducto}>
                    <button
                      className={styles.cantidadBoton}
                      onClick={() => decrementarCantidad(valor.id)}
                    >
                      -
                    </button>
                    <span className={styles.contadorCantidad}>
                      {valor.cantidad}
                    </span>
                    <button
                      className={styles.cantidadBoton}
                      onClick={() => incrementarCantidad(valor.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className={styles.eliminarProducto}
                  onClick={() => eliminar(valor.id)}
                >
                  X
                </button>
              </div>
            ))}
            <div className={styles.totalCarrito}>Total: ${total}</div>
          </div>
        )}
      </div>
    </>
  );
}
