import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cartItems: cartItemsFromStorage,
  productQty: {}, // Store quantity for each product on product page
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItems.find((x) => x.id === item.id);

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.cartItems.push({ ...item, qty: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseQty: (state, action) => {
      const item = state.cartItems.find((x) => x.id === action.payload);
      if (item) {
        item.qty += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreasedQty: (state, action) => {
      const item = state.cartItems.find((x) => x.id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },

    setProductQty: (state, action) => {
      const { productId, qty } = action.payload;
      state.productQty[productId] = qty;
    },

    resetProductQty: (state, action) => {
      const productId = action.payload;
      delete state.productQty[productId];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQty,
  decreasedQty,
  setProductQty,
  resetProductQty,
} = cartSlice.actions;

export default cartSlice.reducer;
