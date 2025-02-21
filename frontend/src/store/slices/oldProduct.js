import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	product: null,
};

export const oldProductSlice = createSlice({
	name: "oldProduct",
	initialState,
	reducers: {
		setOldProduct: (state, action) => {
			state.product = action.payload;
		},
	},
});

export const { setOldProduct } = oldProductSlice.actions;
export default oldProductSlice.reducer;
