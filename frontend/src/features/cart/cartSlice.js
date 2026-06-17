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

      const qtyToAdd = item.qty ? Number(item.qty) : 1;

      const existingItem = state.cartItems.find((x) => x.id === item.id);

      if (existingItem) {
        existingItem.qty = Number(existingItem.qty || 0) + qtyToAdd;
      } else {
        state.cartItems.push({
          ...item,
          qty: qtyToAdd,
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const idToRemove = String(action.payload);

      state.cartItems = state.cartItems.filter(
        (item) => String(item.id) !== idToRemove,
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseQty: (state, action) => {
      const item = state.cartItems.find((x) => x.id === action.payload);
      if (item) {
        item.qty = Number(item.qty || 0) + 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreasedQty: (state, action) => {
      const item = state.cartItems.find((x) => x.id === action.payload);
      if (item && item.qty > 1) {
        item.qty = Number(item.qty || 0) - 1;
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
