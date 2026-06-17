import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  wishlistItems: [],
  isLoading: false,
  isError: false,
  message: "",
};

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (_, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState().auth;
      const res = await fetch(`${apiUrl}/api/wishlist`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) throw new Error("Failed to load wishlist");
      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async (product, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState().auth;
      const res = await fetch(`${apiUrl}/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          rating: product.rating,
          reviews: product.reviews,
        }),
      });
      if (!res.ok) throw new Error("Failed to add to wishlist");
      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async (productId, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState().auth;
      const res = await fetch(`${apiUrl}/api/wishlist/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) throw new Error("Failed to remove from wishlist");
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.wishlistItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlistItems = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const exists = state.wishlistItems.find(
          (item) => item.productId === action.payload.productId,
        );
        if (!exists) state.wishlistItems.push(action.payload);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item.productId !== action.payload,
        );
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
