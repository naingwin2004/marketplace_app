import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/user"
import productReducer from "./slices/products"

export const store = configureStore({
	reducer: {
	  auth:authReducer,
	  products:productReducer,
	},
});
