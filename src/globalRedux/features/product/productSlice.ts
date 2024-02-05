import { Product } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface ProductState {
  isLoading: boolean;
  products: Product[];
  error: any;
  pages: number;
  query: string;
  page: number;
}

const initialState: ProductState = {
  isLoading: false,
  products: [],
  pages: 1,
  error: null,
  query: "",
  page: 1,
};

export const getProducts = createAsyncThunk(
  "fetchProduct",
  async ({ page, query }: { page: number; query: string }, thunkApi) => {
    try {
      const response = await axios.get(
        `/api/product?page=${page}&size=6&query=${query}`
      );

      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.data;
      state.isLoading = false;
      state.pages = action.payload.pages;
      state.error = null;
    });
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setQuery } = productSlice.actions;

export default productSlice.reducer;
