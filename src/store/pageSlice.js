import { createSlice }  from '@reduxjs/toolkit';

export const PageSlice = createSlice({
   name: 'pagination',
   initialState:{
        currentPage: 1,
        pageSize: 10,
   },
   reducers: {
    setCurrentPage: (state, action) => {
        state.currentPage = action.payload
    }
   } 

})

export const { setCurrentPage } = PageSlice.actions;