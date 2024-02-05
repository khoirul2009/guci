import { toastSlice } from "@/globalRedux/features/toast/toastSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import grandTotalSlice from "./features/grandTotal/grandTotalSlice";
import productSlice from "./features/product/productSlice";

const rootReducer = combineReducers({
  toast: toastSlice.reducer,
  grandTotal: grandTotalSlice,
  product: productSlice,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
