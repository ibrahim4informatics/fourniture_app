import {configureStore} from "@reduxjs/toolkit";
import wishlistReducer from "./slices/wishListSlice";
import cartReducer from "./slices/cartSlice";
export  const store = configureStore({
    reducer: {

        cart:cartReducer,
        wishlist:wishlistReducer

    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;