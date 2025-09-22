import {configureStore} from "@reduxjs/toolkit";
import wishlistReducer from "./slices/wishListSlice";
import cartReducer from "./slices/cartSlice";
import dashboardReducer from "./slices/dashboardSlice";
export  const store = configureStore({
    reducer: {

        cart:cartReducer,
        wishlist:wishlistReducer,
        dahsboard:dashboardReducer

    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;