import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/user"
import productReducer from "./slices/products"
import oldProductReducer from "./slices/oldProduct"

export const store = configureStore({
	reducer: {
	  auth:authReducer,
	  products:productReducer,
	  oldProduct:oldProductReducer,
	},
});
