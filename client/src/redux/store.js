import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./featuers/alertSlice";
import { authSlice } from "./featuers/auth/authSlice";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    auth: authSlice.reducer,
  },
});
