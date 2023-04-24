import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;  //this is because when we click on  add to cart button it will increase 1 in shoopping logo 
      state.products.push(action.payload);  //we update our product 
      state.total += action.payload.price * action.payload.quantity;  //
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;






















