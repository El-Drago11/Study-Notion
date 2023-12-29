import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import cartReducer from "./cartReducer";
import courseReducer from "./courseReducer";

const appStore = configureStore({
    reducer:{
        auth:authReducer,
        profile :profileReducer,
        cart:cartReducer,
        course: courseReducer
    }
});

export default appStore;