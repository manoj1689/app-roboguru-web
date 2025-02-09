import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
  images: string[];
  customQuestion: string;
}

const initialState: ImageState = {
  images: [],
  customQuestion: "", 
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImageData: (state, action: PayloadAction<{ images: string[]; customQuestion: string }>) => {
      state.images = action.payload.images;
      state.customQuestion = action.payload.customQuestion;
    },
  },
});

export const { setImageData } = imageSlice.actions;
export default imageSlice.reducer;
