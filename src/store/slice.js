import { createSlice } from "@reduxjs/toolkit";

let nextId = 1; // Variable para generar los identificadores únicos de los productos

export const Slice = createSlice({
  name: 'valores',
  initialState: {
    categoria: '',
    miCarrito: [],
  },
  reducers: {
    comprar: (state, action) => {
      const { id, cantidad } = action.payload;
      const productoExistente = state.miCarrito.find(objeto => objeto.id === id);

      if (productoExistente) {
        // Si el producto ya existe en el carrito, se incrementa la cantidad
        productoExistente.cantidad += cantidad;
      } else {
        // Si el producto no existe en el carrito, se agrega como nuevo con cantidad 1
        state.miCarrito.push({
          id: nextId++,
          cantidad: 1,
          ...action.payload
        });
      }
    },
    devolver: (state, action) => {
      const id = action.payload;
      state.miCarrito = state.miCarrito.filter(objeto => objeto.id !== id);
    },
  }
});

export const { comprar, devolver } = Slice.actions;
