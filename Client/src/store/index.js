import { create } from "zustand";
import { authSlice } from "./slices/authSlice";
import { chatSlice } from "./slices/chatSlice";

export const useAppStore = create()((...a) => ({
  ...authSlice(...a),
  ...chatSlice(...a),
}));
