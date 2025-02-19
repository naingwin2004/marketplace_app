import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	name: null,
	description: null,
	category: null,
	price: 0,
	voucher: false,
	warranty: false,
};

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		setProduct: (state, action) => {
			const { name, description, category, price, voucher, warranty } =
				action.payload;

			state.name = name;
			state.description = description;
			state.category = category;
			state.price = price;
			state.voucher = voucher;
			state.warranty = warranty;
		},
	},
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
