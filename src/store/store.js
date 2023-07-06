import { configureStore } from "@reduxjs/toolkit";
import {Slice} from './slice.js'
import { PageSlice } from "./pageSlice.js";

export default configureStore({
    reducer:{
        valores:Slice.reducer,
        pagination:PageSlice.reducer,
    }
})