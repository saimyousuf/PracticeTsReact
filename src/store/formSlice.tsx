import { FormData, initialValue } from "../types.ts/formData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initalState {
  formData: FormData;
}

const initialState: initalState = {
  formData: initialValue,
};

const formSlice = createSlice({
  name: "myForm",
  initialState,
  reducers: {
    submitForm: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload;
      console.log(action.payload);
    },
  },
});

export const { submitForm } = formSlice.actions;
export default formSlice.reducer;
