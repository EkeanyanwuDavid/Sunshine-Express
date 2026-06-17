import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  cartItems: [],
  productQty: {},
  isLoading: false,
  isError: false,
  message: "",
};

export const fetchCart = createAsyncThunk("cart/fetch", async (_, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    const res = await fetch(`${apiUrl}/api/cart`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (!res.ok) throw new Error("Failed to load cart");
    return await res.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async (item, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState().auth;
      const res = await fetch(`${apiUrl}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          qty: item.qty,
        }),
      });
      if (!res.ok) throw new Error("Failed to add to cart");
      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (id, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState().auth;
      const res = await fetch(`${apiUrl}/api/cart/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) throw new Error("Failed to remove item");
      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const increaseQty = createAsyncThunk(
  "cart/increase",
  async (id, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState().auth;
      const res = await fetch(`${apiUrl}/api/cart/${id}/increase`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) throw new Error("Failed to update quantity");
      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const decreasedQty = createAsyncThunk(
  "cart/decrease",
  async (id, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState().auth;
      const res = await fetch(`${apiUrl}/api/cart/${id}/decrease`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) throw new Error("Failed to update quantity");
      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const clearCart = createAsyncThunk("cart/clear", async (_, thunkAPI) => {
  try {
    const { user } = thunkAPI.getState().auth;
    const res = await fetch(`${apiUrl}/api/cart`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (!res.ok) throw new Error("Failed to clear cart");
    return await res.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProductQty: (state, action) => {
      const { productId, qty } = action.payload;
      state.productQty[productId] = qty;
    },
    resetProductQty: (state, action) => {
      delete state.productQty[action.payload];
    },
    resetCartState: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(increaseQty.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(decreasedQty.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
      });
  },
});

export const { setProductQty, resetProductQty, resetCartState } =
  cartSlice.actions;
export default cartSlice.reducer;
