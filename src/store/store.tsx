import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import { FormData } from "../types.ts/formData";

const myStore = configureStore({
  reducer: {
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof myStore.getState>;
export type AppDispatch = typeof myStore.dispatch;

export default myStore;
