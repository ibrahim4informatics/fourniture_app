import { getProductByID } from "@/services/products"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"


export interface Product {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    media: MediaItem[];
    details: string; // HTML string
    category: string;
    rating: number;
    availableSizes: string[];
    availableColors: string[];
    sku: string;
    stock: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    discount: number; // percentage or fixed value depending on logic
}

export interface MediaItem {
    order: number;
    link: string;
}

export default (id: number | string, options?: UseQueryOptions<Product, Error>) => {
    return useQuery<Product, Error>(
        {
            ...options,
            queryKey: options?.queryKey || ["products", id],
            queryFn: () => getProductByID(id)
        }
    )
}