import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/user"

export const store = configureStore({
	reducer: {
	  auth:authReducer
	},
});
