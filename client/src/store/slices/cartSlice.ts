import type { ProductCardProps } from "@/types/product";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartSate {
    items: { quantity: number, product: ProductCardProps }[],
}
const initialState: CartSate = {
    items: typeof window !== undefined && JSON.parse(localStorage.getItem("cart")!) || []
}
const checkExistingCartProduct = (id: number): boolean => {
    if (typeof window !== undefined) {

        return JSON.parse(localStorage.getItem("cart")!).filter(   (item: any) => item.product.id === id).length > 0;
    }

    else {
        return false;
    }

}
const saveProduct = (data: any) => {
    let existing = JSON.parse(localStorage.getItem("cart")!);
    existing = existing.concat(data);
    localStorage.setItem("cart", JSON.stringify(existing));
}


const removeProduct = (id: number) => {
    const existing = JSON.parse(localStorage.getItem("cart")!).filter((cartItem: any) => cartItem.product.id !== id);
    localStorage.setItem("cart", JSON.stringify(existing));
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, { payload }: PayloadAction<ProductCardProps>) => {

            if (!checkExistingCartProduct(payload.id)) {
                const cartItem = { product: payload, quantity: 1 }
                state.items = state.items.concat(cartItem);
                saveProduct(cartItem)
            }

        },
        removeFromCart: (state, { payload: product_id }: PayloadAction<number>) => {
            if (checkExistingCartProduct(product_id)) {
                state.items = state.items.filter(item => item.product.id !== product_id);
                removeProduct(product_id)
            }
        },

        incrementQuantity: (state, {payload}:PayloadAction<{id:number, quantity:number}>)=>{
            if(checkExistingCartProduct(payload.id)){
                state.items.forEach(item => {
                    if(item.product.id === payload.id){
                        item.quantity = payload.quantity
                    }
                });

                localStorage.setItem("cart", JSON.stringify(state.items))
            }
        }
    }
})


export const { addToCart, removeFromCart, incrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;