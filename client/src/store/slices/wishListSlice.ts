import { type ProductCardProps } from "@/types/product"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface WishListState {
    products: ProductCardProps[]
}



const saveToWishList = (product: ProductCardProps) => {
    if (!checkProductExist(product.id)) {
        let wishlistProducts = JSON.parse(localStorage.getItem("wishlist") || "[]");
        wishlistProducts = wishlistProducts.concat(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlistProducts));
    }
}


const deleteFromWishlist = (id: number) => {
    if (checkProductExist(id)) {
        const updatedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]").filter((product: ProductCardProps) => product.id !== id);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
}



const checkProductExist = (id: number) => {
    const wishlistProducts = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (wishlistProducts) {
        const isExisit = wishlistProducts.filter((product: any) => product.id === id).length;
        return isExisit > 0;
    }
}

const initialState: WishListState = {
    products: JSON.parse(localStorage.getItem("wishlist")!) || []
}


const wishListSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, { payload }: PayloadAction<ProductCardProps>) => {
            if (state.products.filter(product => product.id === payload.id).length < 1) {
                state.products = state.products.concat(payload);
                saveToWishList(payload);
            }
        },
        removeFromWishList: (state, { payload: product_id }: PayloadAction<number>) => {
            if (state.products.filter(product => product.id === product_id).length > 0) {
                state.products = state.products.filter(product => product.id !== product_id);
                deleteFromWishlist(product_id);
            }
        },
        clearWishlist: (state) => {
            state.products = [];
            localStorage.setItem("wishlist", "[]");
        }
    }
})
export const { clearWishlist, addToWishlist, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;

