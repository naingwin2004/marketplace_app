import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
	token:localStorage.getItem("token") || null,
	user:user || null
};

export const userSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
	  setToken:(state,action)=>{
	   state.token = action.payload 
	  },
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { setUser,setToken } = userSlice.actions;
export default userSlice.reducer;
