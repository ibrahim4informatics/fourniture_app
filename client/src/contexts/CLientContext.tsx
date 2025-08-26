import type { ProductCardProps } from "@/types/product";
import React, { useState } from "react";

export type GlobalInfo = {
    cart: { quantity: number, product: ProductCardProps }[]
}

export const GlobalContext = React.createContext<{ global: GlobalInfo, setGlobal: React.Dispatch<React.SetStateAction<GlobalInfo>> }>({ global: { cart: [] }, setGlobal() { } })

type Props = {
    children: React.ReactNode
}
const GlobalContextProvider: React.FC<Props> = ({ children }) => {
    const [global, setGlobal] = useState<GlobalInfo>({ cart: JSON.parse(localStorage.getItem("cart") || "[]") })
    return (
        <GlobalContext.Provider value={{ global, setGlobal }} >

            {children}

        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider